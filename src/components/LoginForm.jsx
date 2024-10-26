// components/LoginForm.js
import { useState } from "react";
import { logInWithEmail, signInWithGoogle } from "@/controllers/authController";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await logInWithEmail(email, password);
      if (user) router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className='text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2' />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className='text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2'/>
            <button type="submit" className='w-60 py-3 bg-white text-black rounded-3xl'>Log In</button>
            <button onClick={signInWithGoogle} className='mt-2 w-60 py-3 bg-white text-black rounded-3xl'>Log In with Google</button>
        </form>
    </div>
  );
};

export default LoginForm;
