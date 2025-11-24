import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";

let AddExpense = () => {
    let [name, setName] = useState('');
    let [amount, setAmount] = useState('');
    let [date, setDate] = useState('');
    let [description, setDescription] = useState('');
    let navigate = useNavigate();

    async function addExpenseDetails() {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        console.log("User ID:", userId);
        console.log("Token exists:", !!token);

        if (!token) {
            alert("Please login first!");
            return;
        }

        if (!name || !amount || !date) {
            alert("Please fill all required fields!");
            return;
        }

        try {
            console.log("Sending request to backend...");

            let response = await axios.post(
                `http://localhost:8080/expense/addExpense/${userId}`,
                {
                    name: name,
                    amount: parseInt(amount),
                    date: date,
                    description: description
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log("Backend response:", response.data);

            alert("Expense Added Successfully!");

            // Clear form
            setName('');
            setAmount('');
            setDate('');
            setDescription('');

            // Force navigation and pass a flag to refresh
            navigate('/allExpense', {
                state: { shouldRefresh: true }
            });

        } catch (error) {
            console.error("Add expense error:", error);

            if (error.response) {
                alert(`Error ${error.response.status}: ${error.response.data}`);
            } else if (error.request) {
                alert("Network error! Backend might be down.");
            } else {
                alert("Error adding expense: " + error.message);
            }
        }
    }

    return (
        <div className="min-h-screen bg-[#f3f4f6]">
            <Navbar />
            <div className="flex justify-center px-4 pb-10">
                <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-3xl">
                    <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Add New Expense</h2>

                    <label className="block mb-2 text-gray-700 font-medium">Expense Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                        placeholder="Enter expense name"
                        required
                    />

                    <label className="block mb-2 text-gray-700 font-medium">Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                        placeholder="Enter amount"
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
                        placeholder="Enter description (optional)"
                        rows="3"
                    />

                    <button
                        onClick={addExpenseDetails}
                        className="w-full bg-[#38a169] hover:bg-[#2f855a] text-white py-3 rounded-md font-semibold transition-colors"
                    >
                        Add Expense
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddExpense;