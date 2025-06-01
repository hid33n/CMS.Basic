import { useRef, useState, useEffect } from 'react';
import { FaRocket, FaMoon, FaSun } from "react-icons/fa";
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ContactForm } from './components/ui/ContactForm';
import { AboutSection } from './components/ui/AboutSection';
import { Home } from './components/ui/Home';
import { Projects } from './components/ui/Projects';
import { Servers } from './components/ui/Servers';
import { GithubRepos } from './components/ui/GithubRepos';
import { Blog } from './components/ui/Blog';
import { Header } from './components/Header/Header';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function App() {
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const serversRef = useRef(null);
  const reposRef = useRef(null);
  const blogRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-serif">
      <ScrollProgress />
     <Header
  scrollTo={scrollTo}
  refs={{
    homeRef,
    projectsRef,
    serversRef,
    reposRef,
    blogRef,
    aboutRef,
    contactRef,
  }}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>


      <main className="pt-28 px-4 max-w-6xl mx-auto space-y-32">
        <section ref={homeRef}><Home /></section>
        <section ref={projectsRef}><Projects /></section>
        <section ref={serversRef}><Servers /></section>
        <section ref={reposRef}><GithubRepos /></section>
        <section ref={blogRef}><Blog /></section>
        <section ref={aboutRef}><AboutSection /></section>
        <section ref={contactRef}><ContactForm /></section>
      </main>

      <footer className="mt-32 text-center py-10 text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700">
        &copy; {new Date().getFullYear()} Hid33n Studiosssss — Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;