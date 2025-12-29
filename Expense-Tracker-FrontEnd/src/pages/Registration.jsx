import { useState } from "react";
import axios from "axios";

let Registration = () => {

    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    let [email, setEmail] = useState("");
    let [fullName, setFullName] = useState("");

    function addUser() {
        if (userName && password && email && fullName) {
            axios.post("https://expense-tracker-1h10.onrender.com/user/addUser", {
                userName,
                password,
                email,
                fullName
            }).then(() => {
                alert("User Registered!");
                setUserName("");
                setPassword("");
                setEmail("");
                setFullName("");
            });
        } else {
            alert("All fields are required");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
            <h1 className="absolute text-4xl top-7 font-bold">Expense Tracker</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-black">Registration</h2>

                <label className="block mb-2 font-medium text-black">Username:</label>
                <input type="text" value={userName}
                       onChange={(e) => setUserName(e.target.value)}
                       className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black" />

                <label className="block mb-2 font-medium text-black">Password:</label>
                <input type="password" value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black" />

                <label className="block mb-2 font-medium text-black">Email:</label>
                <input type="text" value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="w-full p-2 mb-4 border border-gray-300 rounded-md" />

                <label className="block mb-2 font-medium text-black">Full Name:</label>
                <input type="text" value={fullName}
                       onChange={(e) => setFullName(e.target.value)}
                       className="w-full p-2 mb-6 border border-gray-300 rounded-md" />

                <button onClick={addUser}
                        className="w-full text-white py-2 rounded-md bg-blue-600">
                    Register
                </button>

                <p className="mt-4 text-center">
                    <a href="/Expense-Tracker/src/pages/Login" className="text-blue-700 underline">
                        Already have an account? Login here
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Registration;
