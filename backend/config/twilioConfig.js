const twilio = require("twilio");


const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio Account SID from Twilio Console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Twilio Auth Token
const serviceSid = process.env.TWILIO_SERVICE_SID; // Your Twilio Verify Service SID

const client = twilio(accountSid, authToken);

module.exports = { client, serviceSid };
