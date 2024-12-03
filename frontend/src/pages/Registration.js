
import React, {  useState } from "react";
import axios from "../utils/axiosInstance";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(null);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Registration, 2: OTP Verification
  const [message, setMessage] = useState("");
  

  const handleRegister = async () => {
    try {
        
      const response = await axios.post("/otp/register", {
        name,
        email,
        phone,
        password,
        role,
      });
      setMessage(response.data.msg);
      setUserId(response.data.userId);
      setStep(2); // Move to OTP verification
    } catch (error) {
      setMessage(
        error.response?.data?.msg || "Error during registration. Please try again."
      );
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post("/otp/verify", { userId, otp,});
      setMessage(response.data.msg);
    } catch (error) {
      setMessage(
        error.response?.data?.msg || "Error during verification. Please try again."
      );
    }
  };

  return (

    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
    
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 onClick={() => window.location.href = "/" } className="text-2xl font-bold">Eventify</h1>
        <button  onClick={() => window.location.href = "/login"}
               className="bg-white text-blue-500 py-1 px-4 rounded">Login</button>
    </header>

    <div className="min-h-screen bg-cover bg-center flex items-center justify-center"
    style={{      backgroundImage: "url('/images/registration-background.jpg')", // Update with your image path
    }}
    >
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-2 border"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 border"
          />
          <input
            type="tel"
            placeholder="Phone (+1234567890)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mb-2 border"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-2 border"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border"
          >
            <option value="">Select Role</option>
            {/* <option value="admin">Admin</option> */}
            <option value="organizer">Organizer</option>
            <option value="invitee">Invitee</option>
          </select>
          <button
            onClick={handleRegister}
            className="bg-blue-500 text-white py-2 px-4 w-full"
          >
            Register
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <h3 className="text-xl font-bold mb-4">OTP Verification</h3>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 mb-2 border"
          />
          <button
            onClick={handleVerify}
            className="bg-green-500 text-white py-2 px-4 w-full"
          >
            Verify
          </button>
        </>
      )}
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

export default Registration;
