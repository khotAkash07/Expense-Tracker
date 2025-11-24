import { useNavigate, Link } from "react-router-dom";
import axios from "./axiosConfig";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function LoginUser(e) {
        if (e) {
            e.preventDefault();
        }

        if (!email || !password) {
            alert("All Fields are required");
            return;
        }

        setLoading(true);

        try {
            console.log("Attempting login for:", email);
            const response = await axios.post("http://localhost:8080/auth/login", {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000 // 10 second timeout
            });

            console.log("Login response:", response.data);

            if (!response.data || !response.data.token) {
                alert("Login failed! No token received.");
                setLoading(false);
                return;
            }

            if (!response.data.user || !response.data.user.id) {
                alert("Login failed! User data not received.");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            console.log("Login successful, redirecting...");
            alert("Login successful!");
            navigate("/expenseTracker");
        } catch (e) {
            console.error("Login error:", e);
            if (e.response) {
                if (e.response.status === 401 || e.response.status === 400) {
                    alert("Invalid email or password!");
                } else {
                    alert(`Login failed! Error: ${e.response.status} - ${e.response.data || e.response.statusText}`);
                }
            } else if (e.request) {
                alert("Network error! Please check if the backend server is running on http://localhost:8080");
            } else {
                alert("Login failed! Please try again. Error: " + e.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-sm p-8">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login Page</h1>

                <form onSubmit={LoginUser}>
                    <label className="block mb-2 text-gray-700 font-medium">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                        placeholder="Enter your email"
                        disabled={loading}
                        required
                    />

                    <label className="block mb-2 text-gray-700 font-medium">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2.5 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f855a]"
                        placeholder="Enter your password"
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
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-center">
                    <Link
                        to="/registration"
                        className="text-blue-700 hover:text-blue-900 underline cursor-pointer"
                    >
                        New user? Register here
                    </Link>
                </p>


            </div>
        </div>
    );
};

export default Login;