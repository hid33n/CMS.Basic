import { useEffect, useState } from 'react';

export function AboutSection() {
  return (
    <div className="text-center max-w-2xl mx-auto space-y-6">
      <h2 className="text-4xl font-bold">Sobre <span className="text-black dark:text-white">Nosotros</span></h2>
      <p className="text-gray-700 dark:text-gray-300">Somos un equipo apasionado por la tecnología, creando soluciones digitales que impactan. Desde juegos hasta aplicaciones móviles y web, construimos experiencias.</p>
    </div>
  );
}