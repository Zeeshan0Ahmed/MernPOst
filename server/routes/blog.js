const express = require("express");
const multer = require("multer");
const checkIsUserAuthenticated = require("../middleware/authMiddleware");
const { userRegistration, userLogin } = require("../controller/userController");
const {
  getAllBlogs,
  getSingleBlog,
  addNewBlog,
} = require("../controller/blogController");
const { getAllCategories, addNewCategory } = require("../controller/category");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()} - ${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/user/register", userRegistration);
router.post("/user/login", userLogin);

//Protected Routes
router.get("/get/allblogs", checkIsUserAuthenticated, getAllBlogs);
router.post(
  "/add/allblogs",
  checkIsUserAuthenticated,
  upload.single("thumbnail"),
  addNewBlog
);
router.get("/get/blog/:id", checkIsUserAuthenticated, getSingleBlog);

router.get("/get/categories", checkIsUserAuthenticated, getAllCategories);
router.post("/add/category", checkIsUserAuthenticated, addNewCategory);
module.exports = router;
