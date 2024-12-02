import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/create-event">+ Create Event </Link>
      <Link to="/send-invitation">+ Send Event Invitation</Link>

     
      
    </nav>
  );
};

export default Navbar;
