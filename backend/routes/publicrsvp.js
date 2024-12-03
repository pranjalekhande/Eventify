const express = require("express");
const router = express.Router();
const Invitation = require("../models/Invitation");
const Event = require("../models/Event");

// Public route to fetch invitation and event details
router.get("/rsvp/:eventId/:invitationId", async (req, res) => {
    try {
      const { eventId, invitationId } = req.params;
      
      // Find the invitation
      const invitation = await Invitation.findById(invitationId);
      if (!invitation) return res.status(404).json({ msg: "Invitation not found" });
  
      // Ensure the invitation matches the specified event
      if (invitation.event.toString() !== eventId) {
        return res.status(400).json({ msg: "Invitation does not belong to the specified event" });
      }
  
      // Find the associated event
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ msg: "Event not found" });
  
      res.json({ invitation, event });
    } catch (error) {
      console.error("Error fetching RSVP details:", error);
      res.status(500).send("Server error");
    }
  });
  
  router.put("/rsvp/:eventId/:invitationId", async (req, res) => {
    try {
      const { eventId, invitationId } = req.params;
      const { rsvpStatus } = req.body;
  
      // Validate RSVP status
      if (!["Accepted", "Declined"].includes(rsvpStatus)) {
        return res.status(400).json({ msg: "Invalid RSVP status" });
      }
  
      // Find the invitation
      const invitation = await Invitation.findById(invitationId);
      if (!invitation) return res.status(404).json({ msg: "Invitation not found" });
  
      // Ensure the invitation matches the specified event
      if (invitation.event.toString() !== eventId) {
        return res.status(400).json({ msg: "Invitation does not belong to the specified event" });
      }
  
      // Update the RSVP status
      invitation.rsvpStatus = rsvpStatus;
      await invitation.save();
  
      res.json({ msg: "RSVP updated successfully", invitation });
    } catch (error) {
      console.error("Error updating RSVP:", error);
      res.status(500).send("Server error");
    }
  });

module.exports = router;