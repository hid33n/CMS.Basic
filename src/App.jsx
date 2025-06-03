import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { ContactForm } from './components/ui/ContactForm';
import { AboutSection } from './components/ui/AboutSection';
import { Home } from './components/ui/Home';
import { Projects } from './components/ui/Projects';
import { Servers } from './components/ui/Servers';
import { GithubRepos } from './components/ui/GithubRepos';
import { Blog } from './components/ui/Blog';
import { Header } from './components/Header/Header';

function App() {
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const serversRef = useRef(null);
  const reposRef = useRef(null);
  const blogRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Scroll automático según el hash en la URL
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    const refsMap = {
      home: homeRef,
      projects: projectsRef,
      servers: serversRef,
      repos: reposRef,
      blog: blogRef,
      about: aboutRef,
      contact: contactRef,
    };
    if (refsMap[hash]) {
      setTimeout(() => scrollTo(refsMap[hash]), 100); // delay para asegurar que esté montado
    }
  }, [location]);

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
        <section ref={homeRef} id="home"><Home /></section>
        <section ref={projectsRef} id="projects"><Projects /></section>
        <section ref={serversRef} id="servers"><Servers /></section>
        <section ref={reposRef} id="repos"><GithubRepos /></section>
        <section ref={blogRef} id="blog"><Blog /></section>
        <section ref={aboutRef} id="about"><AboutSection /></section>
        <section ref={contactRef} id="contact"><ContactForm /></section>
      </main>

      <footer className="mt-32 text-center py-10 text-gray-500 dark:text-gray-400 text-sm border-t border-gray-200 dark:border-gray-700">
        &copy; {new Date().getFullYear()} Hid33n Studiosssss — Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;
