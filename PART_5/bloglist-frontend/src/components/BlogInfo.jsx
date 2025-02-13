const BlogInfo = ({ blog, onUpdate }) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
  };
  return (
    <ul>
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <div className="likes">
        <p>Likes: {blog.likes} </p>
        <button
          className="btn"
          onClick={() => onUpdate(blog.id, updatedBlog)}>
          Like
        </button>
      </div>
    </ul>
  );
};

export default BlogInfo;
