import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/authentication";

function AdminCheck() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("❌ Not logged in");
        return;
      }

      console.log("✅ Logged in as:", user.email);

      const token = await user.getIdToken();

      const res = await fetch("http://localhost:5000/api/admin-check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("🔐 Admin check response:", data);
    });

    return () => unsub();
  }, []);
}

export default AdminCheck;
