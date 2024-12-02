import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";



const RSVP = () => {
  const { eventId } = useParams();
  const [invitations, setInvitations] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [inviteeEmail, setEmail] = useState(""); 
  const [responseMessage, setResponseMessage] = useState("");
  

  

  useEffect(() => {
    const fetchInvitations = async () => {      
      try {
        const response = await axiosInstance.get(`/events/dashboard/rsvp/${eventId}/invitations`);
        const invitationsData = Array.isArray(response.data) ? response.data : [];
        setInvitations(invitationsData);
      } catch (error) {
        console.error("Error fetching invitations:", error);
        setInvitations([]);
      }
    };
    fetchInvitations();
  }, [eventId]);

  const handleRSVP = async (invitationId, status) => {
    try {
      await axiosInstance.put(`/invitations/rsvp/${invitationId}`, { rsvpStatus: status });
      setResponseMessage(`RSVP updated to "${status}"`);
      setTimeout(() => setResponseMessage(""), 3000);
      // Refresh invitations
      const response = await axiosInstance.get(`/events/dashboard/rsvp/${eventId}/invitations`);
      const invitationsData = Array.isArray(response.data) ? response.data : [];
      setInvitations(invitationsData);
    } catch (error) {
      console.error("Error updating RSVP:", error);
      alert("Failed to update RSVP");
    }
  };
  const handleSendInvitation = async () => {
    if (!inviteeEmail) {
      alert("Please enter an email address.");
      return;
    }
    
    try {           
      await axiosInstance.post(`/invitations/send`, {eventId, inviteeEmail });
      setResponseMessage("Invitation sent successfully!");
      setTimeout(() => setResponseMessage(""), 3000);
      setEmail(""); // Clear input
    } catch (error) {
      console.error("Error sending invitation:", error);
      alert("Failed to send invitation");
    }
  };

  const handleDeleteInvitation = async (invitationId) => {
    if (window.confirm("Are you sure you want to delete this invitation?")) {
      try {

        await axiosInstance.delete(`/events/dashboard/rsvp/${eventId}/${invitationId}`);
        setResponseMessage("Invitation deleted successfully!");
        setTimeout(() => setResponseMessage(""), 3000);
        const response = await axiosInstance.get(`/events/dashboard/rsvp/${eventId}/invitations`);
        setInvitations(response.data);
      } catch (error) {
        console.error("Error deleting invitation:", error);
        alert("Failed to delete invitation");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">RSVP for Event</h2>

     
      {responseMessage && <p className="text-green-500">{responseMessage}</p>}
      {/* Input for sending invitations */}
      <div className="mb-4">
        <input
          type="inviteeEmail"
          placeholder="Enter invitee email"
          value={inviteeEmail}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-2"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4"
          onClick={handleSendInvitation}
        >
          Send Invitation
        </button>
      </div>
      
      <ul>
        {invitations.map((invitation) => (
          <li key={invitation._id} className= "border p-2 mb-2 flex justify-between items-center">
            <div>
            <p>Invitee: {invitation.inviteeEmail}</p>
            <p>Status: {invitation.rsvpStatus || "Pending"}</p>
            
            <p>invitation Id {invitation._id}</p>

            <button
              className="bg-blue-500 text-white py-1 px-2 mr-2"
              onClick={() => handleRSVP(invitation._id, "Accepted")}
            >
              Accepted
            </button>
            <button
              className="bg-red-500 text-white py-1 px-2"
              onClick={() => handleRSVP(invitation._id, "Declined")}
            >
              Decline
            </button>
            </div>
            
            <FontAwesomeIcon
              icon={faTrash}
              className="text-red-500 cursor-pointer"
              onClick={() => handleDeleteInvitation(invitation._id)}
            />
            
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RSVP;
