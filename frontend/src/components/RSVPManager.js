import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const RSVPManager = () => {
  const [invitations, setInvitations] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const response = await axiosInstance.get("/invitations");
        setInvitations(response.data);
      } catch (error) {
        console.error("Error fetching invitations:", error);
      }
    };

    fetchInvitations();
  }, []);

  const handleRSVP = async (invitationId, status) => {
    try {
      await axiosInstance.put(`/dashboard/rsvp/${invitationId}`, { rsvpStatus: status });
      setResponseMessage(`RSVP updated to "${status}"`);
      setTimeout(() => setResponseMessage(""), 3000);
    } catch (error) {
      console.error("Error updating RSVP:", error);
      alert("Failed to update RSVP");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">RSVP Management</h2>
      {responseMessage && <p className="text-green-500">{responseMessage}</p>}
      <ul>
        {invitations.map((invitation) => (
          <li key={invitation._id} className="border p-2 mb-2">
            <p>Event: {invitation.event.title}</p>
            <p>Organizer: {invitation.event.organizer.name}</p>
            <button
              className="bg-blue-500 text-white py-1 px-2 mr-2"
              onClick={() => handleRSVP(invitation._id, "Accepted")}
            >
              Accept
            </button>
            <button
              className="bg-red-500 text-white py-1 px-2"
              onClick={() => handleRSVP(invitation._id, "Declined")}
            >
              Decline
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RSVPManager;
