import React from "react";
import { Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar"; 
import Login from "./pages/Login"; // Your Login component
import Dashboard from "./pages/Dashboard"; // Your Dashboard component
import Home from "./pages/Home"; 
import CreateEvent from "./pages/CreateEvent";
import RSVP from "./pages/RSVP"
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import SendInvitation from "./pages/SendInvitation"
import PublicRSVP from "./pages/PublicRSVP";
import Registration from "./pages/Registration";
import UserManagement from "./pages/UserManagement";
import TermsConditions from "./pages/TermsCondition"
import PrivacyPolicy from "./pages/PrivacyPolicy"


const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />;
        <Route path="/public/rsvp/:eventId/:invitationId" element={<PublicRSVP />} />      
        <Route path="/rsvp/:eventId" element={<RSVP />} />
        <Route path="/register" element={<Registration />} />
        <Route path ="/terms" element ={<TermsConditions/> }/>
        <Route path ="/privacy" element ={<PrivacyPolicy/> }/>
        <Route path="/send-invitation" element={<SendInvitation />} />
        <Route path="/analytics/:eventId" element={<AnalyticsDashboard />} />        
        <Route path="/admin/users" element={<UserManagement/>}/>
      </Routes>
    </>
  );
};

export default App;