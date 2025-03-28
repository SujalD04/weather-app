// context/authContext.js

import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase"; // Assuming you have Firebase set up
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set the current user when auth state changes
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}
