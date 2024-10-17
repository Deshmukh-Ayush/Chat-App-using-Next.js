import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "@/app/firebase";

export const signUpWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user
    } catch (error) {
        throw error.message;
    }
}

export const signInWithEmail = async(email, password) => {
   try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential.user;
   } catch (error) {
        throw error.message;
   }
}

export const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;  // User object
    } catch (error) {
      throw error.message;
    }
};

export const logOut = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        throw error.message;
    }
}