import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

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
        navigate("/"); // Redirect to dashboard after deletion
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete the event.");
      }
    }
  };

  if (!analytics) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">RSVP Analytics</h2>

      {/* Edit Mode */}
      {isEditing ? (
        <div className="border p-4 rounded shadow">
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
        // Display Event Details
        <div className="border p-4 rounded shadow">
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

      {/* <div className="border p-4 rounded shadow">
        <h3 className="font-bold">{analytics.event.title}</h3>
        <p>Date: {new Date(analytics.event.date).toLocaleDateString()}</p>
        <p>Location: {analytics.event.location}</p>
      </div> */}
      <div className="mt-4">
        <h4 className="text-xl font-bold">Analytics Summary</h4>
        <ul>
          <li>Total Invites: {analytics.analytics.totalInvites}</li>
          <li>Accepted: {analytics.analytics.accepted}</li>
          <li>Declined: {analytics.analytics.declined}</li>
          <li>Pending: {analytics.analytics.pending}</li>
        </ul>

      </div>
      <div>
        <button
            className="bg-blue-500 text-white py-2 px-4"
            onClick={() => navigate(`/rsvp/${eventId}`)}
        >
            Manage Invitations
        </button>


    </div>
    </div>
  );
};

export default AnalyticsDashboard;
