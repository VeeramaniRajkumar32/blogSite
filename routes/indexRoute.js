require('dotenv').config({
  path: `./${process.env.NODE_ENV || 'development'}.env`,
});
const router = require("express").Router();
const categoryController = require("./categoryController");
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");
const jwt = require('jsonwebtoken');

function authToken(req,res,next) {
  const token =  req.cookies.token;
  if (!token) {
    res.render("../views/pages/login.ejs");
  }
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    res.render("../views/pages/login.ejs");
  }
  return next();
}

/* GET dashboard page. */
router.get("/dashboard",authToken,(req, res) => {
  res.render("../views/pages/dashboard.ejs");
});

//user
router
  .get("/auth", (req, res) => {
    res.render("../views/pages/register.ejs");
  })
  .get("/signin", (req, res) => {
    res.render("../views/pages/login.ejs");
  })
  .post("/register", userRoutes.register)
  .post("/login", userRoutes.login)
  .get("/logout", (req, res) => {
    res.cookie('token', '', { maxAge: 0 })
    res.render("../views/pages/login.ejs");
  })

// Category
router
  .get("/category/",authToken, categoryController.getCategory)
  .get("/category/:id",authToken, categoryController.getCategoryId)
  .post("/category/create",authToken, categoryController.createCategory)
  .post("/category",authToken, categoryController.updateCategory)
  .post("/category/delete/:id",authToken, categoryController.deleteCategory);

// Post
router
  .get("/post",authToken, postRoutes.getPost)
  // .post("/post/create", postRoutes.createPost)

module.exports = router;
