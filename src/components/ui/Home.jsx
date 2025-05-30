import { motion } from 'framer-motion';

export function Home() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
      <div className="relative w-full text-center py-24 px-4 md:px-8 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black shadow-inner max-w-none mx-auto">
        <h2 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Bienvenido a <span className="text-black dark:text-white">Hid33n Studios</span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Desarrollo de aplicaciones web, móviles, servidores de juegos y más. Transformando ideas en experiencias digitales únicas y funcionales.
        </p>
        <div className="flex justify-center gap-6 mt-10">
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition text-lg">Ver Proyectos</button>
          <button className="border border-black dark:border-white hover:border-gray-800 dark:hover:border-gray-200 px-6 py-3 rounded transition text-lg text-black dark:text-white">Contactar</button>
        </div>
      </div>
    </motion.div>
  );
}
