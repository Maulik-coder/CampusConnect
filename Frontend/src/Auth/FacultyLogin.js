// import { useState } from "react";
// import { GraduationCap, Mail, Eye, EyeOff } from "lucide-react";
// import faculty from "../Assets/faculty.png";
// import { Link } from "react-router-dom";

// export default function FacultyLogin() {
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

//     console.log("Faculty Login:", { email, password });
//     alert("Faculty Login Successful (Frontend Validation)");
//   };

//   return (
//     <div className="from-white via-white to-sky-50 flex flex-col">
//       <main className="flex-1 flex items-center justify-center px-6">
//         <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

//           {/* Left Image */}
//           <div className="relative">
//             <img
//               src={faculty}
//               alt="Faculty Portal"
//               className="h-full w-full object-cover"
//             />
//             {/* Image gradient */}
//             <div className="absolute inset-0 flex flex-col justify-center p-8 text-white"> 
//               <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center mb-4">
//                 <GraduationCap size={22} />
//               </div>
//               <h2 className="text-2xl font-semibold">Faculty Portal</h2>
//               <p className="text-sm mt-2 text-gray-200 max-w-sm">
//                 Streamline your academic management, engage with students,
//                 and access vital resources in one place.
//               </p>
//             </div>
//           </div>

//           {/* Right Form */}
//           <div className="p-12 flex flex-col justify-center">
//             <span className="text-sm font-semibold text-sky-500 tracking-widest">
//               FACULTY ACCESS
//             </span>

//             <h1 className="text-3xl font-bold text-gray-900 mt-2">
//               Welcome Faculty
//             </h1>
//             <p className="text-gray-500 mt-2">
//               Enter your credentials to access the Faculty workspace.
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
//                     placeholder="faculty@university.edu"
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

//               {/* Button */}
//               <button
//                 type="submit"
//                 className="w-full mt-6 py-3 rounded-full text-white font-semibold
//                 bg-gradient-to-r from-sky-500 to-emerald-500
//                 hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2"
//               >
//                 Log In →
//               </button>
//             </form>

//             <p className="text-sm text-gray-500 mt-6 text-center">
//               Not a Faculty?{" "}
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
import { GraduationCap, Mail, Eye, EyeOff } from "lucide-react";
import faculty from "../Assets/faculty.png";
import { Link } from "react-router-dom";

export default function FacultyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Faculty Login:", { email, password });
    alert("Faculty Login Successful (Frontend Validation)");
  };

  return (
    <div className="from-white via-white to-sky-50 flex items-center justify-center px-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT IMAGE */}
        <div className="relative hidden md:block">
          <img
            src={faculty}
            alt="Faculty Portal"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-8 text-white bg-black/40">
            <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center mb-4">
              <GraduationCap size={22} />
            </div>
            <h2 className="text-2xl font-semibold">Faculty Portal</h2>
            <p className="text-sm mt-2 text-gray-200 max-w-sm">
              Streamline your academic management, engage with students,
              and access vital resources in one place.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="p-12 flex flex-col justify-center">
          <span className="text-sm font-semibold text-sky-500 tracking-widest">
            FACULTY ACCESS
          </span>

          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Welcome Faculty
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your credentials to access the Faculty workspace.
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
                  placeholder="faculty@university.edu"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                />
              </div>

              {/* RESERVED ERROR SPACE */}
              <p
                className={`text-red-500 text-xs mt-1 min-h-[16px] ${
                  errors.email ? "visible" : "invisible"
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

              {/* RESERVED ERROR SPACE */}
              <p
                className={`text-red-500 text-xs mt-1 min-h-[16px] ${
                  errors.password ? "visible" : "invisible"
                }`}
              >
                {errors.password || "placeholder"}
              </p>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full mt-6 py-3 rounded-full text-white font-semibold
              bg-gradient-to-r from-sky-500 to-emerald-500
              hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2"
            >
              Log In →
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Not a Faculty?{" "}
            <Link to="/" className="text-sky-600 hover:underline">
              Select a different role
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
