const nodemailer = require("nodemailer");
const Invitation = require("./models/Invitation");
const Event = require("./models/Event");
require("dotenv").config();

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send a single email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
  }
};

// Function to send reminders for upcoming events
const sendReminders = async () => {
  try {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

    // Find events occurring in the next 24 hours
    const upcomingEvents = await Event.find({
      date: { $gte: now, $lte: tomorrow },
    });

    for (const event of upcomingEvents) {
      // Find attendees who RSVP’d "Accepted" for the event
      const acceptedInvites = await Invitation.find({
        event: event._id,
        rsvpStatus: "Accepted",
      });

      // Send reminder emails to all attendees who RSVP'd "Accepted"
      for (const invite of acceptedInvites) {
        const subject = `Reminder: ${event.title} is happening soon!`;
        const text = `Hi,\n\nThis is a friendly reminder that you RSVP'd "Accepted" for the event "${event.title}" scheduled on ${new Date(
          event.date
        ).toLocaleString()}.\n\nLocation: ${event.location}\n\nWe look forward to seeing you there!\n\nThank you.`;
        await sendEmail(invite.inviteeEmail, subject, text);
      }
    }

    console.log("Reminders sent successfully.");
  } catch (error) {
    console.error("Error sending reminders:", error);
  }
};

module.exports = { sendEmail, sendReminders };