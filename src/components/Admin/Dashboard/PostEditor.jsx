import { useRef } from "react";
import JoditEditor from "jodit-react";

function PostEditor({ title, setTitle, summary, setSummary, content, setContent, coverImage, setCoverImage, editingId, handleSubmit, handleCancelEdit }) {
  const editor = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const coverImageFile = e.target.coverImage.files[0];
    handleSubmit({ title, summary, content, coverImageFile, coverImageUrl: coverImage });
  };

  return (
    <main className="flex-1 p-10 space-y-6">
      <h2 className="text-2xl font-bold">{editingId ? "Editar entrada" : "Crear entrada de blog"}</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          required
        />
        <textarea
          placeholder="Resumen"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          rows={2}
          required
        />
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
        />
        {coverImage && (
          <img src={coverImage} alt="Vista previa" className="w-full max-w-sm mx-auto rounded shadow" />
        )}
        <div className="space-y-2">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={setContent}
          />
        </div>
        <div className="flex gap-4">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            {editingId ? "Actualizar" : "Publicar"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </main>
  );
}

export default PostEditor;
