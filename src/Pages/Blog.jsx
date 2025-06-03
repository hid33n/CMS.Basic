import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { Header } from '../components/Header/Header';

const fallbackEmojis = ["📘", "📝", "📷", "🎨", "🧠", "🌟", "🚀", "💡", "🎯", "📚"];

function Blog() {
  const [posts, setPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const getRandomEmoji = () => {
    const index = Math.floor(Math.random() * fallbackEmojis.length);
    return fallbackEmojis[index];
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-serif">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-10 dark:text-white">Blog</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className="group block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {post.coverImageUrl ? (
                <img
                  src={post.coverImageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-6xl">
                  <span>{getRandomEmoji()}</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-indigo-600">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{post.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Blog;
