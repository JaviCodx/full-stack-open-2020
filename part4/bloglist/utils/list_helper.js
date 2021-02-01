const dummy = (blogs) => {
  return 1;
};

// aqui viene bien un lodash.add y no lo tendrias ni que declarar, lo pasarias directamente al reduce
const add = (a, b) => a + b;
const totalLikes = (blogs) => blogs.map((blog) => blog.likes).reduce(add, 0);

const keepMaxLikesBlogReducer = (accBlog, currentBlog) =>
  accBlog.likes > currentBlog.likes ? accBlog : currentBlog;

const favoriteBlog = (blogs) => {
  const favourite = blogs.reduce(keepMaxLikesBlogReducer);
  // aqui viene bien un lodash.pick(favourite, 'title','author','likes')
  return {
    title: favourite.title,
    author: favourite.author,
    likes: favourite.likes,
  };
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
