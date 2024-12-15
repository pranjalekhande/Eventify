# Eventify - Event Management System

Eventify is a full-stack event management platform designed to simplify event organization, invitation handling, and RSVP tracking. It provides event organizers with real-time insights and invitees with an easy-to-use interface to respond to event invitations.

## Features

- **Event Management**: Create, update, and delete events with detailed information.
- **Invitation Handling**: Send invitations via email, supporting both manual input and bulk upload through Excel files.
- **RSVP Tracking**: Allow invitees to RSVP through unique links, displaying event-specific details.
- **Analytics Dashboard**: Gain real-time insights into RSVP trends and attendee engagement.
- **Role-Based Access**: Admin and user roles for secure feature access and user management.

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT-based secure authentication
- **Email Integration**: Twilio for OTP verification and email notifications

## Installation

1. Clone the repository:
   ```bash
      git clone https://github.com/pranjalekhande/eventify.git
      cd eventify

2. Install dependencies for the backend:
   ```bash
      cd backend
      npm install

3. Install dependencies for the frontend:
   ```bash
      cd ../frontend
      npm install
     
4. Set up environment variables: 
   Create a .env file in the backend directory with the following:
   ```bash
      PORT=5000
      DATABASE_URL=<Your PostgreSQL connection string>
      JWT_SECRET=<Your secret key>
      TWILIO_ACCOUNT_SID=<Your Twilio Account SID>
      TWILIO_AUTH_TOKEN=<Your Twilio Auth Token>
      TWILIO_PHONE_NUMBER=<Your Twilio Phone Number>
5. Run the backend server:
   ```bash
      cd ../backend
      npm start
6. Run the frontend:
   ```bash
      cd ../frontend
      npm start
7. Access the application at http://localhost:3000.

## API Endpoints
   **Event Management**
      POST /api/events - Create a new event
      GET /api/events - Fetch all events
      PUT /api/events/:eventId - Update an event
      DELETE /api/events/:eventId - Delete an event
   
   **Invitations**
      POST /api/invitations - Send invitations
      GET /api/invitations/:invitationId - Fetch invitation details
   **RSVP**
      POST /api/rsvp/:invitationId - Submit RSVP
   **User Management**
      GET /api/users - Fetch all users (Admin only)
      PUT /api/users/:userId - Update user details (Admin only)
      DELETE /api/users/:userId - Delete a user (Admin only)


## Screenshots
      Dashboard
      RSVP Page

## Future Enhancements
   Add support for event reminders and calendar integration.
   Implement more granular user roles (e.g., Organizer, Invitee).
   Enhance analytics with visual charts and exportable reports.

## Contributing
   Contributions are welcome! Please follow the steps below:

*** Fork the repository. ***
   Create a new branch for your feature or bug fix:

   ```bash
      git checkout -b feature/your-feature-name
   ```
   Commit your changes:
   ```bash
      git commit -m "Add your message here"
      Push to your fork and submit a pull request.
   ```
## License
   This project is licensed under the MIT License.

## Acknowledgments
   Built using open-source tools and libraries.

   Special thanks to Twilio for providing email and OTP verification services.
   For questions or feedback, feel free to reach out at pranjalekhande11@gmail.com




