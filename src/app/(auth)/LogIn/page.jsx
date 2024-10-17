"use client"

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmail, signInWithGoogle } from '../lib/authHelpers';
import Link from 'next/link';


const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    try {
      await signInWithEmail(email, password)
      router.push("/details")
    } catch (error) {
      setError(error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push("/");  // Redirect to homepage
    } catch (error) {
      setError(error);
    }
  };
  return (


  <div className='w-full h-screen flex justify-center items-center flex-col'>
      <h2 className='text-5xl mb-5'>Sign In page</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit} className='flex items-center justify-center flex-col gap-2'>
        <input 
          type="text"
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2'
        />
        <input 
          type="password"
          placeholder='Enter your Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2'
        />

        <button type='submit' className='w-60 py-3 bg-white text-black rounded-3xl'>Sign In</button>
        <button onClick={handleGoogleSignIn} className='w-60 py-3 bg-white text-black rounded-3xl'>Sign In with Google</button>
        
        <Link href="/LogIn">Dont have an Account? Sign In</Link>
      </form>
  
  </div>
  )
}



export default login