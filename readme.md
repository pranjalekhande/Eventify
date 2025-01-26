Run Backend
npm run dev



To create this event management system step-by-step, let's break down the process into key stages with a focus on mobile-friendly design and feature-by-feature implementation. Here’s a detailed plan:

### **Phase 1: Project Setup**

1. **Define Project Structure and Dependencies**
   - Initialize a Git repository for version control. (done)
   - Set up Node.js and Express for the backend API.
   - Set up a React project for the frontend (you can use Create React App or Vite).
   - Install core dependencies:
     - Backend: Express, MongoDB (or preferred database), JWT (for authentication), and Nodemailer (for emails).
     - Frontend: React Router (for navigation), Axios (for API requests), and Tailwind CSS or Styled Components (for mobile-friendly design).

### **Phase 2: User Authentication System**

1. **Backend – User Authentication**
   - Set up a user authentication API with registration and login endpoints.
   - Use JSON Web Tokens (JWT) for secure authentication.
   - Implement basic error handling for invalid logins or registrations.

2. **Frontend – Auth Pages**
   - Design and implement responsive login and registration forms.
   - Implement a simple context for handling authentication state across the app.
   - Ensure mobile-friendly design using Tailwind CSS or CSS Media Queries.

3. **Testing & Debugging**
   - Test user signup and login flow.
   - Verify that authenticated pages are only accessible when logged in.

### **Phase 3: Event Creation and Management**

1. **Backend – Event Management API**
   - Create endpoints to handle CRUD operations for events:
     - **Create Event**: POST `/events`
     - **Get Events**: GET `/events` or `/events/:id`
     - **Update Event**: PUT `/events/:id`
     - **Delete Event**: DELETE `/events/:id`
   - Add validation to ensure only authenticated users can create or manage events.

2. **Frontend – Event Creation and Dashboard**
   - Build a mobile-friendly event creation form.
   - Implement an Event Dashboard that displays a list of user-created events.
   - Allow filtering and sorting of events for easy navigation.

3. **Testing & Debugging**
   - Test creating, updating, and deleting events.
   - Verify mobile responsiveness and usability on different devices.

### **Phase 4: Invitation and RSVP System**

1. **Backend – Invitation Management**
   - Add endpoints for sending and managing invitations:
     - **Send Invitations**: POST `/invitations`
     - **Get Invitations**: GET `/invitations`
     - **Update RSVP**: PUT `/invitations/:id/rsvp`
   - Set up basic email invitations using Nodemailer.

2. **Frontend – Invite and RSVP Interface**
   - Design a mobile-friendly interface for event invitations.
   - Implement RSVP functionality with options to Accept or Decline.
   - Display invitation status on the Event Dashboard.

3. **Testing & Debugging**
   - Test sending, accepting, and declining invitations.
   - Ensure invitees receive accurate event information and can respond on mobile.

### **Phase 5: Notifications and Reminders**

1. **Backend – Notifications API**
   - Implement real-time notifications for RSVPs and reminders with WebSocket or Socket.io.
   - Schedule reminders (e.g., 24 hours before the event) using a task scheduler like Node-Cron.

2. **Frontend – Notification System**
   - Design a notification component that displays RSVP confirmations and reminders.
   - Ensure notifications are accessible and unobtrusive on mobile devices.

3. **Testing & Debugging**
   - Test real-time notifications and scheduled reminders.
   - Verify the effectiveness of the notification system on different devices.

### **Phase 6: Calendar Integration and Final Touches**

1. **Calendar Integration**
   - Allow users to download events as .ics files or integrate with Google Calendar API for easy scheduling.
   
2. **Final Mobile Optimization**
   - Conduct thorough mobile testing and optimization.
   - Make any necessary UI adjustments to enhance mobile usability.

3. **Deployment**
   - Deploy the backend to a cloud service like Heroku or DigitalOcean.
   - Host the frontend with services like Netlify or Vercel.

With this plan, we can move forward step-by-step, focusing on each feature thoroughly. Let’s start with **Phase 1**: setting up the project structure and installing dependencies. Let me know once you’re ready, and we’ll go from there!



### **Phase 1: Project Setup**

1. **Define Project Structure and Dependencies**
   - Initialized a Git repository for version control called "eventify" (done)
   - Set up Node.js and Express for the backend API.
            npm init -y
            npm install express dotenv cors jsonwebtoken bcryptjs
            npm install -D nodemon (restarting backened during developments)
            npm install cors

   - Set up a React project for the frontend (you can use Create React App or Vite).
            npx create-react-app frontend
            cd frontend
            npm install axios react-router-dom
            npm install -D tailwindcss postcss autoprefixer
            npx tailwindcss init -p

   - Install core dependencies:
     - Backend: Express, MongoDB (or preferred database), JWT (for authentication), and Nodemailer (for emails).
     - Frontend: React Router (for navigation), Axios (for API requests), and Tailwind CSS or Styled Components (for mobile-friendly design).

### **Phase 2: User Authentication System**

1. **Backend – User Authentication**
   install database 
   npm install mongoose

   - Set up a user authentication API with registration and login endpoints.
   - Use JSON Web Tokens (JWT) for secure authentication.
   - Implement basic error handling for invalid logins or registrations.

2. **Frontend – Auth Pages**
   - Design and implement responsive login and registration forms.
   - Implement a simple context for handling authentication state across the app.
   - Ensure mobile-friendly design using Tailwind CSS or CSS Media Queries.

3. **Testing & Debugging**
   - Test user signup and login flow.
   - Verify that authenticated pages are only accessible when logged in.


#### For Excel reading

   npm install xlsx
   npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons

   npm install twilio



