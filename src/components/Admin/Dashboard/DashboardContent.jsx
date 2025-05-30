import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  getDocs
} from "firebase/firestore";
import { FaTrash, FaEdit } from "react-icons/fa";
import PostEditor from "./PostEditor";
import PostList from "./PostList";
import UserList from "./UserList";

function DashboardContent({ view }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (view === "posts") loadPosts();
    if (view === "users") loadUsers();
  }, [view]);

  const loadPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(data);
  };

  const loadUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      summary,
      timestamp: serverTimestamp(),
      likes: 0,
    };
    const id = editingId || Date.now().toString();
    await setDoc(doc(db, "posts", id), newPost);
    setTitle("");
    setContent("");
    setSummary("");
    setEditingId(null);
    loadPosts();
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setSummary(post.summary);
    setContent(post.content);
    setEditingId(post.id);
  };

  const handleCancelEdit = () => {
    setTitle("");
    setSummary("");
    setContent("");
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que querés eliminar esta entrada?")) {
      await deleteDoc(doc(db, "posts", id));
      loadPosts();
    }
  };

  if (view === "create" || editingId) {
    return (
      <PostEditor
        title={title}
        setTitle={setTitle}
        summary={summary}
        setSummary={setSummary}
        content={content}
        setContent={setContent}
        editingId={editingId}
        handleSubmit={handleSubmit}
        handleCancelEdit={handleCancelEdit}
      />
    );
  }

  if (view === "posts") {
    return <PostList posts={posts} handleEdit={handleEdit} handleDelete={handleDelete} />;
  }

  if (view === "users") {
    return <UserList users={users} />;
  }

  return null;
}

export default DashboardContent;
