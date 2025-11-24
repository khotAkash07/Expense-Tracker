import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";

let ShowExpense = () => {
    let [expenses, setExpenses] = useState([]);
    let [filteredExpenses, setFilteredExpenses] = useState([]);
    let [filterDate, setFilterDate] = useState('');
    let [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();

    // Function to fetch expenses
    const fetchExpenses = async () => {
        setLoading(true);
        try {
            let loggedUserId = Number(localStorage.getItem("userId"));
            const token = localStorage.getItem("token");

            if (!loggedUserId) {
                console.log("No user ID found");
                return;
            }

            console.log("Fetching expenses for user:", loggedUserId);

            const response = await axios.get(`http://localhost:8080/expense/user/${loggedUserId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Expenses data received:", response.data);

            setExpenses(response.data || []);
            setFilteredExpenses(response.data || []);

        } catch (err) {
            console.log("Error fetching expenses", err);
            alert("Error loading expenses: " + (err.response?.data || err.message));
        } finally {
            setLoading(false);
        }
    };

    // Load expenses on component mount
    useEffect(() => {
        console.log("ShowExpense component mounted");
        fetchExpenses();
    }, []);

    // Check for navigation state to refresh
    useEffect(() => {
        if (location.state?.shouldRefresh) {
            console.log("Refresh triggered from navigation");
            fetchExpenses();
            // Clear the state to prevent infinite refreshes
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    // Filter expenses by date
    const filterExpensesByDate = (selectedDate) => {
        setFilterDate(selectedDate);

        if (!selectedDate) {
            setFilteredExpenses(expenses);
        } else {
            const filtered = expenses.filter(expense => expense.date === selectedDate);
            setFilteredExpenses(filtered);
        }
    };

    // Clear filter
    const clearFilter = () => {
        setFilterDate('');
        setFilteredExpenses(expenses);
    };

    function removeExpense(id) {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            const token = localStorage.getItem("token");
            axios.delete(`http://localhost:8080/expense/deleteExpense/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(() => {
                    const updatedExpenses = expenses.filter(x => x.id !== id);
                    setExpenses(updatedExpenses);
                    setFilteredExpenses(updatedExpenses);
                    alert("Expense deleted successfully!");
                })
                .catch(error => {
                    console.error("Error deleting expense:", error);
                    alert("Error deleting expense!");
                });
        }
    }

    function handleUpdateExpense(expense) {
        navigate("/updateExpense", { state: { expense: expense } });
    }

    return (
        <div className="min-h-screen bg-[#f3f4f6]">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 pb-10">
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h1 className="text-3xl font-semibold text-gray-800">Expense List</h1>
                        <button
                            onClick={fetchExpenses}
                            disabled={loading}
                            className={`px-5 py-2 rounded-md font-semibold text-white ${
                                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#38a169] hover:bg-[#2f855a]"
                            }`}
                        >
                            {loading ? "Loading..." : "Refresh"}
                        </button>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <label className="block mb-2 text-gray-700 font-medium">Filter by Date:</label>
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => filterExpensesByDate(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                            />
                        </div>
                        <div className="flex items-end gap-3">
                            <button
                                onClick={clearFilter}
                                className="flex-1 px-4 py-2 rounded-md border border-gray-300 text-white hover:bg-gray-100"
                            >
                                Clear Filter
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 text-gray-600 text-sm">
                        <p>Total Expenses: {expenses.length}</p>
                        <p>Showing: {filteredExpenses.length}</p>
                    </div>
                </div>

                {!loading && filteredExpenses.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-600">
                        {filterDate ? `No expenses found for ${filterDate}` : "No expenses found."}
                    </div>
                ) : (
                    filteredExpenses.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-md p-6 mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-semibold text-[#2f855a]">{item.name}</h2>
                                    <p className="text-gray-700 mt-1">
                                        <span className="font-semibold">Amount:</span> ₹{item.amount}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-semibold">Date:</span> {item.date}
                                    </p>
                                    {item.description && (
                                        <p className="text-gray-500 mt-2">{item.description}</p>
                                    )}
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleUpdateExpense(item)}
                                        className="px-4 py-2 rounded-md bg-[#3182ce] hover:bg-[#2b6cb0] text-white font-semibold"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => removeExpense(item.id)}
                                        className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ShowExpense;