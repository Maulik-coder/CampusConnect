import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSidebar } from "../Context/SidebarContext";
import { useEffect } from "react";
import api from "../api/axiosConfig";
export default function Notices() {
  const { open } = useSidebar();
  const [activeIndex, setActiveIndex] = useState(null);
const [notices, setNotices] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchNotices();
}, []);

const fetchNotices = async () => {
  try {
    const response = await api.get("/hod/notices");
    if (response.data.status === "SUCCESS") {
      // 💡 Match the data array from your ResponseDTO
      setNotices(response.data.data); 
    }
  } catch (err) {
    console.error("Failed to fetch notices:", err);
  } finally {
    setLoading(false);
  }
};

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

          <div className="space-y-4">
  {loading ? (
    <p className="text-center text-gray-500 py-4">Loading notices...</p>
  ) : notices.length > 0 ? (
    notices.map((notice, index) => (
      <div key={notice.noticeId || index} className="bg-white rounded-xl border shadow-sm">
        <button
          onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-1" />
            <div>
              <p className="font-medium text-gray-900">
                {/* 💡 Use noticeTitle from Java Model */}
                {notice.noticeTitle}
              </p>
              <p className="text-xs text-gray-500">
                {/* Format the date if you have a createdAt field */}
                {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : "Recent"}
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
          <div className="px-6 pb-4 text-sm text-gray-600 border-t pt-3">
            {/* 💡 Use noticeContent from Java Model */}
            {notice.noticeContent}
          </div>
        )}
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 py-4">No notices available.</p>
  )}
</div>
          </div>
        </div>
      </main>
    </>
  );
}
