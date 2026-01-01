import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.png";


export default function Header() {
   
    return (
        <header className="bg-white border-r">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">

                <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-10 h-10 object-contain"
                    />

                    <span>Campus Connect</span>

                </div>

                <div className="hidden md:flex items-center gap-6 text-sm">
                    <Link to="/HelpCenter" className="text-gray-600 hover:text-gray-900 transition">
                        Help Center
                    </Link>
                    <Link to="/Contactsupport" className="text-gray-600 hover:text-gray-900 transition">
                        Contact Support
                    </Link>

                </div>

            </div>
        </header>
    )
}