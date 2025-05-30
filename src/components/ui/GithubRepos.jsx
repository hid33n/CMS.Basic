import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact } from 'react-icons/fa';

export function GithubRepos() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-8">Repositorios en <span className="text-black dark:text-white">GitHub</span></h2>
      <div className="grid md:grid-cols-3 gap-10">
        {["hid33n-launcher", "hid33n-web-template", "hid33n-flutter-app"].map((repo, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.05, rotate: 1 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="shadow-md hover:shadow-2xl transition duration-300 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center">
              <FaReact className="text-black dark:text-white text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-black dark:text-white">{repo}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Descripción de {repo}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
