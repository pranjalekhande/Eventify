import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Eventify</h1>
        <button
          onClick={() => window.location.href = "/"}
          className="bg-white text-blue-500 py-1 px-4 rounded"
        >
          Home
        </button>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 p-6 md:p-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-500">Privacy Policy</h2>
        <p className="text-lg text-gray-700 mb-4">
          Last updated: December 2, 2024
        </p>
        <p className="text-gray-700 mb-6">
          At Eventify, your privacy is our priority. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our platform.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Information We Collect</h3>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>Personal information, such as your name and email address.</li>
          <li>Details about events you create or RSVP to.</li>
          <li>Technical information, including cookies and IP addresses.</li>
        </ul>
        <h3 className="text-2xl font-semibold mb-4">How We Use Your Information</h3>
        <p className="text-gray-700 mb-6">
          We use your information to provide and improve our services, send event updates, and ensure a seamless user experience.
        </p>
        <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
        <p className="text-gray-700">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:privacy@eventify.com" className="text-blue-500 hover:underline">
            privacy@eventify.com
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

export default PrivacyPolicy;
