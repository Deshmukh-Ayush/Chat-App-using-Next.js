import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center flex-col'>
        <h1>Welcome to the chat app</h1>
        <div className='flex'>
          <Link className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" href="/signup">Sign Up</Link>
          <Link className="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" href="/login">Login In</Link>
        </div>
      </div>
    </>
  )
}

export default page