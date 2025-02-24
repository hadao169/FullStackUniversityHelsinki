import BlogInfo from "./BlogInfo";
import { useState } from "react";

const Blog = ({ blogs, user, onRemove, onUpdate }) => {
  const [activeBlogIds, setActiveBlogIds] = useState([]);

  const handleShowInfo = (id) => {
    setActiveBlogIds((prevIds) => {
      // Nếu id đã có trong mảng, loại bỏ nó (ẩn blog đó)
      if (prevIds.includes(id)) {
        return prevIds.filter((blogId) => blogId !== id);
      }
      // Nếu id chưa có, thêm vào mảng (hiển thị blog đó)
      else {
        return [...prevIds, id];
      }
    });
  };

  const filteredBlogs = blogs.filter(
    (blog) => blog.user.username === user.username
  );

  const sortedBlogs = filteredBlogs.sort((a, b) => b.likes - a.likes);

  return sortedBlogs.map((blog) => {
    const isActive = activeBlogIds.includes(blog.id);
    return (
      <div key={blog.id} className="blog">
        <div>
          <ul>
            <li className="title">Title: {blog.title}</li>
            <p>Author: {blog.author}</p>
          </ul>
          <div>
            <button
              className="view-button"
              onClick={() => handleShowInfo(blog.id)}>
              {isActive ? "Hide" : "View"}
            </button>
            <button className="view-button" onClick={() => onRemove(blog.id)}>
              Remove
            </button>
          </div>
        </div>
        {isActive && <BlogInfo blog={blog} onUpdate={onUpdate} />}
      </div>
    );
  });
};

export default Blog;
