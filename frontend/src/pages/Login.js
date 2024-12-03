import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.token); // Save JWT token
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password");
    }
  };

  return (

    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
    
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 onClick={() => window.location.href = "/" } className="text-2xl font-bold">Eventify</h1>
        <button  onClick={() => window.location.href = "/register"}
               className="bg-white text-blue-500 py-1 px-4 rounded">Register</button>
    </header>
    <div  className="min-h-screen bg-cover bg-center flex items-center justify-center"
    style={{
      backgroundImage: "url('/images/login-background.jpg')", // Update with your image path
    }}>
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border mb-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border mb-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 w-full">
            Login
          </button>

          <p>Don't have an Account?</p>
             <p onClick={() => navigate("/register")} style={{ cursor: "pointer", color: "blue" }}>
                 Register Here
          </p>
        </form>
      </div>
    </div>
     {/* Footer Section */}
     <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()} Eventify. All rights reserved.</p>
        <p>
          <a href="/privacy" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-blue-400 hover:underline">
            Terms of Service
          </a>
        </p>
      </footer>
  </div>
  );
};

export default Login;


