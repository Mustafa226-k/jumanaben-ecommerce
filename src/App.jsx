import { useEffect, useState } from "react";
import "./App.css";
import LoginSignup from "./Pages/LoginSignup";
import Home from "./Pages/Home";
import Loding from "./Components/Loding";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/authentication";

import { Routes, Route, Navigate } from "react-router-dom";
import Wishlist from "./Pages/Wishlist";
import Category from "./Pages/Category";
import AdminPanel from "./Pages/AdminPanel";



function App() {
  // ✅ Hooks must be here (top level)
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // user or null
      setAuthChecked(true); // auth check finished
    });

    return () => unsubscribe();
  }, []);

  // ✅ show loading until Firebase finishes checking
  if (authChecked === false) {
    return <Loding />;
  }

  return (
    <Routes>
      {/* Login page */}
      <Route
        path="/"
        element={user ? <Navigate to="/home" /> : <LoginSignup />}
      />

      {/* Home page (protected) */}
      <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />

      {/* Admin Panel (protected) */}
      <Route path="/admin" element={<AdminPanel />} />

      {/* Temporary Demo Route - Remove after testing */}
      <Route path="/admin-demo" element={<AdminPanel />} />

      <Route path="/wishlist" element={<Wishlist />} />

      <Route path="/categories" element={<Category />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
