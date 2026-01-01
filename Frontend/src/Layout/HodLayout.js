// import { Outlet } from "react-router-dom";
// import HodSidebar from "../component/HodSidebar";
// import { useSidebar } from "../Context/SidebarContext";

// export default function HodLayout() {
//   const { open } = useSidebar();

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
      
//       {/* Sidebar */}
//       <HodSidebar />

//       {/* Main Content */}
//       <main
//         className={`
//           flex-1
//           min-h-screen
//           transition-all duration-300
//           ${open ? "ml-1" : "ml-1"}
//           p-6
//         `}
//       >
//         <Outlet />
//       </main>

//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import HodDSidebar from "../Sidebar/HodSidebar";
import { useSidebar } from "../Context/SidebarContext";

export default function HodLayout() {
  const { open } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <HodDSidebar />

      {/* Main Content Area */}
      <div
        className={`
          flex-1 transition-all duration-300
          ${open ? "ml-64" : "ml-20"}
        `}
      >
        {/* Page Content */}
        <main className="pt-16 p-6 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

