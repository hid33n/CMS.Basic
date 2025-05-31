import { useState, useEffect } from "react";
import { db, storage } from "../../../firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  getDocs
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PostEditor from "./PostEditor";
import PostList from "./PostList";
import UserList from "./UserList";

function DashboardContent({ view }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState(null);
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

  const handleSubmit = async (postData) => {
    console.log("Enviando post:", postData);
    try {
      let coverImageUrl = postData.coverImageUrl;

      if (postData.coverImageFile) {
        const imageRef = ref(storage, `coverImages/${Date.now()}_${postData.coverImageFile.name}`);
        await uploadBytes(imageRef, postData.coverImageFile);
        coverImageUrl = await getDownloadURL(imageRef);
      }

      const id = editingId || Date.now().toString();
      await setDoc(doc(db, "posts", id), {
        title: postData.title,
        content: postData.content,
        summary: postData.summary,
        coverImageUrl,
        timestamp: serverTimestamp(),
      });

      setTitle("");
      setContent("");
      setSummary("");
      setCoverImage(null);
      setEditingId(null);
      loadPosts();
    } catch (error) {
      console.error("Error al guardar el post:", error);
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setSummary(post.summary);
    setContent(post.content);
    setCoverImage(post.coverImageUrl);
    setEditingId(post.id);
  };

  const handleCancelEdit = () => {
    setTitle("");
    setSummary("");
    setContent("");
    setCoverImage(null);
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
        coverImage={coverImage}
        setCoverImage={setCoverImage}
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
