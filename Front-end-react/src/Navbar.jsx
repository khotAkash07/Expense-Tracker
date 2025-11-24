import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        alert("Logged out successfully!");
        navigate("/login");
    };

    return (
        <nav className="w-full bg-[#2f855a] shadow-md mb-8">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between text-white">
                <button
                    className="text-2xl font-bold focus:outline-none"
                    onClick={() => navigate("/expenseTracker")}
                >
                    Home
                </button>
                <div className="flex gap-3">

                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 rounded-md bg-[#38a169] text-white font-semibold hover:bg-[#2f855a] transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
