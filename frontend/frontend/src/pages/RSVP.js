import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


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
    const emailList = inviteeEmail.split(",").map((email) => email.trim());

    try {
      await axiosInstance.post(`/invitations/send`, { eventId, inviteeEmail: emailList });
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

      <main className=" flex-col  items-center p-6 md:p-12" style={{ backgroundImage: "url('/images/main-background-card-landscape.png')", // Update with your image path
            }} >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">RSVP for Event</h2>
          {responseMessage && <p className="text-green-500">{responseMessage}</p>}
          {/* Input for sending invitations */}
          <div className="mb-4">
            <input
              type="inviteeEmail"
              placeholder="Enter email to invite"
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

          <ul >
            {invitations.map((invitation) => (


              <li key={invitation._id} className="border p-2 mb-2 flex justify-between items-center"  style={{ backgroundImage: "url('/images/card-blue-background.png')", 
              }}>
                <div >
                  <p>Invitee: {invitation.inviteeEmail}</p>
                  <p>Status: {invitation.rsvpStatus || "Pending"}</p>


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

export default RSVP;
