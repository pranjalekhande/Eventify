const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");
const invitationRoutes = require("./routes/invitations");

const analytics = require("./routes/analytics");
const cron = require("node-cron");
const Invitation = require("./models/Invitation");
const Event = require("./models/Event");
const adminRoutes = require("./routes/admin");
const publicRoutes = require("./routes/publicrsvp");
const otpRoutes = require("./routes/otpRoutes");

const adminApi = require("./routes/adminRoutes")


// dotenv.config();
require("dotenv").config();


const app = express();


const connectDB = require("./config/db");
connectDB().then(() => console.log("Database connected"));

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from the React frontend
app.use(express.json()); // Parse incoming JSON requests

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes); 
app.use("/api/invitations", invitationRoutes);
app.use("/api/events", analytics);
app.use("/api/admin", adminRoutes);
app.use("/api/",otpRoutes)
app.use("/api/public", publicRoutes);

app.use("/api/adminControl", adminApi);


// Sample route for testing
app.get("/", (req, res) => {
  res.send("Eventify API is running");
});

cron.schedule("0 * * * *", async () => {
  try {
    const now = new Date();
    const upcomingEvents = await Event.find({
      date: { $gte: now, $lte: new Date(now.getTime() + 24 * 60 * 60 * 1000) },
    });

    for (const event of upcomingEvents) {
      const acceptedInvites = await Invitation.find({ event: event._id, rsvpStatus: "Accepted" });
      for (const invite of acceptedInvites) {
        const subject = `Reminder: ${event.title} is Tomorrow!`;
        const text = `Hi,\n\nThis is a reminder that you RSVP'd "Accepted" for the event "${event.title}" scheduled on ${new Date(
          event.date
        ).toLocaleString()}.\n\nThank you.`;
        await sendEmail(invite.inviteeEmail, subject, text);
      }
    }
    console.log("Reminders sent successfully");
  } catch (error) {
    console.error("Error sending reminders:", error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
