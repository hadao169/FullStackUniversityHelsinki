import { useState } from "react";

const Blog = ({ blogs, onRemove, onUpdate, user }) => {
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

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return sortedBlogs.map((blog) => {
    const isActive = activeBlogIds.includes(blog.id);
    const isUser = blog.user.username === user.username;
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
            {isActive && isUser ? (
              <button className="btn" onClick={() => onRemove(blog.id)}>
                Remove
              </button>
            ) : null}
          </div>
        </div>
        {isActive && (
          <ul>
            <p>URL: {blog.url}</p>
            <div className="likes">
              <p>Likes: {blog.likes} </p>
              <button
                className="btn like-btn"
                onClick={() =>
                  onUpdate(blog.id, { ...blog, likes: blog.likes + 1 })
                }>
                Like
              </button>
            </div>
          </ul>
        )}
      </div>
    );
  });
};

export default Blog;
