// dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { getUserDetails } from "@/models/userModel";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [details, setDetails] = useState(null);
  const router = useRouter();

  // Fetch the authenticated user's details
  useEffect(() => {
    const fetchUserDetails = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        const userDetails = await getUserDetails(currentUser.uid);
        setDetails(userDetails);
      } else {
        router.push("/login"); // Redirect to login if not authenticated
      }
    };

    fetchUserDetails();
  }, [router]);

  // Handle user logout
  const handleLogout = async () => {
    await auth.signOut();
    router.push("/auth/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <p><strong>UID:</strong> {user.uid}</p>
          {details ? (
            <>
              <p><strong>Name:</strong> {details.name}</p>
              <p><strong>Username:</strong> {details.username}</p>
              <p><strong>Age:</strong> {details.age}</p>
              <p><strong>Contact:</strong> {details.contact}</p>
            </>
          ) : (
            <p>Loading details...</p>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
