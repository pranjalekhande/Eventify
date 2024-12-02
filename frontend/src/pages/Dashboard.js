import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import EventList from "../components/EventList";

import { useNavigate } from "react-router-dom";

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


  return (
    <div className="p-4">
      
      <ul>
        {events.map((event) => (
          <li key={event._id} >
            {/* <h3 className="font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p> */}
          </li>
        ))}
      </ul>
          <h1 className="text-2xl font-bold text-center mt-4">Dashboard</h1>
          

          
          <EventList/>
    </div>


  );
};

export default Dashboard;