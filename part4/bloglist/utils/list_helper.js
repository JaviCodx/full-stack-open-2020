const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item;
  };
  return blogs.map((blog) => blog.likes).reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));

  const favourite = blogs.filter((blog) => blog.likes === maxLikes);

  const returned = favourite.map((f) => {
    return { title: f.title, author: f.author, likes: f.likes };
  });

  return returned;
};

const mostBlogs = (blogs) => {
  blogs = blogs.map((blog) => {
    return { author: blog.author, blogs: 0 };
  });

  const authors = blogs.map(blog);

  console.log(blogs);
};

module.exports = {
  totalLikes,
  dummy,
  favoriteBlog,
  mostBlogs,
};
