// models/userModel.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Save user details to Firestore
export const saveUserDetails = async (uid, details) => {
  const userRef = doc(firestore, "users", uid);
  await setDoc(userRef, details, { merge: true });
};

// Fetch user details from Firestore
export const getUserDetails = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data(); // Return the user data
  } else {
    console.log("No such document!");
    return null; // Handle the case where the document does not exist
  }
};
