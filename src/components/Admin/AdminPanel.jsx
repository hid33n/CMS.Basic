import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardContent from "./Dashboard/DashboardContent";

function AdminPanel() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [view, setView] = useState("create");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/");
        return;
      }
      setUser(currentUser);
      const docRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(docRef);
      if (userDoc.exists() && userDoc.data().isAdmin) {
        setIsAdmin(true);
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  if (!user || !isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar setView={setView} />
      <DashboardContent view={view} />
    </div>
  );
}

export default AdminPanel;
