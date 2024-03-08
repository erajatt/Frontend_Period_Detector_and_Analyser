import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/home" element={<Home token={token} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
