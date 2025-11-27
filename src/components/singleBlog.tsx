import axios from "axios";
import { useParams } from "react-router-dom";
import type { Blog } from "../type/Blog";
import { useEffect, useState } from "react";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  const loadBlog = async () => {
    const res = await axios.get<Blog>(`http://localhost:8000/blogs/${id}`);
    setBlog(res.data);
  };

  useEffect(() => {
    loadBlog();
  }, []);

  if (!blog) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-8">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-72 object-cover rounded-lg"
      />

      <h2 className="text-4xl font-bold mt-5">{blog.title}</h2>

      <p className="text-gray-600 mt-1">
        <b>Category:</b> {blog.category}
      </p>
      <p className="text-gray-600">
        <b>Blogger:</b> {blog.blogger_name}
      </p>

      <p className="text-lg mt-5 leading-relaxed">{blog.description}</p>
    </div>
  );
};

export default SingleBlog;
