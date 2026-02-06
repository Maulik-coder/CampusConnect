// import { useState } from "react";
// import { GraduationCap, Mail, Eye, EyeOff } from "lucide-react";
// import { ArrowRight } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import admin from "../Assets/admin.png";

// export default function FacultyLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate(); // for navigation after login

//   // Frontend validation
//   const validate = () => {
//     const newErrors = {};

//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Enter a valid email address";
//     }

//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       // Call backend login API
//      const response = await axios.post("http://localhost:8080/u/login", {
//     email: email,      // send email
//     rawPassword: password,  
//     role: "ADMIN"  // specify role as ADMIN
// });


//       const token = response.data;
//       localStorage.setItem("token", token); // store JWT

//       alert("Admin Login Successful!");
//       navigate("/admin/dashboard"); // redirect to dashboard

//     } catch (error) {
//       alert(error.response?.data || "Login failed");
//     }
//   };

//   return (
//     <div className="from-white via-white to-sky-50 flex flex-col">
//       <main className="flex-1 flex items-center justify-center px-6">
//         <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

//           {/* Left Image */}
//           <div className="relative">
//             <img
//               src={admin}
//               alt="Admin Portal"
//               className="h-full w-full object-cover"
//             />
//             <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
//               <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center mb-4">
//                 <GraduationCap size={22} />
//               </div>
//               <h2 className="text-2xl font-semibold">Admin Portal</h2>
//               <p className="text-sm mt-2 text-gray-200 max-w-sm">
//                 Securely manage users, configure system settings, and maintain platform integrity.
//               </p>
//             </div>
//           </div>

//           {/* Right Form */}
//           <div className="p-12 flex flex-col justify-center">
//             <span className="text-sm font-semibold text-sky-500 tracking-widest">
//               ADMIN ACCESS
//             </span>

//             <h1 className="text-3xl font-bold text-gray-900 mt-2">
//               Welcome Admin
//             </h1>
//             <p className="text-gray-500 mt-2">
//               Enter your credentials to access the Admin workspace.
//             </p>

//             <form onSubmit={handleSubmit} className="mt-8 space-y-5">

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="admin@university.edu"
//                     className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-sky-500`}
//                   />
//                 </div>
//                 {errors.email && (
//                   <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//                 )}
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="••••••••"
//                     className={`mt-1 w-full rounded-lg border px-4 py-3 pr-12 focus:outline-none focus:ring-2 ${errors.password ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-sky-200"}`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 py-3 text-white font-semibold shadow-lg hover:opacity-90"
//               >
//                 Log in <ArrowRight size={18} />
//               </button>
//             </form>

//             <p className="text-sm text-gray-500 mt-6 text-center">
//               Not an Admin?{" "}
//               <Link to="/" className="text-sky-600 hover:underline">
//                 Select a different role
//               </Link>
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
import { useState } from "react";
import { GraduationCap, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import admin from "../Assets/admin.png";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Frontend validation
  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const response = await axios.post(
      "http://localhost:8080/u/login",
      
      {
        email: email,
        rawPassword: password, // 💡 Ensure LoginDTO in Java uses 'rawPassword'
        role: "ADMIN",
      }
    );

    // 💡 Logic: Access the ResponseDTO structure
    const result = response.data; 

    if (result.status === "SUCCESS") {
      // result.data contains the token sent from AuthService
      const token = result.data; 
      
      if (!token) {
        throw new Error("Login successful but no token received");
      }

      localStorage.setItem("token", token);
      navigate("/admin/dashboard");
    } else {
      // Show the actual error message from the backend
      setErrors({ general: result.message || "Invalid credentials" });
    }
  } catch (error) {
    setErrors({
      general: error.response?.data?.message || "Invalid credentials or Server down",
    });
  }
};

  return (
    <div className="from-white via-white to-sky-50 flex items-center justify-center px-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="relative hidden md:block">
          <img
            src={admin}
            alt="Admin Portal"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-8 text-white">
            <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center mb-4">
              <GraduationCap size={22} />
            </div>
            <h2 className="text-2xl font-semibold">Admin Portal</h2>
            <p className="text-sm mt-2 text-gray-200 max-w-sm">
              Securely manage users, configure system settings, and maintain platform integrity.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="p-12 flex flex-col justify-center">
          <span className="text-sm font-semibold text-sky-500 tracking-widest">
            ADMIN ACCESS
          </span>

          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Welcome Admin
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your credentials to access the Admin workspace.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@university.edu"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                />
              </div>

              {/* Reserved space */}
              <p
                className={`text-xs mt-1 min-h-[16px] ${
                  errors.email ? "text-red-500" : "invisible"
                }`}
              >
                {errors.email || "placeholder"}
              </p>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`mt-1 w-full rounded-lg border px-4 py-3 pr-12 focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-400 focus:ring-red-200"
                      : "border-gray-300 focus:ring-sky-200"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Reserved space */}
              <p
                className={`text-xs mt-1 min-h-[16px] ${
                  errors.password ? "text-red-500" : "invisible"
                }`}
              >
                {errors.password || "placeholder"}
              </p>
            </div>

            {/* BACKEND ERROR */}
            {errors.general && (
              <p className="text-red-500 text-sm text-center">
                {errors.general}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl
              bg-gradient-to-r from-indigo-600 to-pink-500 py-3 text-white font-semibold
              shadow-lg hover:opacity-90 transition"
            >
              Log in <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Not an Admin?{" "}
            <Link to="/" className="text-sky-600 hover:underline">
              Select a different role
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
