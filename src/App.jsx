import { useEffect } from "react";
import "./App.css";
import LoginSignup from "./Pages/LoginSignup";

import {
  onAuthStateChanged,
  // getRedirectResult
} from "firebase/auth";
import { auth } from "./firebase/authentication";

function App() {

  useEffect(() => {
  
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user.email);
      } else {
        console.log("No user");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <LoginSignup />
    </>
  );
}

export default App;
