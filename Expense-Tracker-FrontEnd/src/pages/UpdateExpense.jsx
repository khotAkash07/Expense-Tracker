import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import { useLocation, useNavigate } from "react-router-dom";

let UpdateExpense = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { expense } = location.state || {};

    let [id, setId] = useState("");
    let [name, setName] = useState('');
    let [amount, setAmount] = useState('');
    let [date, setDate] = useState('');
    let [description, setDescription] = useState('');
    let [loading, setLoading] = useState(false);

    // Pre-fill form with existing expense data
    useEffect(() => {
        if (expense) {
            setId(expense.id);
            setName(expense.name);
            setAmount(expense.amount);
            setDate(expense.date);
            setDescription(expense.description || '');
        }
    }, [expense]);

    // Check authentication on component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first!");
            navigate("/login");

        }
    }, [navigate]);

    async function updateExpenseDetails() {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token) {
            alert("Please login first!");
            navigate("/login");
            return;
        }

        if (!name || !amount || !date) {
            alert("Please fill all required fields!");
            return;
        }

        setLoading(true);

        // Create the expense object with proper structure
        const updatedExpense = {
            id: id,
            name: name,
            amount: parseInt(amount),
            date: date,
            description: description,
            user: { id: parseInt(userId) }
        };

        console.log("Sending update request:", updatedExpense);

        try {
            const response = await axios.put("https://expense-tracker-1h10.onrender.com/expense", updatedExpense, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log("Update response:", response);
            alert("Expense Updated Successfully!");
            navigate("/showExpense", { state: { shouldRefresh: true } });

        } catch (error) {
            console.error("Error updating expense:", error);

            if (error.response?.status === 403) {
                alert("Access denied! Your session may have expired. Please login again.");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                navigate("/login");
            } else if (error.response?.status === 401) {
                alert("Unauthorized! Please login again.");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                navigate("/login");
            } else if (error.response) {
                alert(`Error ${error.response.status}: ${error.response.data}`);
            } else if (error.message === 'Token expired') {
                alert("Session expired! Please login again.");
                navigate("/login");
            } else {
                alert("Error updating expense! Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100 p-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <Navbar />
                <h2 className="text-2xl font-semibold mb-6 text-black text-center">Update Expense</h2>

                <div className="mb-4">
                    <label className="block mb-2 font-medium text-black">Expense ID:</label>
                    <input
                        type="text"
                        value={id}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md text-black bg-gray-100"
                    />
                </div>

                <label className="block mb-2 font-medium text-black">Expense Name:*</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
                    required
                />

                <label className="block mb-2 font-medium text-black">Amount:*</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
                    required
                />

                <label className="block mb-2 font-medium text-black">Date:*</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
                    required
                />

                <label className="block mb-2 font-medium text-black">Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
                    placeholder="Optional description"
                />

                <button
                    onClick={updateExpenseDetails}
                    disabled={loading}
                    className={`w-full text-white py-2 rounded-md transition-colors ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Updating...' : 'Update Expense'}
                </button>
            </div>
        </div>
    );
};

export default UpdateExpense;