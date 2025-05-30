import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, collection, addDoc, getDocs, increment, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() });
      }
    };

    const fetchComments = async () => {
      const q = collection(db, "posts", id, "comments");
      const snap = await getDocs(q);
      setComments(snap.docs.map(doc => doc.data()));
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const submitComment = async (e) => {
    e.preventDefault();
    if (commentText.trim() === "") return;
    const newComment = {
      text: commentText,
      timestamp: new Date().toISOString(),
      author: "Anónimo"
    };
    await addDoc(collection(db, "posts", id, "comments"), newComment);
    setComments(prev => [...prev, newComment]);
    setCommentText("");
  };

  const addLike = async () => {
    const ref = doc(db, "posts", id);
    await updateDoc(ref, { likes: increment(1) });
    setPost(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
  };

  if (!post) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-4xl font-bold text-center">{post.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center">{new Date(post.timestamp).toLocaleString()}</p>
        <div className="mt-6 text-lg text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="flex items-center justify-center gap-4 mt-4">
          <button onClick={addLike} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">👍 {post.likes || 0}</button>
          {navigator.share && (
            <button
              onClick={() =>
                navigator.share({
                  title: post.title,
                  url: window.location.href
                })
              }
              className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Compartir
            </button>
          )}
        </div>
      </motion.div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Comentarios</h2>
        <form onSubmit={submitComment} className="space-y-3 mb-6">
          <textarea
            className="w-full border border-gray-300 p-3 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            rows={3}
            placeholder="Escribe un comentario..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Enviar</button>
        </form>
        <ul className="space-y-3">
          {comments.map((c, i) => (
            <li key={i} className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
              <p className="text-sm text-gray-700 dark:text-gray-300">{c.text}</p>
              <p className="text-xs text-gray-400">{new Date(c.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
<button
  onClick={() => window.history.back()}
  className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
>
  ← Volver al blog
</button>


export default BlogPost;
