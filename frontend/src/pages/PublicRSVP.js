import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";


const PublicRSVP = () => {
  const { eventId, invitationId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axiosInstance.get(`/public/rsvp/${eventId}/${invitationId}`);
        setEventDetails(response.data);
      } catch (error) {
        console.error("Error fetching RSVP details:", error);
        setEventDetails(null);
      }
    };

    fetchDetails();
  }, [eventId, invitationId]);

  const handleRSVP = async (status) => {
    try {
      await axiosInstance.put(`/public/rsvp/${eventId}/${invitationId}`, { rsvpStatus: status });
      setResponseMessage(`RSVP updated to "${status}"`);
    } catch (error) {
      console.error("Error updating RSVP:", error);
      alert("Failed to update RSVP");
    }
  };

  if (!eventDetails) return <div>Loading...</div>;


  const { invitation, event } = eventDetails;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-400 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Eventify</h1>
        <button
          onClick={() => window.location.href = "/login"}
          className="bg-white text-blue-500 py-1 px-4 rounded"
        >
          Login
        </button>
      </header>
      <main className="flex-1 flex flex-col items-center gap-6 p-6" style={{ backgroundImage: "url('/images/main-background-card-landscape.png')", // Update with your image path
            }} >
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">RSVP for {event.title}</h2>
      <p>Date: {new Date(event.date).toLocaleString()}</p>
      <p>Location: {event.location}</p>
      <p>Invitee: {invitation.inviteeEmail}</p>
      <p>Status: {invitation.rsvpStatus || "Pending"}</p>

      {responseMessage && <p className="text-green-500">{responseMessage}</p>}

      <button
        className="bg-blue-500 text-white py-2 px-4 mr-2"
        onClick={() => handleRSVP("Accepted")}
      >
        Accept
      </button>
      <button
        className="bg-red-500 text-white py-2 px-4"
        onClick={() => handleRSVP("Declined")}
      >
        Decline
      </button>
    <div className="mt-8 text-center">
      <p className="text-gray-600">Want to create your own events?</p>
      <a
        href="/registration"
        className="text-blue-500 underline hover:text-blue-700"
      >
        Register here to create events!
      </a>
    </div>
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


export default PublicRSVP;
