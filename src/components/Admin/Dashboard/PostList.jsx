// App/PostList.jsx
import { FaTrash, FaEdit } from "react-icons/fa";

function PostList({ posts, handleEdit, handleDelete }) {
  return (
    <main className="flex-1 p-10 space-y-4">
      <h2 className="text-2xl font-bold">Entradas publicadas</h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="p-4 bg-white dark:bg-gray-900 rounded shadow space-y-2">
            <div>
              <h3 className="text-lg font-semibold flex justify-between items-center">
                {post.title}
                <span className="text-xs text-gray-500">{post.timestamp?.toDate().toLocaleString()}</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{post.summary}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(post)}
                className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 flex items-center gap-1"
              >
                <FaEdit /> Editar
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default PostList;
