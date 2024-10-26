"use client"


import { useState } from "react";
import { useRouter } from "next/navigation"
import { signUpWithEmail, signUpWithGoogle } from "@/controllers/authController";

const SignUpForm = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(null); 
  const router = useRouter(); 

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signUpWithEmail(email, password);
      router.push("/details"); 
    } catch (error) {
      setError(error.message || "An error occurred during signup.");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signUpWithGoogle();
      router.push("/details"); 
    } catch (error) {
      setError(error.message || "An error occurred during Google signup."); 
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h2 className="text-5xl mb-5">Sign Up Page</h2>
      {error && <p className="text-red-500">{error}</p>} 

      <form onSubmit={handleEmailSignUp} className="flex items-center justify-center flex-col gap-2">
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2"
        />
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2"
        />

        <button type="submit" className="w-60 py-3 bg-white text-black rounded-3xl">
          Sign Up
        </button>

        <button
          onClick={handleGoogleSignUp}
          className="mt-2 w-60 py-3 bg-white text-black rounded"
        >
          Sign Up with Google
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;