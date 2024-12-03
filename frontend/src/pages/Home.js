import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Header Section */}
      <header className="bg-blue-400 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Eventify</h1>
        <button
          onClick={() => window.location.href = "/login"}
          className="bg-white text-blue-500 py-1 px-4 rounded"
        >
          Login
        </button>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center p-6 md:p-12" style={{ backgroundImage: "url('/images/main-background-card-landscape.png')", // Update with your image path
            }} >
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">Organize and Manage Events Seamlessly</h2>
          <p className="text-lg text-gray-700 mb-6">
            Eventify helps you manage your events, invitations, and RSVPs effortlessly. Whether you're planning a small gathering or a grand conference, Eventify has you covered.
          </p>
          <button
            onClick={() => window.location.href = "/register"}
            className="bg-blue-500 text-white py-2 px-6 rounded shadow-lg hover:bg-blue-600"
          >
            Get Started
          </button>
        </div>
        <div className="w-full md:w-1/2">
          <img
            // src="https://via.placeholder.com/500"
            src="/images/eventify-logo-black.png"
            alt="Eventify Landing"
            className="rounded shadow-lg"
          />
        </div>
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

export default Home;
