import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact } from 'react-icons/fa';

export function Blog() {
  const posts = [
    { title: "Cómo optimizar tu servidor de Minecraft", summary: "Guía paso a paso para mejorar el rendimiento y estabilidad." },
    { title: "Publicar tu app Flutter en la web", summary: "Convertí tu aplicación móvil en una web progresiva fácilmente." },
    { title: "Tailwind + Vite para proyectos rápidos", summary: "Configurá tu stack moderno de frontend en minutos." }
  ];

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-8">Blog de <span className="text-black dark:text-white">Desarrollo</span></h2>
      <div className="grid md:grid-cols-3 gap-10">
        {posts.map(({ title, summary }, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.05, rotate: 1 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="shadow-md hover:shadow-2xl transition duration-300 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center">
              <FaReact className="text-black dark:text-white text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-black dark:text-white text-center">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">{summary}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
