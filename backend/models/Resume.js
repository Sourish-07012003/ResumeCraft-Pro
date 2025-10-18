import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
});

const courseSchema = new mongoose.Schema({
  name: String,
  platform: String,
  completionDate: String,
});

const achievementSchema = new mongoose.Schema({
  title: String,
  date: String,
});

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  summary: String,
  skills: String,
  projects: [projectSchema],
  courses: [courseSchema],
  achievements: [achievementSchema],
});

export default mongoose.model("Resume", resumeSchema);
