// models/userModel.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";

// Save user details to Firestore
export const saveUserDetails = async (uid, details) => {
  const userRef = doc(firestore, "users", uid);
  await setDoc(userRef, details, { merge: true });
};

// Fetch user details from Firestore
export const getUserDetails = async (uid) => {
  const userRef = doc(firestore, "users", uid);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? docSnap.data() : null;
};
