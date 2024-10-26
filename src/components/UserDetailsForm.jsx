import { useState } from 'react';
import { saveUserDetails } from '@/controllers/authController';
import { auth } from '@/lib/firebase';
import { useRouter } from "next/navigation"; // Use useNavigate for cleaner navigation within Next.js


const UserDetailsForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const router = useRouter();

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const userDetails = { name, username, age, contactNumber };

    try {
      await saveUserDetails(uid, userDetails);
      router.push('/dashboard');
    } catch (error) {
      console.error("Error saving details:", error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
        <h2 className="text-5xl mb-5">Enter your Details</h2>
        <form
            className="flex items-center justify-center flex-col gap-2"
            onSubmit={handleSaveDetails}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required className="text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2"/>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className="text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2"/>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required className="text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2"/>
                <input type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} placeholder="Contact Number" required className="text-white bg-transparent w-80 px-2 py-3 rounded-3xl border-white border-2"/>
                <button type="submit" className="w-60 py-3 bg-white text-black rounded-3xl">Save Details</button>
        </form>
    </div>
  );
};

export default UserDetailsForm;
