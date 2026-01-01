import Header from "../component/Header";
import Footer from "../component/Footer";
import { Outlet } from "react-router-dom";

export default function LoginLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="flex-1 flex items-center justify-center">        
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
