import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import pdf from "pdf-parse";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

function cleanText(value) {
  if (!value) return "";
  return String(value).trim();
}

function createMockCoverLetter(data) {
  const name = cleanText(data.candidateName);
  const role = cleanText(data.jobRole);
  const company = cleanText(data.companyName);
  const skills = cleanText(data.keySkills);

 return `Dear Hiring Manager,

My name is ${name}, and I am excited to apply for the ${role} position at ${company}. I believe my background and skills make me a strong fit for this opportunity.

Throughout my experience, I have developed key skills in ${skills}. These skills have helped me solve problems, work well with teams, and deliver meaningful results.

I am especially interested in joining ${company} because this role matches my career goals and gives me the opportunity to contribute to a strong and growing team.

Thank you for considering my application. I would be grateful for the opportunity to discuss how my skills and motivation can support ${company}.

Sincerely,
${name}`;
}

function buildPrompt(data, resumeText) {
  const name = cleanText(data.candidateName);
  const role = cleanText(data.jobRole);
  const company = cleanText(data.companyName);
  const skills = cleanText(data.keySkills);
  const jobDescription = cleanText(data.jobDescription);

  return `
You are an expert career coach and professional cover letter writer.

Write a polished, human-sounding cover letter for the candidate below.

Candidate Name:
${name}

Target Role:
${role}

Company:
${company}

Key Skills:
${skills}

Job Description:
${jobDescription || "No job description was provided."}

Resume Text:
${resumeText || "No resume was uploaded."}

Requirements:
- Write in a natural, professional tone.
- Do not sound robotic or generic.
- Use proper paragraphs.
- Do not create fake experience.
- Personalize the letter using the skills, resume text, and job description.
- Keep it around 250 to 350 words.
- Start with "Dear Hiring Manager,"
- End with "Sincerely," and the candidate name.
`;
}

app.get("/", (req, res) => {
  res.json({
    message: "AI Cover Letter Generator API is running"
  });
});

app.post("/api/generate-cover-letter", upload.single("resume"), async (req, res) => {
  try {
    const {
      candidateName,
      jobRole,
      companyName,
      keySkills,
      jobDescription,
      useMock
    } = req.body;

    if (!candidateName || !jobRole || !companyName || !keySkills) {
      return res.status(400).json({
        error: "Candidate name, job role, company name, and key skills are required."
      });
    }

    let resumeText = "";

    if (req.file) {
      const parsedPdf = await pdf(req.file.buffer);
      resumeText = parsedPdf.text || "";
    }

    if (useMock === "true" || !ai) {
      const letter = createMockCoverLetter({
        candidateName,
        jobRole,
        companyName,
        keySkills
      });

      return res.json({
        letter,
        mode: "mock"
      });
    }

    const prompt = buildPrompt(
      {
        candidateName,
        jobRole,
        companyName,
        keySkills,
        jobDescription
      },
      resumeText
    );

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: prompt
    });

    const letter = response.text || "";

    if (!letter) {
      return res.status(500).json({
        error: "AI did not return a cover letter. Please try again."
      });
    }

    res.json({
      letter,
      mode: "ai"
    });
  } catch (error) {
    console.error("Cover letter generation failed:", error);

    res.status(500).json({
      error: "Something went wrong while generating the cover letter."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});