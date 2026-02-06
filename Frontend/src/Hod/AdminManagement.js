import { useState } from "react";
import { Search } from "lucide-react";
import { useSidebar } from "../Context/SidebarContext";
import { useEffect } from "react";
import { useMemo } from "react";
import api from "../api/axiosConfig";
export default function AdminManagement() {
  const { open } = useSidebar();

  const [admins, setAdmins] = useState([]); // Real data from backend
  const [searchQuery, setSearchQuery] = useState(""); // Typing state
  const [loading, setLoading] = useState(true);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  // 1. Fetch data from backend on load
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await api.get("/hod/admins");
        if (response.data.status === "SUCCESS") {
          setAdmins(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch admins", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

const filteredAdmins = useMemo(() => {
  return admins.filter((profile) => {
    const search = searchQuery.toLowerCase();
    // Use optional chaining (?.) to prevent "toLowerCase of undefined" errors
    const nameMatch = profile.fullName?.toLowerCase().includes(search);
    const userMatch = profile.user?.username?.toLowerCase().includes(search);
    
    return nameMatch || userMatch;
  });
}, [admins, searchQuery]);

  const [errors, setErrors] = useState({});

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

 const validate = () => {
  const newErrors = {};

  if (!form.name.trim()) newErrors.name = "Admin name is required";

  if (!form.username.trim()) {
    newErrors.username = "Username is required";
  } else if (
    // 💡 FIX: Added ?. before toLowerCase() to prevent crashing on empty data
    admins.some(
      (a) => a.username?.toLowerCase() === form.username.toLowerCase()
    )
  ) {
    newErrors.username = "Username already exists";
  }

  // ... rest of your validation code
  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    newErrors.email = "Invalid email address";
  }

  if (!form.password) {
    newErrors.password = "Password is required";
  } else if (form.password.length < 8) {
    newErrors.password = "Minimum 8 characters required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const toggleStatus = async (profileId, currentIsActive, index) => {
  try {
    // 1. Hit the backend endpoint we created
    const response = await api.put(`/hod/admins/toggle-status/${profileId}`);

    if (response.data.status === "SUCCESS") {
      // 2. Create a shallow copy of the admins state
      const updatedAdmins = [...admins];
      
      // 3. Update the specific admin's boolean value locally
      updatedAdmins[index] = {
        ...updatedAdmins[index],
        isactive: !currentIsActive
      };

      // 4. Update the state to refresh the UI
      setAdmins(updatedAdmins);
    }
  } catch (err) {
    console.error("Failed to toggle status:", err);
    alert("Could not update admin status. Check server connection.");
  }
};

  const closeModal = () => {
    setShowAddAdmin(false);
    setForm({ name: "", username: "", email: "", password: "" });
    setErrors({});
  };

const handleCreateAdmin = async () => {
  if (!validate()) return;

  // Real-world check: Look at this object in your console before sending
  console.log("Sending Data to API:", form);

  try {
    const response = await api.post("http://localhost:8080/hod/admins/create", form);
    
    if (response.data.status === "SUCCESS") {
      // Logic to add the new admin to the table
      const newAdmin = {
        ...response.data.data,
        status: "Active" // Default status if not sent by backend
      };
      setAdmins([newAdmin, ...admins]);
      closeModal();
    }
  } catch (err) {
    // This will now tell you EXACTLY what the backend didn't like
    console.error("Server Error Detail:", err.response?.data);
    alert(err.response?.data?.message || "Check backend console for 500 error details");
  }
};  

  /* ================= JSX ================= */
  return (
    <>
      {/* ===== HEADER ===== */}
      <header
        className={`fixed top-0 right-0 h-16 bg-white flex items-center
        transition-all duration-300 z-30
        ${open ? "left-64" : "left-20"}`}
      >
        <div className="w-full px-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Management</h1>
            <p className="text-sm text-gray-500">
              View and control administrator access
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
               {/* Update the input box in your JSX: */}
<input
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)} // Update state on type
  placeholder="Search admin..."
  className="w-72 pl-9 pr-4 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-violet-200 outline-none"
/>
            </div>

            <button
              onClick={() => setShowAddAdmin(true)}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white
              bg-gradient-to-r from-violet-600 to-purple-600 hover:opacity-90 shadow"
            >
              + Add Admin
            </button>
          </div>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <main
        className={`pt-20 bg-gray-50 min-h-screen transition-all duration-300
        ${open ? "pl-10" : "pl-10"}`}
      >
        <div className="p-6">
          <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">Admin Name</th>
                  <th className="px-6 py-4 text-left">Username</th>
                  <th className="px-6 py-4 text-left">Password</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
<tbody className="divide-y">
  {loading ? (
    <tr>
      <td colSpan="5" className="px-6 py-10 text-center text-gray-500 italic">
        Loading administrators...
      </td>
    </tr>
  ) : filteredAdmins.length > 0 ? (
    filteredAdmins.map((profile, i) => (
      <tr key={profile.adminId || i} className="hover:bg-gray-50">
        {/* { console.log('profile:', profile) } */}
      
        <td className="px-6 py-4">
          {/* Note: using profile.fullName from AdminProfile entity */}
          <p className="font-medium text-gray-900">{profile.fullName || profile.name}</p>
          <p className="text-xs text-gray-500">
            Created: {new Date(profile.user?.createdAt || Date.now()).toLocaleDateString()}
          </p>
        </td>
        <td className="px-6 py-4 font-mono text-gray-600">
          {/* Accessing username from the nested user object */}
          {profile.user?.username || "N/A"}
        </td>
        <td className="px-6 py-4 text-gray-400">••••••••</td>
        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              profile.isactive // Boolean check
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            ● {profile.isactive ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            // Pass profile.id and the current profile.isactive status
                            onClick={() => toggleStatus(profile.adminId, profile.isactive, i)}
                            className={`px-4 py-1 rounded text-xs font-semibold transition ${
                              profile.isactive
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                            }`}
                          >
                            {profile.isactive ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                                No administrators found matching "{searchQuery}"
                              </td>
                            </tr>
                          )}
                        </tbody>
                </table>
          </div>
        </div>
      </main>

    {/* ===== ADD ADMIN MODAL ===== */}
{showAddAdmin && (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    {/* 1. Change this div to a form (or wrap the inner content) */}
    <form 
      onSubmit={(e) => {
        e.preventDefault(); // Prevents page refresh
        handleCreateAdmin();
      }}
      className="bg-white w-full max-w-xl rounded-xl shadow-xl overflow-hidden"
    >
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-sm text-blue-700">
        New admin accounts are created as <b>Active</b> by default.
      </div>

      <div className="p-6 space-y-4">
        <InputField label="Admin Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
        <InputField label="Username" name="username" value={form.username} onChange={handleChange} error={errors.username} />
        {/* Email Address */}
<InputField
  label="Email Address"
  name="email"
  autoComplete="email" // Helps autofill email
  value={form.email}
  onChange={handleChange}
  error={errors.email}
/>

{/* Password */}
<InputField
  label="Password"
  type="password"
  name="password"
  autoComplete="new-password" // Correct value for creating a new account
  value={form.password}
  onChange={handleChange}
  error={errors.password}
/>
</div>

      <div className="flex justify-end gap-3 bg-gray-50 px-6 py-4 border-t">
        <button type="button" onClick={closeModal} className="px-4 py-2 border rounded-lg text-sm">
          Cancel
        </button>

        {/* 2. Change button type to 'submit' */}
        <button
          type="submit"
          className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600"
        >
          Create Admin
        </button>
      </div>
    </form>
  </div>
)}
    </>
  );
}

/* ================= INPUT COMPONENT ================= */
function InputField({ label, error, autoComplete, ...props }) {
  return (
    <div>
      <input
        {...props}
        autoComplete={autoComplete} // Pass the attribute here
        placeholder={label}
        className={`w-full px-4 py-2 border rounded-lg text-sm
        ${error ? "border-red-500" : "border-gray-300"} 
        outline-none focus:ring-2 focus:ring-violet-200 transition-all`}
      />
      <p className="text-xs mt-1 min-h-[16px] text-red-500">{error}</p>
    </div>
  );
}
