// import { useState } from "react";
// import { GraduationCap, Mail, Eye, EyeOff } from "lucide-react";
// import Student from "../Assets/Student.png";  
// import { Link } from "react-router-dom";

// export default function StudentLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     console.log("Student Login:", { email, password });
//     alert("Student Login Successful (Frontend Validation)");
//   };

//   return (
//     <div className="bg-gradient-to-r from-white via-white to-sky-50 flex flex-col">
//       <main className="flex-1 flex items-center justify-center px-6">
//         <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

//           {/* Left Image */}
//           <div className="relative">
//             <img
//               src={Student} 
//               alt="Student Portal"
//               className="h-full w-full object-cover"
//             />
//                {/* Image gradient : bg-emarald900/60 */}
//             <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
//               {/* text related */}
//               <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center mb-4">
//                 <GraduationCap size={22} />
//               </div>
//               <h2 className="text-2xl font-semibold">Student Portal</h2>
//               <p className="text-sm mt-2 text-gray-200 max-w-sm">
//                 Access Your timetable, Submit your assignments, and view 
//                 your academic results in one place.
//               </p>
//             </div>
//           </div>

//           {/* Right Form */}
//           <div className="p-12 flex flex-col justify-center">
//             <span className="text-sm font-semibold text-sky-500 tracking-widest">
//               STUDENT ACCESS
//             </span>

//             <h1 className="text-3xl font-bold text-gray-900 mt-2">
//               Welcome Student
//             </h1>
//             <p className="text-gray-500 mt-2">
//               Enter your credentials to access the Student workspace.
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
//                     placeholder="student@university.edu"
//                     className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
//                       errors.email ? "border-red-500" : "border-gray-300"
//                     } focus:outline-none focus:ring-2 focus:ring-sky-500`}
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
//                     className={`mt-1 w-full rounded-lg border px-4 py-3 pr-12 focus:outline-none focus:ring-2 ${
//                       errors.password
//                         ? "border-red-400 focus:ring-red-200"
//                         : "border-gray-300 focus:ring-sky-200"
//                     }`}
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
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.password}
//                   </p>
//                 )}
//               </div>
//                  {/* Button */}
//               <button
//                 type="submit"
//                 className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-full transition flex items-center justify-center gap-2 shadow-lg"
//               >
//                 Log In →
//               </button> 


//             </form>

//             <p className="text-sm text-gray-500 mt-6 text-center">
//               Not a student?{" "}
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
import React, { useState } from "react";
import {
  Users,
  UserCheck,
  Shield,
  IndianRupee,
  AlertCircle,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import { useEffect } from "react";
import api from "../api/axiosConfig";
import HodHeader from "../component/HodHead";
import { useSidebar } from "../Context/SidebarContext";

export default function Dashboard() {
  const { open } = useSidebar();
  const [activeNotice, setActiveNotice] = useState(null);
  // 1. Create a state to hold the stats object
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalAdmins: 0,
    feeStatusCounts: { PAID: 0, PENDING: 0 },
    unreadFeedback: 0
  });

  // 2. Fetch data from backend on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/hod/dashboard/stats");
        // We access .data.data because of your ResponseDTO structure
        if (response.data.status === "SUCCESS") {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchDashboardData();
  }, []);



  // 1. Create a state to hold the live notices
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await api.get("/hod/notices");
        if (response.data.status === "SUCCESS") {
          setNotices(response.data.data); // Update state with backend data
        }
      } catch (error) {
        console.error("Error loading notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);
  return (
    <main
      className={`pt-20 px-6 py-8 bg-gray-50 min-h-screen transition-all duration-300
        ${open ? "ml-1" : "ml-1"}`}
    >
      <HodHeader />

      {/* TITLE */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          HOD / Principal Dashboard
        </h1>
      </div>

      {/* ================= STATS (NOW DYNAMIC) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="TOTAL STUDENTS"
          value={stats.totalStudents}
          color="blue"
          icon={Users}
        />
        <StatCard
          title="TOTAL FACULTY"
          value={stats.totalFaculty}
          color="emerald"
          icon={UserCheck}
        />
        <StatCard
          title="TOTAL ADMINS"
          value={stats.totalAdmins}
          color="indigo"
          icon={Shield}
        />
        
        <StatCard
          title="FEES PAID COUNT"
          value={stats.feeStatusCounts?.PAID || 0}
          color="green"
          icon={IndianRupee}
        />
        <StatCard
          title="FEES UNPAID COUNT"
          value={stats.feeStatusCounts?.PENDING || 0}
          color="orange"
          icon={AlertCircle}
        />
        <StatCard
          title="UNREAD FEEDBACK"
          value={stats.unreadFeedback}
          color="rose"
          icon={MessageSquare}
        />
      </div>

      {/* ================= RECENT NOTICES ================= */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Recent Notices
        </h3>

        {/* ================= RECENT NOTICES (DYNAMIC) ================= */}
        {/* <div> */}


        <div className="bg-white rounded-xl border shadow-sm divide-y">
          {loading ? (
            <p className="p-4 text-center text-gray-500 italic">Loading notices...</p>
          ) : notices.length > 0 ? (
            notices.map((notice, index) => (
              <div key={notice.id || index}> {/* Using ID from database if available */}
                {/* HEADER ROW */}
                <button
                  onClick={() => setActiveNotice(activeNotice === index ? null : index)}
                  className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {notice.noticeTitle} {/* Changed from notice.title */}
                    </p>
                    <p className="text-xs text-gray-500">
                      {/* 💡 Safely check for createdAt and format it */}
                      Posted on {notice.createdAt
                        ? new Date(notice.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })
                        : "Recently"}
                    </p>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform
                ${activeNotice === index ? "rotate-180" : ""}`}
                  />
                </button>

                {/* EXPANDED CONTENT */}
                {activeNotice === index && (
                  <div className="px-6 pb-4 text-sm text-gray-600 border-t pt-2 bg-gray-50/50">
                    {notice.noticeContent} {/* Changed from notice.content */}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500 italic">No official notices published yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value, color, icon: Icon }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    emerald: "bg-emerald-100 text-emerald-600",
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    rose: "bg-rose-100 text-rose-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
