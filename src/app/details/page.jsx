"use client";

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase";
import { useRouter } from "next/navigation";
import LogoutButton from "../components/LogoutButton";

const details = () => {
  // const { user, loading } = useAuth(true); // true ensures the redirect

  // if (loading) return <p>Loading...</p>; // Display a loading state while checking authentication

  // if (!user) return null;

  const {user} = useAuth(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("")
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Ensure required fields are filled
    if (!name || !username || !age || !phoneNumber) {
      setError("All fields are required.");
      return;
    }

    try {
      // Store data in Firestore
      await setDoc(doc(db, "basic-details", user.uid), {
        name,
        username,
        age,
        phoneNumber,
      });

      // Display success message and redirect
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);  // Redirect after 2 seconds
    } catch (err) {
      setError("Failed to submit details: " + err.message);
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <h2 className="text-5xl mb-5">Enter your Details</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>Details submitted successfully!</p>}

        <form
          className="flex items-center justify-center flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Enter your Username"
            className="text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Enter your Age"
            className="text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Enter your Phone Number"
            className="text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-60 py-3 bg-white text-black rounded-3xl"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default details;
