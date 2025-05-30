function UserList({ users }) {
  return (
    <main className="flex-1 p-10 space-y-4">
      <h2 className="text-2xl font-bold">Usuarios registrados</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-4 bg-white dark:bg-gray-900 rounded shadow space-y-1">
            <p className="text-sm font-semibold text-black dark:text-white">{user.email}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{user.isAdmin ? "Administrador" : "Usuario estándar"}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default UserList;
