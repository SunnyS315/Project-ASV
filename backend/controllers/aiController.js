const { GoogleGenAI } = require("@google/genai");
const { questionAnswerPrompt, conceptExplainPrompt } = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//@desc Generate interview questions and answers using Gemini
//@route POST /api/ai/generate-questions
//@access Private
const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

        let response;

        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                });

                break; // Success
            } catch (error) {
                const errorMsg = error.message || "";

                // Retry only for Gemini overload errors
                if (
                    attempt < 3 &&
                    (errorMsg.includes("503") ||
                    errorMsg.includes("high demand") ||
                    errorMsg.includes("temporarily unavailable"))
                ) {
                    console.log(
                        `Gemini busy. Retrying (${attempt}/3)...`
                    );

                    await new Promise((resolve) =>
                        setTimeout(resolve, 2000)
                    );

                    continue;
                }

                throw error;
            }
        }

        let rawText = response.text;

        // Clean : Remove ```json and ``` from beg and end
        const cleanedText = rawText
            .replace(/```json/g, "") // Removes "```json" starting from beginning or anywhere
            .replace(/```/g, "") // Removes "```" anywhere
            .trim(); // Remove extra spaces

        // Parse the JSON array
        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to generate questions',
            error: error.message,
        });
    }
};

// @desc Generate explanation for a interview question
// @route POST /api/ai/generate-explanation
// @access Private
const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = conceptExplainPrompt(question);

        let response;

        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: prompt,
                });

                break;
            } catch (error) {
                const errorMsg = error.message || "";

                if (
                    attempt < 3 &&
                    (errorMsg.includes("503") ||
                    errorMsg.includes("high demand") ||
                    errorMsg.includes("temporarily unavailable"))
                ) {
                    console.log(`Gemini busy. Retrying (${attempt}/3)...`);

                    await new Promise((resolve) =>
                        setTimeout(resolve, 2000)
                    );

                    continue;
                }

                throw error;
            }
        }

        let rawText = response.text;

        // Clean : Remove ```json and ``` from beg and end
        const cleanedText = rawText
            .replace(/```json/g, "") // Removes "```json" starting from beginning or anywhere
            .replace(/```/g, "") // Removes "```" anywhere
            .trim(); // Remove extra spaces

        res.status(200).json({
            title: question,
            explanation: cleanedText
        });
        } catch (error) {
        console.error("Generate Explanation Error:");
        console.error(error);

        res.status(500).json({
            message: "Failed to generate explanation",
            error: error.message,
        });
    }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };