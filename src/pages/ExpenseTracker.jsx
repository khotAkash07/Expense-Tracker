import Navbar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";

let ExpenseTracker = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            {/* Hero Section */}
            <div className="flex justify-center items-center px-6 py-20">
                <div className="bg-white max-w-4xl w-full p-12 rounded-2xl shadow-xl/30 text-center">

                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        Spend Your Money Wisely
                    </h2>

                    <p className="text-lg md:text-xl text-gray-600 mb-2">
                        Every rupee matters.
                    </p>

                    <p className="text-lg md:text-xl text-gray-600 mb-2">
                        Smart tracking starts here.
                    </p>

                    <p className="text-lg md:text-xl text-gray-600 mb-8">
                        Track your spending, shape your future.
                    </p>

                    {/* Call to Actions */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => navigate("/addExpense")}
                            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-white transition-colors duration-300 cursor-pointer"
                        >
                            Add Expense
                        </button>

                        <button
                            onClick={() => navigate("/ShowExpense")}
                            className="px-6 py-3 border text-white border-black rounded-lg hover:bg-white "
                        >
                            View Expenses
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;
