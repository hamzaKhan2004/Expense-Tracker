import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Dashboard/Home";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Income from "./pages/Dashboard/Income";
import Expenses from "./pages/Dashboard/Expenses";
import useUserAuth from "./hooks/useUserAuth";
import { Toaster } from "react-hot-toast";

const App = () => {
  useUserAuth();
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expenses />} />
      </Routes>
      <Toaster toastOptions={{ className: "", style: { fontSize: "13px" } }} />
    </div>
  );
};

export default App;

const Root = () => {
  //Check if token is exists in localstorage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <Navigate to={"/login"} />
  );
};
