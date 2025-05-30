import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaNetworkWired } from 'react-icons/fa';
export function Servers() {
  const servers = [
    { name: "Minecraft Java", ip: "play.hid33nmc.net", status: "Online", icon: <FaGamepad /> },
    { name: "Mu Online Season 16", ip: "mu.hid33n.net", status: "Offline", icon: <FaGamepad /> },
    { name: "Servidor VPS #1", ip: "vps1.hid33n.net", status: "Online", icon: <FaNetworkWired /> }
  ];

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-8">Servidores <span className="text-black dark:text-white">de Juegos</span></h2>
      <p className="text-gray-600 dark:text-gray-300 mb-10">Infraestructura dedicada para experiencias multijugador optimizadas.</p>
      <div className="grid md:grid-cols-3 gap-10">
        {servers.map(({ name, ip, status, icon }, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.05, rotate: 1 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="shadow-md hover:shadow-2xl transition duration-300 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {icon}
                  <h3 className="text-xl font-semibold text-black dark:text-white">{name}</h3>
                </div>
                <span className={status === "Online" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>{status}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">IP: {ip}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}