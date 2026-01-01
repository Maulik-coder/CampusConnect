// import { Link } from "react-router-dom";

// export default function Footer() {
//   return (
//     <footer className="bg-white border-t">
//       <div className="container mx-auto flex items-center justify-between px-4 py-4">
//         <span>© 2025 UniversityPortal. All rights reserved.</span>

//         <div className="flex gap-6">
//           <Link to="/Privacy" className="hover:text-gray-800 transition">
//             Privacy
//           </Link>
//           <Link to="/Terms" className="hover:text-gray-800 transition">
//             Terms
//           </Link>
//           <Link to="/Support" className="hover:text-gray-800 transition">
//             Support
//           </Link>
//         </div>
//       </div>
//     </footer>
//   );
// }
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-4 text-sm text-gray-600 gap-3">
        
        <span className="whitespace-nowrap">
          © 2025 UniversityPortal. All rights reserved.
        </span>

        <div className="flex gap-6">
          <Link to="/Privacy" className="hover:text-gray-900 transition">
            Privacy
          </Link>
          <Link to="/Terms" className="hover:text-gray-900 transition">
            Terms
          </Link>
          <Link to="/Support" className="hover:text-gray-900 transition">
            Support
          </Link>
        </div>

      </div>
    </footer>
  );
}
