import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";


const PublicRSVP = () => {
  console.log("In Public ")
  const { eventId, invitationId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  console.log(eventId,invitationId)
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

  if (!eventDetails) return <div>Loading...</div>;

  const { invitation, event } = eventDetails;

  return (
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

      {/* Advertisement for login */}
    <div className="mt-8 text-center">
      <p className="text-gray-600">Want to create your own events?</p>
      <a
        href="/login"
        className="text-blue-500 underline hover:text-blue-700"
      >
        Log in to create events!
      </a>
    </div>
    </div>
  );
};


export default PublicRSVP;
