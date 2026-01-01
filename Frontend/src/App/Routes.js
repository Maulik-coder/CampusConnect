import { BrowserRouter, Routes, Route} from "react-router-dom";

/* ===== Layouts ===== */
import LoginLayout from "../Layout/LoginLayout";
import HodLayout from "../Layout/HodLayout";

/* ===== Public / Landing ===== */
import UniversityPortal from "../Landing/LandingPage";
import Signin from "../Utils/Signin";
import HelpCenter from "../Utils/HelpCenter";
import Privacy from "../Utils/Privacy";
import Terms from "../Utils/Terms";
import Support from "../Utils/Support";

/* ===== Auth ===== */
import StudentLogin from "../Auth/StudentLogin";
import FacultyLogin from "../Auth/FacultyLogin";
import HodLogin from "../Auth/HodLogin";
import AdminLogin from "../Auth/AdminLogin";

/* ===== HOD Pages ===== */
import Dashboard from "../Hod/Dashboard";
import AdminManagement from "../Hod/AdminManagement";
import Notices from "../Hod/Notices";
import Reports from "../Hod/Reports";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC / LANDING ================= */}
        <Route element={<LoginLayout />}>
          <Route path="/" element={<UniversityPortal />} />

          <Route path="/signin" element={<Signin />} />

          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/Hodlogin" element={<HodLogin />} />

          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>

        {/* ================= HOD DASHBOARD ================= */}
       
        <Route path="/hod" element={<HodLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />}/>
          <Route path="adminmanagement" element={<AdminManagement />} />
          <Route path="notices" element={<Notices />} />
          <Route path="reports" element={<Reports />} />        
        </Route>
        {/* <Route path="/" element={<Dashboard />} /> */}




      </Routes>
    </BrowserRouter>
  );
}
