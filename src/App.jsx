import { useEffect, useState } from "react";
import "./App.css";
import LoginSignup from "./Pages/LoginSignup";
import Home from "./Pages/Home";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/authentication";

import { Routes, Route, Navigate } from "react-router-dom";

const Loading = () => (
  <div style={{ textAlign: "center", marginTop: "50px" }}>
    Loading...
  </div>
);

function App() {
  // ✅ Hooks must be here (top level)
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);          // user or null
      setAuthChecked(true);          // auth check finished
    });

    return () => unsubscribe();
  }, []);

  // ✅ show loading until Firebase finishes checking
  if (authChecked === false) {
    return <Loading />;
  }

  return (
    <Routes>
      {/* Login page */}
      <Route
        path="/"
        element={user ? <Navigate to="/home" /> : <LoginSignup />}
      />

      {/* Home page (protected) */}
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/" />}
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
