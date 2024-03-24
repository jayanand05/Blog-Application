const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//Database
const { connectMongoDb } = require("./connection");
connectMongoDb();

//routes
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middleware/auth");
const Blog = require("./models/blog");

const app = express();
const PORT = process.env.PORT || 8007;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
