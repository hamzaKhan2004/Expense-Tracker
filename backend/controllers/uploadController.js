const fs = require("fs");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");


exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // 🧪 DEVELOPMENT → Local storage
        if (process.env.NODE_ENV === "development") {
            const uploadDir = path.join(__dirname, "../uploads");

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }

            const fileName = `${Date.now()}-${req.file.originalname}`;
            const filePath = path.join(uploadDir, fileName);

            fs.writeFileSync(filePath, req.file.buffer);

            const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;

            return res.status(200).json({ imageUrl });
        }

        // 🚀 PRODUCTION → Cloudinary
        const streamUpload = () =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "profile_images",
                    },
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

        const result = await streamUpload();

        return res.status(200).json({
            imageUrl: result.secure_url,
        });
    } catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({ message: "Image upload failed" });
    }
};
