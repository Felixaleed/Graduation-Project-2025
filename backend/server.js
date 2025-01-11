const express = require("express");
const multer = require("multer");
const cors = require("cors");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());

app.post("/classify", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded!" });
    }

    // Forward the file to the Python server
    const formData = new FormData();
    formData.append("file", file.buffer, file.originalname);

    const response = await axios.post("http://localhost:5001/classify", formData, {
      headers: formData.getHeaders(),
    });

    res.json(response.data); // Send the Python server's response back to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing image" });
  }
});

app.listen(5000, () => {
  console.log("Node.js server running on http://localhost:5000");
});
