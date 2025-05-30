import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Bienvenido de nuevo");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Credenciales inválidas");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-white dark:bg-black text-black dark:text-white px-4 bg-[url('/background-pattern.svg')] bg-cover bg-center bg-no-repeat">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full p-8 bg-white/80 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl backdrop-blur-md"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <FaReact className="text-black dark:text-white text-3xl animate-spin-slow" />
          <h1 className="text-3xl font-bold">Hid33n Studios</h1>
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Iniciar sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 font-medium py-3 rounded transition"
          >
            Iniciar sesión
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-green-600 dark:text-green-400">{message}</p>}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full text-sm text-black dark:text-white hover:opacity-80 underline"
        >
          ← Volver al inicio
        </button>
      </motion.div>
    </div>
  );
}

export default Login;
