const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "TruthCheck AI Backend is running!"
    });
});

app.post("/api/verify", async (req, res) => {
    try {
        const { news } = req.body;

        if (!news || news.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Please provide a news claim."
            });
        }

        console.log("Received claim:", news);

        const { GoogleGenAI } = await import("@google/genai");

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        const prompt = `
You are TruthCheck AI, a careful fact-checking assistant.

Analyze this news claim:

"${news}"

Classify it as REAL, FAKE, or UNCERTAIN.

Rules:
- Do not call a claim FAKE just because there is no evidence.
- Use UNCERTAIN when reliable evidence is insufficient or conflicting.
- Consider whether the claim could be outdated, misleading, satire, or opinion.
- Give a short and clear explanation.
- Give a confidence score from 0 to 100.

Return ONLY valid JSON:

{
  "verdict": "REAL",
  "confidence": 90,
  "explanation": "Short explanation."
}
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt
        });

        let text = response.text.trim();

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(text);

        res.json({
            success: true,
            verdict: result.verdict,
            confidence: result.confidence,
            explanation: result.explanation,
            sources: []
        });

    } catch (error) {
        console.error("Verification error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to verify the news claim.",
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `TruthCheck AI backend running on http://localhost:${PORT}`
    );
});