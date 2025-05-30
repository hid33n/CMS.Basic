import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScroll((scrolled / height) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

 return <div className="fixed top-0 left-0 h-1 bg-black dark:bg-white z-50" style={{ width: `${scroll}%` }} />;

}
