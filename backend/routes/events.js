const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

// Route to create a new event
router.post("/", authMiddleware, roleMiddleware("organizer"), async (req, res) => {
  const { title, description, date, location } = req.body;  

  try {
    const event = new Event({
      title,
      description,
      date,
      location,
      organizer: req.user.id,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).send("Server error");
  }
});


router.get("/", authMiddleware, async (req, res) => {
    try {
      const events = await Event.find({ organizer: req.user.id });
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).send("Server error");
    }
  });

  
// Route to update an event
router.put("/:id", authMiddleware, async (req, res) => {
    const { title, description, date, location } = req.body;
  
    try {
      // Find the event by ID
      let event = await Event.findById(req.params.id);
  
      // Check if the event exists
      if (!event) return res.status(404).json({ msg: "Event not found" });
  
      // Verify the organizer is the logged-in user
      if (event.organizer.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized to update this event" });
      }
  
      // Update event details
      event.title = title || event.title;
      event.description = description || event.description;
      event.date = date || event.date;
      event.location = location || event.location;
  
      // Save the updated event
      event = await event.save();
      res.json(event);
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).send("Server error");
    }
  });
  // Route to delete an event
    router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      // Find the event by ID
      const event = await Event.findById(req.params.id);
  
      // Check if the event exists
      if (!event) return res.status(404).json({ msg: "Event not found" });
  
      // Verify the organizer is the logged-in user
      if (event.organizer.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized to delete this event" });
      }
  
      // Delete the event using findByIdAndDelete
      await Event.findByIdAndDelete(req.params.id);
      res.json({ msg: "Event deleted" });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).send("Server error");
    }
  });

module.exports = router;
