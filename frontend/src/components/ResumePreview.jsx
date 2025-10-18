import { useEffect, useState } from "react";
import { getResume } from "../services/resumeService";

export default function ResumePreview() {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    getResume().then(setResume);
  }, []);

  return (
    <div className="resume-preview">
      <h3>Resume Preview</h3>
      {resume ? (
        <>
          <p><b>Summary:</b> {resume.summary}</p>
          <p><b>Skills:</b> {resume.skills.join(", ")}</p>
        </>
      ) : (
        <p>No resume data found.</p>
      )}
    </div>
  );
}
