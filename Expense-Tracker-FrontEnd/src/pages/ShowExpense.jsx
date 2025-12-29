import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";
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
        <div className="w-screen min-h-screen bg-green-100">
            <Navbar />
            <div className="p-10">

                <h1 className="text-center font-bold text-4xl">Expense List</h1>

                {/* Refresh and Stats Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mt-6 mb-6">
                    <div className="flex justify-end items-end">
                            <h1 className="text-lg font-semibold">
                                Total Expenses: {expenses.length}
                            </h1>
                    </div>

                    {/* Filter Section */}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Expenses</h2>
                        <div className="flex flex-col md:flex-row gap-2 items-end">
                            <div className="flex-1">
                                <label className="block mb-2 font-medium text-gray-700">Filter by Date:</label>
                                <input
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => filterExpensesByDate(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={clearFilter}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                                >
                                    Clear Filter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expenses List */}
                {!loading && filteredExpenses.length === 0 ? (
                    <div className="text-center mt-5">
                        <p className="text-xl text-gray-600">
                            {filterDate ? `No expenses found for ${filterDate}` : "No expenses found."}
                        </p>
                        {expenses.length > 0 && filterDate && (
                            <button
                                onClick={clearFilter}
                                className="mt-4 text-blue-500 hover:text-blue-700 underline"
                            >
                                Show all {expenses.length} expenses
                            </button>
                        )}
                    </div>
                ) : (
                    !loading && filteredExpenses.map((item) => (
                        <div key={item.id} className="bg-white shadow-md p-5 mt-4 rounded-md relative">
                            <button
                                onClick={() => removeExpense(item.id)}
                                className="absolute top-auto right-3 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition-colors"
                            >
                                Delete Expense
                            </button>

                            <button
                                onClick={() => handleUpdateExpense(item)}
                                className="absolute top-auto right-45 text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md transition-colors"
                            >
                                Update Expense
                            </button>

                            <h2 className="text-green-900 font-bold text-2xl">{item.name}</h2>
                            <p className="text-gray-700">Date: {item.date}</p>
                            <p className="text-gray-700">Amount: ₹{item.amount}</p>
                            {item.description && (
                                <p className="text-gray-500 mt-2">Description: {item.description}</p>
                            )}
                            <hr className="mt-3" />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ShowExpense;