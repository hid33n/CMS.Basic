import { useEffect, useState, useRef } from "react";
import { FaRocket, FaMoon, FaSun } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export function Header({ scrollTo, refs, darkMode, setDarkMode }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const dropdownRef = useRef();
  const projectsButtonRef = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(docRef);
        setIsAdmin(userDoc.exists() && userDoc.data().isAdmin);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !projectsButtonRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const NavButton = ({ label, refKey }) =>
    scrollTo && refs ? (
      <button onClick={() => scrollTo(refs[refKey])} className="hover:text-indigo-500">
        {label}
      </button>
    ) : (
      <Link to={`/#${refKey}`} className="hover:text-indigo-500">
        {label}
      </Link>
    );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md shadow border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FaRocket className="text-indigo-500 text-xl" />
          <h1 className="text-2xl font-bold tracking-tight">Hid33n Studio</h1>
        </div>
        <nav className="flex items-center space-x-4 relative">
          <NavButton label="Inicio" refKey="homeRef" />

          <div className="relative" ref={dropdownRef}>
            {scrollTo && refs ? (
              <button
                ref={projectsButtonRef}
                onClick={() => {
                  scrollTo(refs.projectsRef);
                  setDropdownOpen((prev) => !prev);
                }}
                onMouseEnter={() => setDropdownOpen(true)}
                className="hover:text-indigo-500"
              >
                Proyectos ▾
              </button>
            ) : (
              <Link
                to="/#projects"
                ref={projectsButtonRef}
                onMouseEnter={() => setDropdownOpen(true)}
                className="hover:text-indigo-500"
              >
                Proyectos ▾
              </Link>
            )}

            <div
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              className={`absolute bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-md mt-2 z-10 min-w-max transition-opacity duration-200 ${
                dropdownOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={() => {
                  scrollTo?.(refs?.serversRef);
                  setDropdownOpen(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left"
              >
                Servidores
              </button>
              <button
                onClick={() => {
                  scrollTo?.(refs?.reposRef);
                  setDropdownOpen(false);
                }}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left"
              >
                GitHub
              </button>
            </div>
          </div>

          <NavButton label="Blog" refKey="blogRef" />
          <NavButton label="Nosotros" refKey="aboutRef" />
          <NavButton label="Contacto" refKey="contactRef" />

          {setDarkMode && (
            <button onClick={() => setDarkMode(!darkMode)} className="ml-4 text-xl">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          )}

          {user ? (
            <>
              <span className="ml-4 text-sm text-black dark:text-white">{user.email}</span>
              {isAdmin && (
                <button
                  onClick={() => navigate("/admin")}
                  className="ml-2 bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700"
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={() => signOut(auth)}
                className="ml-2 border px-3 py-1 rounded text-sm hover:opacity-80"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="ml-4 border px-3 py-1 rounded text-sm hover:opacity-80"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => navigate("/register")}
                className="ml-2 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded text-sm hover:opacity-90"
              >
                Registrarse
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
