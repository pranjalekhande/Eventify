import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axiosInstance.get("/events/");
          setEvents(response.data);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
  
      fetchEvents();
    }, []);
  
    const handleEventClick = (eventId) => {
        
      navigate(`/analytics/${eventId}`); // Navigate to analytics page with event ID
    };
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((event) => (
            
            <div
              key={event._id}
              className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
              onClick={() => handleEventClick(event._id)} // Navigate on click
            >
              <h3 className="font-bold">{event.title}</h3>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              
              <p>Location: {event.location}</p>
              
             
            </div>
            
          ))}
        </div>
      </div>
    );
  };

export default EventList;
