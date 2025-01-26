import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import EventList from "../components/EventList";

import { Link } from "react-router-dom";


const Dashboard = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {

      try {
        const response = await axiosInstance.get("/events/dashboard");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    window.location.href = "/"
  };

  return (

    <div className="min-h-screen flex flex-col justify-between bg-gray-50">

      <div className="min-h-screen flex  flex-col bg-gray-50">
        <header className="bg-blue-400 text-white p-4 flex justify-between items-center">
          <h1 onClick={() => (window.location.href = "/dashboard")} className="text-2xl font-bold cursor-pointer">
            Eventify
          </h1>
          <button onClick={handleLogout} className="bg-red-500 text-white py-1 px-4 rounded">
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

        <main className="flex-1 flex flex-col  gap-6 p-6" style={{ backgroundImage: "url('/images/main-background-card-landscape.png')", 
            }} >
        {/* <section className="w-full max-w-md">  */}

          <div className="p-4">
            <ul>
              {events.map((event) => (
                <li key={event._id} >
                  { }
                </li>
              ))}
            </ul>
            <h1 className="text-2xl font-bold text-center mt-4">Dashboard</h1>
            <EventList />
          </div>
          {/* </section> */}
          </main>

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
    </div>
  );
};

export default Dashboard;