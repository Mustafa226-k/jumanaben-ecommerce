import { useEffect,useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/authentication";
import { Navigate } from "react-router-dom";
import { Children } from "react";

function AdminCheck({children}) {

  const [alloed,setAllowed]=useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAllowed(false);
        return;
      }

      try{
        const token = await user.getIdTokenResult();

        const res = await fetch("http://localhost:5000/api/admin-check", {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });

        if(!res.ok) throw new Error("Not Admin");
        setAllowed(true); 
      }catch(err){
        setAllowed(false);
      }
    });

    return () => unsub();

  }, []);
  if(alloed===null) return null;
  if(!alloed) return <Navigate to="/"/>;
  return children;
}

export default AdminCheck;
