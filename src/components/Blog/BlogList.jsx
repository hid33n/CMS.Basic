import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function BlogList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const postList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    };

    fetchPosts();
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-8">Blog de <span className="text-black dark:text-white">Desarrollo</span></h2>
      <div className="grid md:grid-cols-3 gap-10">
        {posts.map(({ id, title, summary }) => (
          <motion.div key={id} whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div onClick={() => navigate(`/blog/${id}`)} className="cursor-pointer shadow-md hover:shadow-2xl transition duration-300 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-black dark:text-white text-center">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">{summary}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
