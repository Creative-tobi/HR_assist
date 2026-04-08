const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse-new");
const { Groq } = require("groq-sdk");
const router = express.Router();

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Configure Multer for strictly in-memory storage (fast, no disk writing)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit to prevent server overload
});

router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription;

    // Validate incoming data
    if (!req.file) {
      return res.status(400).json({ error: "Missing resume PDF." });
    }
    if (!jobDescription || jobDescription.trim() === "") {
      return res.status(400).json({ error: "Missing Job Description." });
    }

    // Extract text from the PDF buffer
    let resumeText = "";
    try {
      // Force the parser to read the buffer directly
      const pdfData = await pdfParse(req.file.buffer);
      resumeText = pdfData.text;

      if (!resumeText || resumeText.trim() === "") {
        throw new Error("PDF extracted successfully, but no text was found.");
      }
    } catch (pdfError) {
      console.error("[PDF PARSE FATAL ERROR]:", pdfError);
      return res
        .status(500)
        .json({
          error:
            "Failed to extract text. Make sure you are uploading a standard, text-based PDF (not an image or scan).",
        });
    }

    //Construct the strict JSON prompt for the AI
    const prompt = `
      You are an elite HR Executive AI. Your task is to analyze the following Candidate Resume against the provided Job Description.
      
      You MUST return the analysis STRICTLY as a raw JSON object using the exact schema below. 
      Do NOT wrap the JSON in markdown blocks (e.g., \`\`\`json). Do NOT add any conversational text before or after the JSON.
      
      {
        "match_score": <An integer between 1 and 100 representing how well the resume matches the JD>,
        "strengths": [
          "<String: Candidate's first key matching strength>",
          "<String: Candidate's second key matching strength>",
          "<String: Candidate's third key matching strength>"
        ],
        "weaknesses": [
          "<String: First missing skill or gap based on the JD>",
          "<String: Second missing skill or gap based on the JD>",
          "<String: Third missing skill or gap based on the JD>"
        ],
        "interview_questions": [
          "<String: A highly specific interview question testing the first weakness>",
          "<String: A highly specific interview question testing the second weakness>",
          "<String: A strategic behavioral question based on the resume>",
          "<String: A technical question based on the job requirements>",
          "<String: A question addressing a specific claim on the resume>"
        ]
      }

      Job Description:
      ${jobDescription}

      Resume:
      ${resumeText}
    `;

    //Call the Groq API (using the blazing fast llama3 model)
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
      temperature: 0.1, // Extremely low temperature to force deterministic JSON output
    });

    const aiResponseText = chatCompletion.choices[0]?.message?.content;

    if (!aiResponseText) {
      throw new Error("AI returned an empty response.");
    }

    // Clean and parse the AI output
    // Sometimes the AI might still wrap in markdown despite instructions, this safely strips it out.
    const cleanedText = aiResponseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let decodedData;
    try {
      decodedData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("[JSON PARSE ERROR] AI Output was:", cleanedText);
      return res.status(500).json({
        error: "AI failed to format the response correctly. Please try again.",
      });
    }

    // Send the decoded data to the React frontend
    res.status(200).json(decodedData);
  } catch (error) {
    console.error("[SERVER ERROR]:", error);
    res
      .status(500)
      .json({
        error:
          "An internal server error occurred while analyzing the candidate.",
      });
  }
});


router.post('/simulate', async (req, res) => {
  try {
    const { originalQuestion, history, newMessage, strengths, weaknesses } = req.body;

    //  Build the Persona Prompt
    const systemPrompt = `
      You are a candidate in a job interview. Act naturally, conversationally, and professionally. 
      Here is your profile context based on your resume analysis:
      - Your verified strengths: ${strengths.join(", ")}.
      - Your missing skills or gaps: ${weaknesses.join(", ")}.

      The interviewer originally asked you this question: "${originalQuestion}"
      
      RULES:
      1. Stay completely in character. DO NOT say "As an AI...".
      2. Keep your answers concise (under 3 or 4 sentences).
      3. If the interviewer asks about a skill gap, be honest but frame it as a learning opportunity.
      4. Respond directly to the interviewer's newest message.
    `;

    //  Format the chat history for Groq
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map(msg => ({ 
        role: msg.role === 'interviewer' ? 'user' : 'assistant', 
        content: msg.content 
      })),
      { role: 'user', content: newMessage }
    ];

    // Call the Llama 3 Engine
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.1-8b-instant",
      temperature: 0.6, 
    });

    const aiReply = chatCompletion.choices[0]?.message?.content;
    
    res.status(200).json({ reply: aiReply });

  } catch (error) {
    console.error('[SIMULATOR ERROR]:', error);
    res.status(500).json({ error: 'Candidate AI disconnected.' });
  }
});

module.exports = router;
