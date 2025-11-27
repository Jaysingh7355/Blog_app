import axios from "axios";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import type { Blog } from "../type/Blog";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filter, setFilter] = useState<string>("");

  const loadBlogs = async () => {
    const res = await axios.get<Blog[]>("http://localhost:8000/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredBlogs =
    filter === "" ? blogs : blogs.filter((b) => b.category === filter);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-5">All Blogs</h2>

      <select
        onChange={handleFilter}
        className="p-3 border mb-6 rounded-lg focus:ring focus:ring-blue-300"
      >
        <option value="">Filter by Category</option>
        <option>Entertainment</option>
        <option>Technology</option>
        <option>Sports</option>
        <option>Business</option>
        <option>Health</option>
        <option>Science</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((b) => (
          <div
            key={b.id}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition"
          >
            <img
              src={b.image}
              alt={b.title}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />

            <h3 className="text-xl font-bold">{b.title}</h3>
            <p className="text-gray-600 text-sm">
              <b>Blogger:</b> {b.blogger_name}
            </p>

            <p className="mt-2 text-gray-700">
              {b.description.substring(0, 60)}...
            </p>

            <Link
              to={`/blog/${b.id}`}
              className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
