const nodemailer = require("nodemailer");
const Invitation = require("./models/Invitation");
const Event = require("./models/Event");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

const sendReminders = async () => {
  try {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000); 

    
    const upcomingEvents = await Event.find({
      date: { $gte: now, $lte: tomorrow },
    });

    for (const event of upcomingEvents) {
     
      const acceptedInvites = await Invitation.find({
        event: event._id,
        rsvpStatus: "Accepted",
      });

      
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