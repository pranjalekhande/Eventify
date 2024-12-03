import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [editingUserId, setEditingUserId] = useState(null); // Track the user being edited
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
  });  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    console.log(user)
    setEditingUserId(user._id);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone, 
    });
  };

  const handleSave = async (id) => {
    try {
      const response = await axiosInstance.put(`/adminControl/users/${id}`, editFormData);
      setMessage(response.data.msg);
      const updatedUsers = users.map((user) =>
        user._id === id ? { ...user, ...editFormData } : user
      );
      setUsers(updatedUsers);
      setEditingUserId(null); // Close the edit form
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Failed to update user");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = () => {
    setEditingUserId(null); // Close the edit form without saving
  };

  const handleDelete = async (id) => {


    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axiosInstance.delete(`/adminControl/users/${id}`);
      setMessage("User deleted successfully");
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Failed to delete user");
    }
  };

  // const handleUpdate = async (id, updatedData) => {
  //   try {
  //     const response = await axiosInstance.put(`/adminControl/users/${id}`, updatedData);
  //     setMessage(response.data.msg);
  //     const updatedUsers = users.map((user) =>
  //       user._id === id ? { ...user, ...updatedData } : user
  //     );
  //     setUsers(updatedUsers);
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //     setMessage("Failed to update user");
  //   }
  // };
  const handleLogout = (navigate) => {
    localStorage.removeItem("token");
    window.location.href = "/"
  }; 

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1
          onClick={() => (window.location.href = "/dashboard")}
          className="text-2xl font-bold cursor-pointer"
        >
          Eventify
        </h1>
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-1 px-4 rounded"
          >
            Logout
        </button>
      </header>
      {/* Navbar */}
      <nav className="bg-gray-100 p-4 shadow flex justify-around">
        
        <Link to="/dashboard" className="text-blue-500 hover:underline">
          Dashboard
        </Link>
        <Link to="/create-event" className="text-blue-500 hover:underline">
          + Create New Event
        </Link>
        <Link to="/send-invitation" className="text-blue-500 hover:underline">
          Send Event Invitation
        </Link>
        <Link to="/admin/users" className="text-blue-500 hover:underline">
          User Management
        </Link>
      </nav>
      <main className="flex-1 flex flex-col items-center gap-3 p-3">
      <section className="w-full max-w-md"> 
      {/* <div className="p-4"> */}
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        {message && <p className="text-green-500">{message}</p>}
        <table className="table-auto w-full border">
          <thead className="bg-gray-200">
            
              <tr>
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">Email</th>
                <th className="px-4 py-2 border border-gray-300">Role</th>
                <th className="px-4 py-2 border border-gray-300">Phone</th>
                <th className="px-4 py-2 border border-gray-300">Actions</th>
               </tr>
            
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                {editingUserId === user._id ? (
                  <>
                    {/* Edit Form */}
                    <td className="px-4 py-2 border border-gray-300">
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleInputChange}
                        className="border p-1"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleInputChange}
                        className="border p-1"
                      />
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <select
                        name="role"
                        value={editFormData.role}
                        onChange={handleInputChange}
                        className="border p-1"
                      >
                        <option value="admin">Admin</option>
                        <option value="organizer">Organizer</option>
                        <option value="invitee">Invitee</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                        <input
                            type="tel"
                            name="phone"
                            value={editFormData.phone}
                            onChange={handleInputChange}
                            className="border p-1"
                        />
                    </td>

                    <td className="px-4 py-2 border border-gray-300">
                      <button
                        onClick={() => handleSave(user._id)}
                        className="bg-green-500 text-white px-2 py-1 mx-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-2 py-1 mx-1"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    {/* Display User Details */}
                    <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.role}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.phone}</td>
                    
                    <td>
                      {/* <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white px-2 py-1 mx-1"
                      >
                        Edit
                      </button> */}
                      {/* <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 text-white px-2 py-1 mx-1"
                      >
                        Delete
                      </button> */}
                      
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleEdit(user)}                   
                        
                      
                      />

                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(user._id)}
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        </section>
      </main>


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

export default UserManagement;
