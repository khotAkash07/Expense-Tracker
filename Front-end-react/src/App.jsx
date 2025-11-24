// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import ShowExpense from './ShowExpense';
import AddExpense from './AddExpence.jsx';
import UpdateExpense from './UpdateExpense';
import AuthChecker from './AuthChecker';
import './axiosConfig';
import ExpenseTracker from "./ExpenseTracker.jsx";
import Registration from "./Registration.jsx"; // Import axios configuration

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