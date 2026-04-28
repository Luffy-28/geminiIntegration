import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

app.post("/api/generate-description", async (req, res) => {
  const { productName } = req.body;

  if (!productName || productName.trim() === "") {
    return res.status(400).json({ error: "Product name is required" });
  }

  try {
    const result = await model.generateContent(
      `Generate an ecommerce product description for ${productName} including:
      - Short marketing description
      - Key features
      - Specifications
      - Benefits
      - SEO-friendly wording
      - Premium persuasive tone
      Format the description in a way that is suitable for an ecommerce product listing.
      donot use emojis or special characters.`,
    );

    const description = result.response.text();
    res.json({ description });
  } catch (error) {
    console.error("Error generating description:", error.message);
    res.status(500).json({ error: "Failed to generate description" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
