import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSidebar } from "../Context/SidebarContext";

export default function Notices() {
  const { open } = useSidebar();
  const [activeIndex, setActiveIndex] = useState(null);

  const notices = [
    {
      title: "Semester Final Exam Schedule Released",
      date: "Oct 24, 2023",
      content:
        "The final examination schedule for all departments has been released. Please review the timetable and inform students accordingly.",
    },
    {
      title: "Campus Maintenance Alert: Library Wing",
      date: "Oct 20, 2023",
      content:
        "The library wing will undergo maintenance from Oct 22–24. Limited access will be available during this period.",
    },
    {
      title: "New Faculty Orientation Program",
      date: "Oct 15, 2023",
      content:
        "An orientation program for newly joined faculty members will be conducted in the seminar hall.",
    },
    {
      title: "Updated COVID-19 Campus Guidelines",
      date: "Oct 10, 2023",
      content:
        "Updated health and safety guidelines have been issued. All departments must ensure compliance.",
    },
    {
      title: "Annual Budget Submission Deadline",
      date: "Sep 28, 2023",
      content:
        "Departments must submit their annual budget proposals before the deadline.",
    },
  ];

  return (
    <>
      {/* ===== SIDEBAR ===== */}

      {/* ===== HEADER (RIGHT SIDE STATIC) ===== */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-30">
        {/* INNER HEADER (MOVES) */}
        <div
          className={`h-full flex items-center transition-all duration-300
          ${open ? "ml-64" : "ml-20"}`}
        >
          <div className="w-full px-6">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              Hod / Principal Notices
            </h1>
            <p className="hidden sm:block text-sm text-gray-500">
              Official announcements published by administration.
            </p>
          </div>
        </div>
      </header>

      {/* ===== MAIN (RIGHT SIDE STATIC) ===== */}
      <main className="pt-20 min-h-screen bg-gray-50">
        {/* INNER CONTENT (MOVES) */}
        <div
          className={`transition-all duration-300
          ${open ? "ml-60" : "ml-60"}`}
        >
          <div className="max-w-4xl px-6">
            {/* ===== TITLE ===== */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Notices</h2>
            </div>

            {/* ===== NOTICE LIST ===== */}
            <div className="space-y-4">
              {notices.map((notice, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border shadow-sm"
                >
                  <button
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-1" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {notice.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notice.date}
                        </p>
                      </div>
                    </div>

                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {activeIndex === index && (
                    <div className="px-6 pb-4 text-sm text-gray-600">
                      {notice.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
