import { useEffect, useState } from 'react';

export function ContactForm() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6">Contacto</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Nombre" className="w-full border border-gray-300 p-3 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" required />
        <input type="email" placeholder="Correo" className="w-full border border-gray-300 p-3 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" required />
        <textarea placeholder="Mensaje" className="w-full border border-gray-300 p-3 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white" rows={5} required></textarea>
        <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">Enviar</button>
      </form>
    </div>
  );
}