import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
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
            const response = await axios.put("http://localhost:8080/expense", updatedExpense, {
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
        <div className="min-h-screen bg-[#f3f4f6]">
            <Navbar />
            <div className="flex justify-center px-4 pb-10">
                <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-3xl">
                    <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Update Expense</h2>

                    <label className="block mb-2 text-gray-700 font-medium">Expense Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                        required
                    />

                    <label className="block mb-2 text-gray-700 font-medium">Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                        required
                    />

                    <label className="block mb-2 text-gray-700 font-medium">Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                        required
                    />

                    <label className="block mb-2 text-gray-700 font-medium">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                        rows="3"
                        placeholder="Optional description"
                    />

                    <button
                        onClick={updateExpenseDetails}
                        disabled={loading}
                        className={`w-full text-white py-3 rounded-md font-semibold transition-colors ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#38a169] hover:bg-[#2f855a]"
                        }`}
                    >
                        {loading ? "Updating..." : "Update Expense"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateExpense;