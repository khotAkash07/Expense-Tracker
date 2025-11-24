import { useState } from "react";
import axios from "./axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function addUser(e) {
        if (e) {
            e.preventDefault();
        }

        if (!userName || !password || !email || !fullName) {
            alert("All fields are required");
            return;
        }

        setLoading(true);

        try {
            console.log("Attempting registration for:", email);
            const response = await axios.post("http://localhost:8080/user/addUser", {
                userName,
                password,
                email,
                fullName
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            });

            console.log("Registration response:", response);

            alert("User Registered Successfully!");
            setUserName("");
            setPassword("");
            setEmail("");
            setFullName("");
            
            // Redirect to login after successful registration
            navigate("/login");
        } catch (e) {
            console.error("Registration error:", e);
            if (e.response) {
                if (e.response.status === 400) {
                    alert("Registration failed! " + (e.response.data || "Invalid data provided."));
                } else if (e.response.status === 409) {
                    alert("User already exists with this email!");
                } else {
                    alert(`Registration failed! Error: ${e.response.status} - ${e.response.data || e.response.statusText}`);
                }
            } else if (e.request) {
                alert("Network error! Please check if the backend server is running on http://localhost:8080");
            } else {
                alert("Registration failed! Please try again. Error: " + e.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-xl w-150  p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Registration</h2>

                <form onSubmit={addUser}>
                    <label className="block mb-2 text-gray-700 font-medium">Username:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full p-2.5 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                        placeholder="Enter username"
                        disabled={loading}
                        required
                    />

                    <label className="block mb-2 text-gray-700 font-medium">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2.5 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                        placeholder="Enter password"
                        disabled={loading}
                        required
                    />

                    <label className="block mb-2 text-gray-700 font-medium">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                        placeholder="Enter email"
                        disabled={loading}
                        required
                    />

                    <label className="block mb-2 text-gray-700 font-medium">Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-2.5 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                        placeholder="Enter full name"
                        disabled={loading}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-2.5 rounded-md font-semibold transition-colors ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#38a169] hover:bg-[#2f855a]"
                        }`}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="mt-4 text-center">
                    <Link
                        to="/login"
                        className="text-blue-700 hover:text-blue-900 underline cursor-pointer"
                    >
                        Already have an account? Login here
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Registration;
