import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserCog,
  Bell,
  FileText,
  LogOut
} from "lucide-react";
import { useEffect } from "react";
import { useSidebar } from "../Context/SidebarContext";
import Logo from "../Assets/Logo.png";

export default function HodSidebar() {
  const { open, toggleSidebar, setOpen } = useSidebar();
  const navigate = useNavigate();

  /* ================= AUTO COLLAPSE ON SMALL SCREEN ================= */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setOpen(false); // auto collapse on small screens
      }
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  const menuItems = [
    { name: "Dashboard", path: "/hod/dashboard", icon: LayoutDashboard },
    { name: "Admin Management", path: "/hod/adminmanagement", icon: UserCog },
    { name: "Notices", path: "/hod/notices", icon: Bell },
    { name: "Reports", path: "/hod/reports", icon: FileText },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Hodlogin");
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen bg-white z-40
        transition-all duration-300 ease-in-out
        ${open ? "w-64" : "w-20"}
      `}
    >
      <div className="flex flex-col h-full">

        {/* ================= HEADER ================= */}
        <div className="h-16 flex items-center justify-between px-4">

          {/* Logo + Title */}
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={Logo}
              alt="Campus Connect"
              className="w-8 h-8 shrink-0"
            />
            {open && (
              <span className="font-semibold text-gray-800 whitespace-nowrap">
                Campus Connect
              </span>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={toggleSidebar}
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100"
          >
            ☰
          </button>
        </div>

        {/* ================= MENU ================= */}
        <ul className="flex-1 mt-4 space-y-1 px-2">
          {menuItems.map(({ name, path, icon: Icon }) => (
            <li key={name} className="relative group">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `
                    flex items-center gap-3 p-3 rounded-lg transition
                    ${isActive
                      ? "bg-violet-100 text-violet-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"}
                  `
                }
              >
                <Icon size={20} className="shrink-0" />
                {open && <span>{name}</span>}
              </NavLink>

              {/* ===== TOOLTIP (WHEN COLLAPSED) ===== */}
              {!open && (
                <span
                  className="
                    absolute left-full top-1/2 -translate-y-1/2 ml-3
                    bg-gray-900 text-white text-xs px-2 py-1 rounded
                    opacity-0 group-hover:opacity-100
                    transition pointer-events-none whitespace-nowrap
                  "
                >
                  {name}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* ================= LOGOUT ================= */}
        <div className="px-2 pb-4 relative group">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-3 p-3 rounded-lg
              text-red-600 hover:bg-red-50 transition
            "
          >
            <LogOut size={20} />
            {open && <span>Logout</span>}
          </button>

          {!open && (
            <span
              className="
                absolute left-full top-1/2 -translate-y-1/2 ml-3
                bg-gray-900 text-white text-xs px-2 py-1 
                opacity-0 group-hover:opacity-100
                transition pointer-events-none
              "
            >
              Logout
            </span>
          )}
        </div>

      </div>
    </aside>
  );
}
