import React from 'react'
import Link from 'next/link'

const signUp = () => {
  return (
    <>
        <div className='w-full h-screen flex items-center justify-center flex-col'>
          <h1>Here Register yourself</h1>
          <h2>Already have an account?</h2>
          <Link className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" href="/LogIn">Login In</Link>
        </div>
    </>
  )
}

export default signUp