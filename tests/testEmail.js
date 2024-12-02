const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "pranjalekhande11@gmail.com",
    pass: "Product$2468",
  },
});

const sendTestEmail = async () => {
  try {
    await transporter.sendMail({
      from: "pranjalekhande11@gmail.com",
      to: "recipient_email@example.com",
      subject: "Test Email",
      text: "This is a test email.",
    });
    console.log("Test email sent successfully!");
  } catch (error) {
    console.error("Error sending test email:", error);
  }
};

sendTestEmail();
