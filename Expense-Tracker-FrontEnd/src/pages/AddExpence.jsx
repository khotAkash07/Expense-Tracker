import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar.jsx";

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
                `https://expense-tracker-1h10.onrender.com/expense/addExpense/${userId}`,
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

    let validDate = (e) => {
        const selectedDate = new Date(e.target.value).getTime();
        const today = Date.now();

        if (selectedDate > today) {
            alert("You cannot select Future Date...");
        } else {
            setDate(e.target.value);
        }
    }


    return (
        <div className=" min-h-screen bg-gray-100">
            <Navbar /><br/>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto ">
                <h2 className="text-2xl font-semibold mb-6 text-black text-center">Add Expense</h2>

                <label className="block mb-2 font-medium text-black">Expense Name:*</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
                    placeholder="Enter expense name"
                    required
                />

                <label className="block mb-2 font-medium text-black">Amount:*</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
                    placeholder="Enter amount"
                    required
                />

                <label className="block mb-2 font-medium text-black">Date:*</label>
                <input
                    type="date"
                    value={date}
                    onChange={validDate}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
                    required
                />

                <label className="block mb-2 font-medium text-black">Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
                    placeholder="Enter description (optional)"
                />

                <button
                    onClick={addExpenseDetails}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
}

export default AddExpense;