import { useState } from "react";
import { FaLink, FaVideo, FaSmile, FaBold, FaItalic, FaListUl, FaHeading } from "react-icons/fa";

function PostEditor({ title, setTitle, summary, setSummary, content, setContent, editingId, handleSubmit, handleCancelEdit }) {
  const insertAtCursor = (tagOpen, tagClose = '') => {
    const textarea = document.getElementById("content-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = content.substring(0, start);
    const selected = content.substring(start, end);
    const after = content.substring(end);
    setContent(before + tagOpen + selected + tagClose + after);
  };

  return (
    <main className="flex-1 p-10 space-y-6">
      <h2 className="text-2xl font-bold">{editingId ? "Editar entrada" : "Crear entrada de blog"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="space-y-2">
          <div className="flex gap-2 flex-wrap">
            <button type="button" onClick={() => insertAtCursor('<strong>', '</strong>')} className="text-sm bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700" title="Negrita">
              <FaBold />
            </button>
            <button type="button" onClick={() => insertAtCursor('<em>', '</em>')} className="text-sm bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700" title="Cursiva">
              <FaItalic />
            </button>
            <button type="button" onClick={() => insertAtCursor('<h2>', '</h2>')} className="text-sm bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700" title="Encabezado">
              <FaHeading />
            </button>
            <button type="button" onClick={() => insertAtCursor('<ul><li>', '</li></ul>')} className="text-sm bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700" title="Lista">
              <FaListUl />
            </button>
            <button type="button" onClick={() => insertAtCursor('<a href=\"\">enlace</a>')} className="text-sm bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700" title="Enlace">
              <FaLink />
            </button>
            <button type="button" onClick={() => insertAtCursor('<iframe src=\"\" width=\"100%\" height=\"315\"></iframe>')} className="text-sm bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700" title="Video">
              <FaVideo />
            </button>
            <button type="button" onClick={() => insertAtCursor('😊')} className="text-sm bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700" title="Emoji">
              <FaSmile />
            </button>
          </div>
          <textarea
            id="content-editor"
            placeholder="Contenido (HTML permitido)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            rows={10}
            required
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

      <div>
        <h3 className="text-xl font-semibold">Vista previa</h3>
        <div className="border p-4 rounded dark:bg-gray-800 dark:text-white" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </main>
  );
}

export default PostEditor;
