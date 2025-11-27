import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import type { Blog } from "../type/Blog";

const BlogForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<Blog>({
    category: "",
    title: "",
    blogger_name: "",
    image: "",
    description: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = (): string => {
    if (!form.category) return "Select category";
    if (form.title.length < 3) return "Title must be 3+ characters";
    if (form.blogger_name.length < 3)
      return "Blogger name must be 3+ characters";
    if (form.image.length < 3) return "Image URL is required";
    if (form.description.length < 3) return "Description must be 3+ characters";
    return "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const msg = validate();
    if (msg) return setError(msg);

    await axios.post("http://localhost:8000/blogs", form);
    alert("Blog Added Successfully!");
    navigate("/blogs");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Blog</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <select
          name="category"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="">Select Category</option>
          <option>Entertainment</option>
          <option>Technology</option>
          <option>Sports</option>
          <option>Business</option>
          <option>Health</option>
          <option>Science</option>
        </select>

        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
        />

        <input
          type="text"
          name="blogger_name"
          placeholder="Blogger Name"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
        />

        <textarea
          name="description"
          placeholder="Blog Description"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg h-32 focus:ring focus:ring-blue-300"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
