import { useState } from "react";
import axios from "axios";
import { GraduationCap, Mail, Eye, EyeOff } from "lucide-react";
import hod from "../Assets/hod.png";
import { Link, useNavigate } from "react-router-dom";

export default function HodLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= Validation ================= */
  const validate = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Enter a valid email address";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
/* ================= Updated Submit Logic ================= */
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);

  try {
    const response = await axios.post("http://localhost:8080/u/login", {
      email: email,
      rawPassword: password,
      role: "HOD",
    });

    // ✅ Fix: Access the nested 'data' object from your ResponseDTO
    // response.data is the whole DTO
    // response.data.data is the Map containing the token
    const token = response.data?.data?.token;

    if (!token) {
      // If we reach here, the backend returned SUCCESS but no token was found
      throw new Error(response.data?.message || "Invalid login response");
    }

    localStorage.setItem("token", token);
    navigate("/hod/dashboard", { replace: true });

  } catch (error) {
    console.error("Login error:", error);
    // This will now show "Invalid credentials" or "Role does not match" if the backend sent it
    alert(error.response?.data?.message || error.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="from-white via-white to-sky-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

          {/* ================= Left Image ================= */}
          <div className="relative hidden md:block">
            <img
              src={hod}
              alt="HOD Portal"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-8 text-white">
              <div className="w-11 h-11 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                <GraduationCap size={22} />
              </div>
              <h2 className="text-2xl font-semibold">
                HOD / Principal Portal
              </h2>
              <p className="text-sm mt-2 text-gray-200 max-w-sm">
                Strategic management dashboard for departmental oversight,
                faculty supervision, and institutional reporting.
              </p>
            </div>
          </div>

          {/* ================= Right Form ================= */}
          <div className="p-10 sm:p-12 flex flex-col justify-center min-h-[520px]">
            <span className="text-sm font-semibold text-sky-500 tracking-widest">
              HOD / PRINCIPAL ACCESS
            </span>

            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              Welcome Leader
            </h1>
            <p className="text-gray-500 mt-2">
              Enter your credentials to access the workspace.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {/* ================= Email ================= */}
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
                    placeholder="hod@university.edu"
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border
                      ${errors.email ? "border-red-500" : "border-gray-300"}
                      focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  />
                </div>

                <p className="text-red-500 text-xs mt-1 min-h-[16px]">
                  {errors.email || ""}
                </p>
              </div>

              {/* ================= Password ================= */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full rounded-lg border px-4 py-3 pr-12
                      ${errors.password ? "border-red-500" : "border-gray-300"}
                      focus:outline-none focus:ring-2 focus:ring-sky-500`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <p className="text-red-500 text-xs mt-1 min-h-[16px]">
                  {errors.password || ""}
                </p>
              </div>

              {/* ================= Button ================= */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3 rounded-full text-white font-semibold
                  bg-gradient-to-r from-purple-500 to-indigo-600
                  hover:from-purple-600 hover:to-indigo-700
                  transition-colors duration-300 shadow-lg
                  disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log In →"}
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-6 text-center">
              Not a HOD / Principal?{" "}
              <Link to="/" className="text-sky-600 hover:underline">
                Select a different role
              </Link>
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
