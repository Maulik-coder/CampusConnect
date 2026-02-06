import { useState, useMemo } from "react";
import { Search, CheckCircle, XCircle, Building2 } from "lucide-react";
import { useEffect } from 'react';
import api from '../api/axiosConfig'; 
 
// Import your axios utility
export default function Reports({ open = true }) {
  const [activeTab, setActiveTab] = useState("fee");

  const sidebarWidth = open ? "ml-10" : "ml-10";

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`
        fixed top-0 h-16 z-30 bg-white border-b
        transition-all duration-300
        ${open ? "w-[calc(100%)]" : "w-[calc(100%)]"}
      `}
      >


        <div className="h-full flex items-center px-6">
          <h1 className="flex items-center gap-2 font-semibold text-gray-800">
            <Building2 className="w-6 h-6 text-violet-600" />
            Reports
          </h1>


        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main
        className={`pt-20 px-6 min-h-screen bg-gray-50
        transition-all duration-300
        ${sidebarWidth}`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Institution Reports
            </h2>
            <p className="text-sm text-gray-500">
              Institution-level overview (read-only)
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl border shadow-sm">
            {/* Tabs */}
            <div className="border-b flex gap-6 px-6 pt-4">
              <TabButton
                label="Fee Payment Report"
                active={activeTab === "fee"}
                onClick={() => setActiveTab("fee")}
              />
              <TabButton
                label="Result Report"
                active={activeTab === "result"}
                onClick={() => setActiveTab("result")}
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === "fee" ? <FeeReport /> : <ResultReport />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

/* ================= TAB BUTTON ================= */

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 text-sm font-semibold transition
        ${active
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-500 hover:text-gray-700"
        }`}
    >
      {label}
    </button>
  );
}

/* ================= FEE REPORT ================= */

// function FeeReport() {
//   const data = [
//     {
//       roll: "2024-CS-001",
//       name: "Aditya Sharma",
//       amount: "₹12,500",
//       status: "Paid",
//       receipt: "REC-8921",
//     },
//     {
//       roll: "2024-CS-002",
//       name: "Priya Patel",
//       amount: "₹12,500",
//       status: "Unpaid",
//       receipt: "-",
//     },
//     {
//       roll: "2024-CS-003",
//       name: "Rohan Mehta",
//       amount: "₹12,500",
//       status: "Paid",
//       receipt: "REC-8923",
//     },
//   ];

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full min-w-[700px] text-sm">
//         <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
//           <tr>
//             <th className="p-4 text-left">Roll No</th>
//             <th className="p-4 text-left">Student</th>
//             <th className="p-4 text-left">Amount</th>
//             <th className="p-4 text-left">Status</th>
//             <th className="p-4 text-left">Receipt</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y">
//           {data.map((row, i) => (
//             <tr key={i}>
//               <td className="p-4 font-medium">{row.roll}</td>
//               <td className="p-4">{row.name}</td>
//               <td className="p-4 font-semibold">{row.amount}</td>
//               <td className="p-4">
//                 {row.status === "Paid" ? (
//                   <Badge color="green" icon={CheckCircle} label="Paid" />
//                 ) : (
//                   <Badge color="red" icon={XCircle} label="Unpaid" />
//                 )}
//               </td>
//               <td className="p-4 text-gray-500">{row.receipt}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

function FeeReport() {
  const [feeData, setFeeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeeReports = async () => {
      try {
        // 💡 Since your 'api' utility already has the baseURL, 
        // you just need the endpoint path.
        const response = await api.get("http://localhost:8080/hod/reports/fees");
        
        if (response.data.status === "SUCCESS") {
          setFeeData(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching fee reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeReports();
  }, []);

  if (loading) return <div className="p-10 text-center text-blue-600 animate-pulse">Loading Reports...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] text-sm">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            <th className="p-4 text-left">Roll No</th>
            <th className="p-4 text-left">Student</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Receipt</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {feeData.length > 0 ? (
            feeData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                {/* 💡 Using the exact keys from your FeeReportDTO */}
                <td className="p-4 font-medium text-gray-700">{row.roll}</td>
                <td className="p-4 text-gray-900 font-semibold">{row.name}</td>
                <td className="p-4 text-gray-700">{row.amount}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    row.status === "Paid" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    ● {row.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500 italic">{row.receipt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-10 text-center text-gray-400">
                No fee records found in the system.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ================= IMPROVED RESULT REPORT ================= */
function ResultReport() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // ✅ Changed to relative path to use axiosConfig baseURL
        const response = await api.get("/hod/reports/results");
        if (response.data.status === "SUCCESS") {
          setData(response.data.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(
      (row) =>
        row.roll?.toLowerCase().includes(search.toLowerCase()) ||
        row.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  if (loading) return <div className="p-10 text-center text-violet-600 font-medium">Fetching Records...</div>;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by roll or name"
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-violet-500 outline-none transition-all"
          />
        </div>
        {/* 💡 Added a record counter */}
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Total: {filteredData.length} Students
        </span>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider font-bold">
            <tr>
              <th className="p-4 text-left">Roll No</th>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Semester</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr key={row.roll} className="hover:bg-violet-50/30 transition-colors">
                  <td className="p-4 font-mono text-xs text-gray-600">{row.roll}</td>
                  <td className="p-4 font-semibold text-gray-900">{row.name}</td>
                  <td className="p-4 text-gray-600">{row.course}</td>
                  <td className="p-4 text-gray-600">{row.semester}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        row.status === "Entered"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {row.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="w-8 h-8 text-gray-300" />
                    <p className="text-gray-500 font-medium">No results found for "{search}"</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ================= BADGE ================= */

function Badge({ color, icon: Icon, label }) {
  const colors = {
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${colors[color]}`}
    >
      <Icon size={14} />
      {label}
    </span>
  );
}
