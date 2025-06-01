# 🧩 Hid33n Studios Blog Admin

Este es un panel de administración para gestionar entradas de blog en tiempo real usando React, Firebase y Tailwind CSS. Permite a administradores autenticados crear, editar y eliminar publicaciones, incluyendo imágenes destacadas y contenido enriquecido.

---

## 🚀 Tecnologías Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase (Auth, Firestore, Storage)](https://firebase.google.com/)
- [Jodit Editor](https://xdsoft.net/jodit/)
- [React Router](https://reactrouter.com/)
- [shadcn/ui](https://ui.shadcn.com/) (para componentes UI)
- [Heroicons / Lucide](https://lucide.dev/)

---

## ⚙️ Instalación

Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/hid33n-studios-admin.git
cd hid33n-studios-admin
Instala las dependencias:

bash
Copiar
Editar
npm install
Crea un archivo .env.local en la raíz con tus credenciales de Firebase:

env
Copiar
Editar
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
🧪 Modo Desarrollo
Para iniciar el proyecto en desarrollo:

bash
Copiar
Editar
npm run dev
Visita http://localhost:5173 en tu navegador.

##🌐 Despliegue
Este proyecto está optimizado para ser desplegado en cualquier entorno estático moderno como Vercel, Netlify o Firebase Hosting. Asegúrate de configurar variables de entorno correctamente en tu entorno de producción.

##📁 Estructura del Proyecto
css
Copiar
Editar
src/
├── components/
│   └── Admin/
│       ├── Dashboard/
│       │   ├── DashboardContent.jsx
│       │   ├── PostEditor.jsx
│       │   └── ...
│       └── Sidebar.jsx
├── pages/
│   ├── Blog.jsx
│   └── PostDetail.jsx
├── firebase.js
├── App.jsx
└── main.jsx
##🛡️ Autenticación
Solo los usuarios marcados como isAdmin: true en la colección users de Firestore pueden acceder al panel de administración.

##📸 Soporte para Imágenes
Las imágenes destacadas se almacenan en Firebase Storage o pueden configurarse para guardarse en un servidor propio (CyberPanel).

##📬 Contribuciones
¡Contribuciones son bienvenidas! Abre un issue o un pull request.

##📝 Licencia
MIT © 2025 — Hid33n Studios



---
