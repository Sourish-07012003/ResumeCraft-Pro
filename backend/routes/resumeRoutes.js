// import express from "express";
// import Resume from "../models/Resume.js";

// const router = express.Router();

// // Get resume
// router.get("/", async (req, res) => {
//   const resume = await Resume.findOne();
//   res.json(resume || {});
// });

// // Save or update resume
// router.post("/", async (req, res) => {
//   const data = req.body;
//   let resume = await Resume.findOne();
//   if (resume) {
//     Object.assign(resume, data);
//   } else {
//     resume = new Resume(data);
//   }
//   await resume.save();
//   res.json(resume);
// });

// export default router;
import express from "express";
import axios from "axios";
import Resume from "../models/Resume.js";

const router = express.Router();

// 🧩 Helper to build a good LLM prompt
function buildSummaryPrompt(resume) {
  const { name, skills, projects, courses, achievements } = resume;
  let s = `Write a professional 2-3 sentence resume summary based on this data:\n\n`;

  if (name) s += `Name: ${name}\n`;
const skillsList = Array.isArray(skills) ? skills.join(", ") : skills;
const prompt = `Generate a professional summary for ${name}, highlighting skills: ${skillsList}`;

  if (projects?.length) {
    s += `Projects:\n`;
    projects.forEach((p) => {
      s += `- ${p.title}: ${p.description || ""}\n`;
    });
  }

  if (courses?.length) {
    s += `Courses:\n`;
    courses.forEach((c) => {
      s += `- ${c.name} (${c.platform || ""})\n`;
    });
  }

  if (achievements?.length) {
    s += `Achievements:\n`;
    achievements.forEach((a) => {
      s += `- ${a.title}\n`;
    });
  }

  s += `\nMake the summary sound confident, concise, and professional.`;
  return s;
}

// 🟢 GET resume
router.get("/", async (req, res) => {
  const resume = await Resume.findOne();
  res.json(resume || {});
});

// 🟡 POST - save or update resume
router.post("/", async (req, res) => {
  const data = req.body;
  let resume = await Resume.findOne();
  if (resume) {
    Object.assign(resume, data);
  } else {
    resume = new Resume(data);
  }
  await resume.save();
  res.json(resume);
});

// 🧠 POST - auto-generate summary using Groq
router.post("/generate-summary", async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) return res.status(404).json({ message: "No resume found" });

    const prompt = buildSummaryPrompt(resume);

    // call Groq API (OpenAI-compatible endpoint)
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
     model: process.env.GROQ_MODEL || "openai/gpt-oss-20B",


        messages: [
          {
            role: "system",
            content: "You are an expert resume writer creating professional summaries.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary = response.data.choices?.[0]?.message?.content?.trim();
    if (!summary) {
      return res.status(500).json({ message: "Failed to generate summary" });
    }

    resume.summary = summary;
    await resume.save();

    res.json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error.response?.data || error.message);
    res.status(500).json({ message: "Error generating summary" });
  }
});

export default router;
