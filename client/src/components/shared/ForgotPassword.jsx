// ForgotPassword.js

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSecret } from "@/contexts/secretsContext";

const ForgotPassword = () => {
  const { EMAIL, setEMAIL } = useSecret();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post("/api/forgot-password", { email });
      setMessage(response.data.message);

      if (response.data.message === "OTP sent successfully") {
        setEmail("");
        setEMAIL(email);
        toast.success("OTP sent successfully", {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true
        });
        return navigate("/auth/reset-password");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true
        });

        setMessage(
          "Error sending reset email. Please check your email address."
        );
      } else if (error.request) {
        // The request was made, but no response was received
        toast.error(error.request, {
          position: "top-center",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true
        });

        console.error("No response received:", error.request);
        setMessage("Error sending reset email. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error in request setup:", error.message);
        setMessage("Error sending reset email. Please try again later.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-100 max-w-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleForgotPassword}
      >
        Send Reset Email
      </button>
    </div>
  );
};

export default ForgotPassword;
