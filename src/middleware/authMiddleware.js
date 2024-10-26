// middleware/authMiddleware.js
import { auth } from "../lib/firebase";

export const protectRoute = async (next) => {
  return auth.currentUser ? next() : { redirect: { destination: "/auth/login" } };
};
