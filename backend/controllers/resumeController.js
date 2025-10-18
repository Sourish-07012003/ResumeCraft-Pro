// import Resume from "../models/Resume.js";

// export const getResume = async (req, res) => {
//   try {
//     const resume = await Resume.findOne({ user: req.user._id });
//     res.json(resume || { summary: "", skills: [] });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const saveResume = async (req, res) => {
//   try {
//     const { summary, skills } = req.body;
//     let resume = await Resume.findOne({ user: req.user._id });

//     if (!resume) {
//       resume = await Resume.create({ user: req.user._id, summary, skills });
//     } else {
//       resume.summary = summary;
//       resume.skills = skills;
//       await resume.save();
//     }

//     res.json(resume);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import express from "express";
import axios from "axios";
import Resume from "../models/Resume.js";

const router = express.Router();

/** 🧩 Helper to build LLM prompt from resume data */
function buildSummaryPrompt(resume) {
  const { name, skills, projects, courses, achievements } = resume;
  let s = `Write a professional 2–3 sentence resume summary based on the following data:\n\n`;

  if (name) s += `Name: ${name}\n`;

  const skillList = Array.isArray(skills)
    ? skills.join(", ")
    : (skills || "No skills listed");
  s += `Skills: ${skillList}\n`;

  if (projects?.length) {
    s += `\nProjects:\n`;
    projects.forEach((p) => {
      s += `- ${p.title || "Untitled"}: ${p.description || ""}\n`;
    });
  }

  if (courses?.length) {
    s += `\nCourses:\n`;
    courses.forEach((c) => {
      s += `- ${c.name || "Unnamed"} (${c.platform || "Unknown platform"})\n`;
    });
  }

  if (achievements?.length) {
    s += `\nAchievements:\n`;
    achievements.forEach((a) => {
      s += `- ${a.title || "Untitled achievement"}\n`;
    });
  }

  s += `\nMake the summary sound confident, concise, and professional.`;
  return s;
}

/** 🟢 GET resume */
router.get("/", async (req, res) => {
  const resume = await Resume.findOne();
  res.json(resume || {});
});

/** 🟡 POST — Save or update resume */
router.post("/", async (req, res) => {
  const data = req.body;
  let resume = await Resume.findOne();
  if (resume) Object.assign(resume, data);
  else resume = new Resume(data);

  await resume.save();
  res.json(resume);
});

/** 🤖 POST — Auto-generate summary using Groq API */
router.post("/generate-summary", async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume)
      return res.status(404).json({ message: "No resume found" });

    const prompt = buildSummaryPrompt(resume);

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: process.env.GROQ_MODEL || "llama-3.1-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are an expert resume writer. Write professional, confident summaries highlighting key skills and achievements.",
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

    const summary =
      response.data?.choices?.[0]?.message?.content?.trim() ||
      "Could not generate summary.";

    resume.summary = summary;
    await resume.save();

    res.json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error.response?.data || error.message);
    res.status(500).json({
      message: "Error generating summary",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
