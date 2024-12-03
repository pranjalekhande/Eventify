const express = require("express");
const Invitation = require("../models/Invitation");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const { sendEmail } = require("../email");


router.post("/send", authMiddleware, async (req, res) => {
  

  const { eventId, inviteeEmail } = req.body; // `inviteeEmail` should be an array of emails

  try {
    // Fetch the event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    // Check authorization
    if (event.organizer.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized to send invitations for this event" });
    }

    // Map emails to invitation objects
    const invitations = inviteeEmail.map((email) => ({
      inviteeEmail: email,
      event: eventId,
      organizer: req.user.id,
      rsvpStatus: "Pending",
    }));

    

    // Save invitations in the database
    const createdInvitations = await Invitation.insertMany(invitations);

    // Send email notifications
    const promises = inviteeEmail.map(async (email, index) => {
      const rsvpLink = `http://localhost:3000/public/rsvp/${eventId}/${createdInvitations[index]._id}/`;
      const subject = `You're Invited to ${event.title}`;
      const text = `
        Hi,

        You have been invited to the event "${event.title}" scheduled on ${new Date(
          event.date
        ).toLocaleString()}.

        Please RSVP at the following link: ${rsvpLink}

        Thank you!
      `;

      
      try {
        await sendEmail(email, subject, text); // Send email to each invitee
        console.log(`Email sent to: ${email}`);
      } catch (emailError) {
        console.error(`Failed to send email to: ${email}`, emailError);
      }
    });

    // Wait for all emails to be sent
    await Promise.all(promises);

    res.status(201).json({ msg: "Invitations sent and email notifications delivered", createdInvitations });
  } catch (error) {
    console.error("Error sending invitation:", error);
    res.status(500).send("Server error");
  }
});




// Route to update RSVP status
router.put("/rsvp/:id", async (req, res) => {
    const { rsvpStatus } = req.body;
  
    try {
      // Check if RSVP status is valid
      if (!["Accepted", "Declined"].includes(rsvpStatus)) {
        return res.status(400).json({ msg: "Invalid RSVP status" });
      }
  
      // Find the invitation by ID
      const invitation = await Invitation.findById(req.params.id);
      if (!invitation) return res.status(404).json({ msg: "Invitation not found" });
  
      // Update RSVP status
      invitation.rsvpStatus = rsvpStatus;
      await invitation.save();
  
      res.json({ msg: `RSVP ${rsvpStatus}`, invitation });
    } catch (error) {
      console.error("Error updating RSVP:", error);
      res.status(500).send("Server error");
    }
  });

  // Route to get all invitations for an event
router.get("/event/:eventId", authMiddleware, async (req, res) => {
    try {
      // Verify the event exists and that the logged-in user is the organizer
      const event = await Event.findById(req.params.eventId);
      if (!event) return res.status(404).json({ msg: "Event not found" });
  
      if (event.organizer.toString() !== req.user) {
        return res.status(401).json({ msg: "Not authorized to view invitations for this event" });
      }
  
      // Fetch all invitations for the event
      const invitations = await Invitation.find({ event: req.params.eventId });
      res.json(invitations);
    } catch (error) {
      console.error("Error retrieving invitations:", error);
      res.status(500).send("Server error");
    }
  });
  

module.exports = router;
