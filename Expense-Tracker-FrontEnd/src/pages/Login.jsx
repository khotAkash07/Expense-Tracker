import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

let Login = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function LoginUser() {
        if (!email || !password) {
            alert("All Fields are required");
            return;
        }

        setLoading(true);

        try {
            console.log(" Attempting login...");

            let response = await axios.post("https://expense-tracker-1h10.onrender.com/auth/login", {
                email,
                password
            });

            console.log("Login response:", response.data);

            if (!response.data.token) {
                alert("Login failed! No token received.");
                return;
            }

            // Store JWT token and user data
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            console.log(" Token stored in localStorage");
            alert(" Login successful!");
            navigate("/expenseTracker");

        } catch (e) {
            console.error(" Login error:", e);
            if (e.response && e.response.status === 401) {
                alert("Invalid email or password!");
            } else {
                alert("Login failed! Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    // Function to navigate to registration
    const goToRegistration = () => {
        console.log(" Navigating to registration page");
        navigate("/Registration");
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <h1 className="absolute text-4xl top-15 font-bold">Expense Tracker</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-black"> Login </h2>

                <label className="block mb-2 font-medium text-black">Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
                    placeholder="Enter your email"
                    disabled={loading}
                />

                <label className="block mb-2 font-medium text-black">Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md text-black"
                    placeholder="Enter your password"
                    disabled={loading}
                />

                <button
                    onClick={LoginUser}
                    disabled={loading}
                    className={`w-full text-white py-2 rounded-md transition-colors ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="mt-4 text-center">
                    <a
                        onClick={goToRegistration}
                        className="text-blue-700 hover:text-blue-900 underline bg-transparent border-none cursor-pointer"
                    >
                        New user? Register here
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;