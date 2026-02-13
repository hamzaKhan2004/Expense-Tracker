// const express = require("express");

// const { registerUser, loginUser, getUserInfo } = require("../controllers/authController.js");
// const { protect } = require("../middlewares/authMiddleware.js");
// const upload = require("../middlewares/uploadMiddleware.js");
// const { uploadImage } = require("../controllers/uploadController");

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/getUser", protect, getUserInfo);

// router.post("/upload-image", upload.single("image"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
//     }
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename
//         }`;
//     res.status(200).json({ imageUrl });
// })

// module.exports = router;
const express = require("express");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const { uploadImage } = require("../controllers/uploadController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

// Unified upload route
router.post("/upload-image", upload.single("image"), uploadImage);

module.exports = router;
