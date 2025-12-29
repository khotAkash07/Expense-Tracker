import { useNavigate } from "react-router-dom";

let Navbar = () => {
    let navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem("user"));


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
        alert("Logged out successfully!");
        navigate("/login");
    };
    return (
        <nav className="w-full  text-white py-4 px-6 flex items-center bg-black h-15">
            {/*<h1>{session.getItem(user.userName)}</h1>*/}
            <h1 className="w-full text-3xl">{`Welcome ${user.fullName}`}</h1>
            <div className="w-full flex items-end justify-end gap-3 ">
                <button
                    onClick={() => navigate("/ExpenseTracker")}
                    className=""
                >
                    Home
                </button>
            <button
                onClick={() => navigate("/addExpense")}
                className=""
            >
                Add Expense
            </button>
            <button
                onClick={() => navigate("/showExpense")}
                className=""
            >
                View Expense
            </button>
            <button
                onClick={handleLogout}
            >
                Logout
            </button>
            </div>
        </nav>
    );
};

export default Navbar;
