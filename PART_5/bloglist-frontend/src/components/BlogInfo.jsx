const BlogInfo = ({ blog }) => {
  return (
    <ul>
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
    </ul>
  );
};

export default BlogInfo;
