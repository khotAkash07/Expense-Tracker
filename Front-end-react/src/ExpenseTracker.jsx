import Navbar from "./Navbar";

const ExpenseTracker = () => {
    return (
        <div className="min-h-screen bg-[#f3f4f6]">
            <Navbar />
            <div className="flex justify-center px-4 pb-10">
                <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-4xl text-center">
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">Welcome to Expense Tracker</h2>
                    <p className="text-gray-600 mb-6">
                        Track and manage your expenses effectively. Use the navigation buttons to add new expenses or view your history.
                    </p>
                    <div className="flex justify-center gap-10 text-[#2f855a] font-semibold">
                        <a href="/addExpense" className="hover:underline">
                            Add Expense
                        </a>
                        <a href="/allExpense" className="hover:underline">
                            Expense List
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;
