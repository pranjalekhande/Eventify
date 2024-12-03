import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const AnalyticsDashboard = () => {
  const { eventId } = useParams(); // Get the event ID from the URL
  const [analytics, setAnalytics] = useState(null);
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false); // Track if editing mode is active
  const [formData, setFormData] = useState({ title: "", date: "", location: "" }); // Form state


  
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        
        const response = await axiosInstance.get(`/events/dashboard/${eventId}`);
        
        setAnalytics(response.data);
        setFormData({
          title: response.data.event.title,
          date: response.data.event.date.slice(0, 10), // Format for input date
          location: response.data.event.location,
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleUpdateEvent = async () => {
    try {

      await axiosInstance.put(`/events/${eventId}`, formData);
      setIsEditing(false);
      alert("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update the event.");
    }
  };

  const handleDeleteEvent = async () => {
    if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      try {
        
        await axiosInstance.delete(`/events/${eventId}`);
        alert("Event deleted successfully!");
        navigate("/"); 
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete the event.");
      }
    }
  };
  const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    window.location.href = "/"
  }; 
  if (!analytics) return <div>Loading...</div>;

  return (

    <div className="min-h-screen flex  flex-col bg-gray-50">

      <header className="bg-blue-400 text-white p-4 flex justify-between items-center">
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
      {/* <main className=" flex-col  items-center p-6 md:p-12"> */}
      <main className="flex-1 flex flex-col items-center gap-6 p-6" style={{ backgroundImage: "url('/images/main-background-card-landscape.png')", // Update with your image path
            }} >
          <h2 className="text-2xl font-bold mb-4">RSVP Analytics</h2>

          {/* Edit Mode */}
          {isEditing ? (
            <div className="border p-4 rounded shadow"  style={{ backgroundImage: "url('/images/card-blue-background.png')", 
            }}>
              <h3 className="font-bold">Edit Event</h3>
              <label className="block mb-2">
                Title:  <input type="text"  name="title" value={formData.title} onChange={handleInputChange}  className="w-full p-2 border mb-2" />
              </label>
              <label className="block mb-2">
                Date:
                <input  type="date"  name="date" value={formData.date}  onChange={handleInputChange} className="w-full p-2 border mb-2" />
              </label>
              <label className="block mb-2">
                Location: <input   type="text"  name="location"  value={formData.location}  onChange={handleInputChange}  className="w-full p-2 border mb-2"
                />
              </label>
              <button  className="bg-green-500 text-white py-2 px-4 mr-2"  onClick={handleUpdateEvent}>
                Save
              </button>
              <button className="bg-gray-500 text-white py-2 px-4" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          ) : (
          
            <div className="border p-4 rounded shadow"  style={{ backgroundImage: "url('/images/card-blue-background.png')", 
            }}>
              <h3 className="font-bold">{analytics.event.title}</h3>
              <p>Date: {new Date(analytics.event.date).toLocaleDateString()}</p>
              <p>Location: {analytics.event.location}</p>
              
              <button  className="bg-blue-500 text-white py-2 px-4 mr-2"   onClick={() => setIsEditing(true)}>
                Edit Event
              </button>
              <button className="bg-red-500 text-white py-2 px-4" onClick={handleDeleteEvent}>
                Delete Event
              </button>
            </div>
          )}

         
          <div className="mt-4">
            <h4 className="text-xl font-bold mb-4">Analytics Summary</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-blue-100 border border-blue-300 rounded p-4 text-center">
                <h5 className="text-lg font-bold text-blue-600">Total Invites</h5>
                <p className="text-2xl font-semibold">{analytics.analytics.totalInvites}</p>
              </div>
              <div className="bg-green-100 border border-green-300 rounded p-4 text-center">
                <h5 className="text-lg font-bold text-green-600">Accepted</h5>
                <p className="text-2xl font-semibold">{analytics.analytics.accepted}</p>
              </div>
              <div className="bg-red-100 border border-red-300 rounded p-4 text-center">
                <h5 className="text-lg font-bold text-red-600">Declined</h5>
                <p className="text-2xl font-semibold">{analytics.analytics.declined}</p>
              </div>
              <div className="bg-yellow-100 border border-yellow-300 rounded p-4 text-center">
                <h5 className="text-lg font-bold text-yellow-600">Pending</h5>
                <p className="text-2xl font-semibold">{analytics.analytics.pending}</p>
              </div>
            </div>
           
          </div>

          <div className="mt-4">
            <button
                className="bg-blue-500 text-white py-2 px-4"
                onClick={() => navigate(`/rsvp/${eventId}`)}
            >
                Manage Invitations
            </button>
          </div>
     
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
  );
};

export default AnalyticsDashboard;
