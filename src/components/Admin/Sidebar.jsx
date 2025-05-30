import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function Sidebar({ setView }) {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6 space-y-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">Panel de Admin</h2>
        <nav className="flex flex-col space-y-2">
          <button onClick={() => setView("create")} className="text-left text-sm hover:text-indigo-500">Crear entrada</button>
          <button onClick={() => setView("posts")} className="text-left text-sm hover:text-indigo-500">Ver entradas</button>
          <button onClick={() => setView("users")} className="text-left text-sm hover:text-indigo-500">Usuarios</button>
        </nav>
      </div>
      <div className="space-y-2">
        <button
          onClick={() => navigate("/")}
          className="w-full text-left text-sm text-indigo-600 hover:underline"
        >
          Volver al inicio
        </button>
        <button
          onClick={() => {
            signOut(auth);
            navigate("/");
          }}
          className="w-full text-left text-sm text-red-600 hover:underline"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
