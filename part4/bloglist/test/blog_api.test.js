const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./helper_test");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("retrieves all users", async () => {
    const users = await helper.usersInDb();

    expect(users).toBeDefined();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails if username not unique", async () => {
    const newUser = {
      username: "root",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("creation fails if no password", async () => {
    const newUser = {
      username: "Arto",
      name: "Matti Luukkainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("creation fails if name is not at least 3 characters", async () => {
    const newUser = {
      username: "Ar",
      name: "Matti Luukkainen",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("creation fails if password is not at least 3 characters", async () => {
    const newUser = {
      username: "Arto",
      name: "Matti Luukkainen",
      password: "pa",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("blogs test", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    const user1 = new User({
      username: "user1",
      name: "user1",
      password: "password",
    });

    const user2 = new User({
      username: "user2",
      name: "user2",
      password: "password",
    });

    await user1.save();
    await user2.save();

    const user1Found = await User.findOne({ username: "user1" });
    const user2Found = await User.findOne({ username: "user2" });

    const blog1 = new Blog({
      title: "body.title",
      author: "body.author",
      url: "body.url",
      likes: 1,
      user: user1Found._id,
    });

    const blog2 = new Blog({
      title: "body.title2",
      author: "body.author2",
      url: "body.url2",
      likes: 1,
      user: user2Found._id,
    });

    await blog1.save();
    await blog2.save();
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(2);
  });

  test("blogs have id field instead of _id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });

  test("creates a new blog post", async () => {
    const user1 = await User.find({ username: "user1" });

    let token = null;

    await api
      .post("/api/login")
      .send({ username: "user1", password: "password" })
      .then((res) => {
        return (token = res.body.token);
      });

    const newBlog = {
      title: "LOLOLO",
      author: "Paco Porras",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      user: user1._id,
    };

    console.log(`bearer ${token}`);

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(3);

    const contents = blogsAtEnd.map((b) => b.title);
    expect(contents).toContain("LOLOLO");
  });

  test("can't new blog post if title or url missing 400", async () => {
    const user1 = await User.find({ username: "user1" });
    const newBlog = {
      author: "Paco Porras",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      user: user1._id,
    };
    const newBlog2 = {
      title: "LOLOLO",
      author: "Paco Porras",
      likes: 0,
      user: user1._id,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
    await api.post("/api/blogs").send(newBlog2).expect(400);
  });

  test("likes defaults to 0 if not provided", async () => {
    const user1 = await User.find({ username: "user1" });
    const newBlog = {
      title: "LOLOLO",
      author: "Paco Porras",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      user: user1._id,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const savedBlog = blogsAtEnd.filter((b) => b.title === "LOLOLO");

    expect(savedBlog[0].likes).toBe(0);
  });
});

describe("addition of new blog", () => {
  let token = null;
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("password", 10);
    const user = new User({ username: "jane", passwordHash });

    await user.save();

    // Login user to get token
    await api
      .post("/api/login")
      .send({ username: "jane", password: "password" })
      .then((res) => {
        return (token = res.body.token);
      });

    return token;
  });

  test("a valid blog can be added by authorized user", async () => {
    const newBlog = {
      title: "New blog",
      author: "Jane Doe",
      url: "http://dummyurl.com",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
