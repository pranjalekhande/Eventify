import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
     
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Eventify</h1>
        <button
          onClick={() => window.location.href = "/"}
          className="bg-white text-blue-500 py-1 px-4 rounded"
        >
          Home
        </button>
      </header>

      
      <main className="flex-1 p-6 md:p-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-500">Terms and Conditions</h2>
        <p className="text-lg text-gray-700 mb-4">
          Last updated: December 2, 2024
        </p>
        <p className="text-gray-700 mb-6">
          These Terms and Conditions ("Terms") govern your use of Eventify. By accessing our platform, you agree to abide by these Terms.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Use of Service</h3>
        <p className="text-gray-700 mb-6">
          Eventify is designed for event organization and RSVP management. You agree not to misuse the platform for illegal or harmful activities.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Account Responsibilities</h3>
        <p className="text-gray-700 mb-6">
          You are responsible for safeguarding your account credentials and for any activity under your account.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Changes to Terms</h3>
        <p className="text-gray-700">
          We reserve the right to update these Terms at any time. Continued use of the platform constitutes acceptance of the revised Terms.
        </p>
        <p className="text-gray-700 mt-6">
          For questions, contact us at{" "}
          <a href="mailto:terms@eventify.com" className="text-blue-500 hover:underline">
            terms@eventify.com
          </a>.
        </p>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()} Eventify. All rights reserved.</p>
        <p>
          <a href="/privacy" className="text-blue-400 hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="text-blue-400 hover:underline">
            Terms of Service
          </a>
        </p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
