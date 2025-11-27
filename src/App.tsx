import { Routes, Route } from "react-router-dom";
import BlogForm from "./components/BlogFrom";
import BlogList from "./components/BlogList";
import SingleBlog from "./components/SingleBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BlogForm />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/blog/:id" element={<SingleBlog />} />
    </Routes>
  );
}

export default App;
