import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import { Link, useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/events", { title, description, date, location });
      alert("Event created successfully!");

      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event");
    }
  };
  const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    window.location.href = "/"
  }; 
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1
          onClick={() => (window.location.href = "/dashboard")}
          className="text-2xl font-bold cursor-pointer"
        >
          Eventify
        </h1>
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-1 px-4 rounded"
          >
            Logout
      </button>
      </header>

      {/* Navbar */}
      <nav className="bg-gray-100 p-4 shadow flex justify-around">
        
        <Link to="/dashboard" className="text-blue-500 hover:underline">
          Dashboard
        </Link>
        <Link to="/create-event" className="text-blue-500 hover:underline">
          + Create New Event
        </Link>
        <Link to="/send-invitation" className="text-blue-500 hover:underline">
          Send Event Invitation
        </Link>
        <Link to="/admin/users" className="text-blue-500 hover:underline">
          User Management
        </Link>
      </nav>
      
      <main className="flex-1 flex flex-col md:flex-row items-center p-6 md:p-12">
      <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-gray-700 mb-6">
          Fill out the details below to create a new event. Make sure to provide an accurate title, date, and location to ensure your attendees have all the necessary information. You can edit these details later if needed.
          </p>
      </div>
      <div className="w-full md:w-1/2">
      {/* <div className="p-4 max-w-md mx-auto"> */}
        <h2 className="text-xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border mb-2"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border mb-2"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border mb-2"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border mb-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 w-full">
            Create Event
          </button>
        </form>
      </div>
      </main>
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

export default CreateEvent;
