// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import ShowExpense from './pages/ShowExpense.jsx';
import AddExpense from './pages/AddExpence.jsx';
import UpdateExpense from './pages/UpdateExpense.jsx';
import AuthChecker from './pages/AuthChecker.jsx';
import './axiosConfig.js';
import ExpenseTracker from "./pages/ExpenseTracker.jsx";
import Registration from "./pages/Registration.jsx"; // Import axios configuration

function App() {
    return (
        <Router>
            <AuthChecker>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/showExpense" element={<ShowExpense />} />
                    <Route path="/addExpense" element={<AddExpense />} />
                    <Route path="/updateExpense" element={<UpdateExpense />} />
                    <Route path="/expenseTracker" element={<ExpenseTracker />} />
                    <Route path="/allExpense" element={<ShowExpense />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/" element={<Registration />} />
                </Routes>
            </AuthChecker>
        </Router>
    );
}

export default App;