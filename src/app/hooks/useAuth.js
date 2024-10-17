import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

export function useAuth(redirectIfUnauthenticated = true) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        if (redirectIfUnauthenticated) {
          router.push("/LogIn");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, redirectIfUnauthenticated]);

  return { user, loading };
}
