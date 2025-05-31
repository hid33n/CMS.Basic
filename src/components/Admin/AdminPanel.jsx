import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardContent from "./Dashboard/DashboardContent";

function AdminPanel() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null); // null = cargando
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
        setIsAdmin(false);
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Verificando acceso...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar setView={setView} />
      <DashboardContent view={view} />
    </div>
  );
}

export default AdminPanel;
