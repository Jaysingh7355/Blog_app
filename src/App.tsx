import { Routes, Route } from "react-router-dom";
import BlogForm from "./components/BlogFrom.tsx";
import BlogList from "./components/BlogList.tsx";
import SingleBlog from "./components/singleBlog.tsx";

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
