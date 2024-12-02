import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import * as XLSX from "xlsx";

const SendInvitation = () => {
 
  const [eventId, setSelectedEventId] = useState(""); 
  const [inviteeEmail, setEmail] = useState("");
  // const [inviteeEmail, setInviteeEmail] = useState("");
  const [events, setEvents] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [emails, setEmails] = useState("");
  const [fileError, setFileError] = useState("");
  

    // Process Excel File
    const handleFileUpload = (e) => {
    
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const emailList = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) // Get as rows
        .flat()
        .filter((email) => /\S+@\S+\.\S+/.test(email)); // Validate email format

      if (emailList.length === 0) {
        setFileError("No valid email addresses found in the file.");
        return;
      }

      setEmails(emailList.join(","));
   
      setFileError("");
    };

    reader.onerror = () => {
      setFileError("Error reading the file.");
    };
   
    reader.readAsArrayBuffer(file);
  };

  const handleSendInvitations = async () => { 

    if (!eventId || (!emails && !inviteeEmail)) {
      alert("Please fill in all fields.");
      return;
    }
      const emailList = inviteeEmail.split(",").map((email) => email.trim());
     
      
   
    try {
      await axiosInstance.post(`/invitations/send`, {
        eventId,
        inviteeEmail: emailList,
      });

      setResponseMessage("Invitations sent successfully!");
      setEmails(""); // Clear inputs
      setTimeout(() => setResponseMessage(""), 3000);
    } catch (error) {
      console.error("Error sending invitations:", error);
      alert("Failed to send invitations");
    }
  };


  
  // const handleSendInvitation = async () => {
  //   if (!eventId) {
  //     alert("Please select an event.");
  //     return;
  //   }

  //   if (!inviteeEmail) {
  //     alert("Please enter an email address.");
  //     return;
  //   }

  //   try {
  //     await axiosInstance.post(`/invitations/send`, {eventId, inviteeEmail });
      
  //     // await axiosInstance.post(`/events//invitations`, { eventId ,email });
  //     setResponseMessage("Invitation sent successfully!");
  //     setTimeout(() => setResponseMessage(""), 3000);
  //     setEmail(""); 
  //   } catch (error) {
  //     console.error("Error sending invitation:", error);
  //     alert("Failed to send invitation");
  //   }
  // };



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

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Send Invitation</h2>
      {responseMessage && <p className="text-green-500">{responseMessage}</p>}

          {/* Dropdown for selecting event */}
          <div className="mb-4">
            <select
              value={eventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full p-2 border"
            >
              <option value="">Select an event</option>
              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div> 
          

          {/* Input for email */}
          <div className="mb-4">
            <input
              type="inviteeEmail"
              placeholder="Enter invitee email"
              value={inviteeEmail}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border mb-2"
            />
            
          </div>
          
          {/* File Upload for email list */}
          <div>
            <label htmlFor="fileUpload" className="block mb-2 font-bold">
              Upload Excel File:
            </label>
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileUpload}
              accept=".xlsx, .xls"
              className="w-full p-2 mb-4"
            />
          </div>

          <button
              className="bg-blue-500 text-white py-2 px-4"
              onClick={handleSendInvitations}
            >
              Send Invitation
          </button>
    
      
    </div>
  );
};

export default SendInvitation;
