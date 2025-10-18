import { useState } from "react";
import { saveResume } from "../services/resumeService";

export default function ResumeEditor() {
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");

  const handleSave = async () => {
    await saveResume({ summary, skills: skills.split(",") });
    alert("Resume saved!");
  };

  return (
    <div className="resume-editor">
      <h3>Edit Resume</h3>
      <textarea
        rows="4"
        placeholder="Write your summary..."
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
