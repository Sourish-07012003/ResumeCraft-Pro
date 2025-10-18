














// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import "./Dashboard.css";

// // export default function Dashboard() {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     summary: "",
// //     skills: "",
// //     projects: [],
// //     courses: [],
// //     achievements: [],
// //   });

// //   const [savedResume, setSavedResume] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   const API_URL = "http://localhost:5000/api/resume";

// //   useEffect(() => {
// //     const fetchResume = async () => {
// //       try {
// //         const { data } = await axios.get(API_URL);
// //         if (data) setForm(data);
// //         setSavedResume(data);
// //       } catch (error) {
// //         console.error("Error fetching resume:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchResume();
// //   }, []);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleAdd = (field, item) => {
// //     if (!item.title && !item.name) return;
// //     setForm({ ...form, [field]: [...form[field], item] });
// //   };

// //   const handleSave = async () => {
// //     try {
// //       const { data } = await axios.post(API_URL, form);
// //       setSavedResume(data);
// //       alert("✅ Resume saved successfully!");
// //     } catch {
// //       alert("Error saving resume.");
// //     }
// //   };

// //   const handleGenerateSummary = async () => {
// //     try {
// //       const { data } = await axios.post(`${API_URL}/generate-summary`);
// //       setForm({ ...form, summary: data.summary });
// //       alert("✨ Summary generated successfully!");
// //     } catch {
// //       alert("❌ Failed to generate summary.");
// //     }
// //   };

// //   const handleLogout = () => {
// //     // Clear any stored data (like user/token)
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("token");

// //     // Redirect to login/register page
// //     navigate("/");
// //   };

// //   if (loading) return <p>Loading...</p>;

// //   return (
// //     <div className="dashboard-container">
// //       {/* ─── Header with Logout Button ─── */}
// //       <div className="dashboard-header">
// //         <h1>🧾 Resume Dashboard</h1>
// //         <button className="logout-btn" onClick={handleLogout}>
// //           🚪 Logout
// //         </button>
// //       </div>

// //       {/* ─── Main Resume Editor and Preview ─── */}
// //       <div className="editor-card">
// //         <h2>🧑‍💼 Edit Resume</h2>

// //         <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
// //         <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />

// //         <textarea
// //           name="summary"
// //           rows="3"
// //           value={form.summary}
// //           onChange={handleChange}
// //           placeholder="Professional Summary"
// //         />
// //         <button className="generate-btn" onClick={handleGenerateSummary}>
// //           ⚡ Auto-Generate Summary
// //         </button>

// //         <input
// //           name="skills"
// //           value={form.skills}
// //           onChange={handleChange}
// //           placeholder="Skills (comma separated)"
// //         />

// //         <Section title="Projects">
// //           <AddProjectForm onAdd={(p) => handleAdd("projects", p)} />
// //         </Section>

// //         <Section title="Courses">
// //           <AddCourseForm onAdd={(c) => handleAdd("courses", c)} />
// //         </Section>

// //         <Section title="Achievements">
// //           <AddAchievementForm onAdd={(a) => handleAdd("achievements", a)} />
// //         </Section>

// //         <button className="save-btn" onClick={handleSave}>💾 Save Resume</button>
// //       </div>

// //       <div className="preview-card">
// //         <h2>📄 Resume Preview</h2>
// //         <hr />
// //         <h3>{savedResume?.name}</h3>
// //         <p className="email">{savedResume?.email}</p>
// //         <p className="summary">{savedResume?.summary}</p>

// //         <h4>Skills</h4>
// //         <ul>
// //           {savedResume?.skills?.split(",").map((s, i) => (
// //             <li key={i}>{s.trim()}</li>
// //           ))}
// //         </ul>

// //         <h4>Projects</h4>
// //         <ul>
// //           {savedResume?.projects?.map((p, i) => (
// //             <li key={i}>
// //               <b>{p.title}</b> — {p.description}{" "}
// //               {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer">🔗</a>}
// //             </li>
// //           ))}
// //         </ul>

// //         <h4>Courses</h4>
// //         <ul>
// //           {savedResume?.courses?.map((c, i) => (
// //             <li key={i}>{c.name} – {c.platform} ({c.completionDate})</li>
// //           ))}
// //         </ul>

// //         <h4>Achievements</h4>
// //         <ul>
// //           {savedResume?.achievements?.map((a, i) => (
// //             <li key={i}>{a.title} ({a.date})</li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }

// // // ─────────────────────────────
// // // Sub-components
// // function Section({ title, children }) {
// //   return (
// //     <div className="section">
// //       <h3>{title}</h3>
// //       {children}
// //     </div>
// //   );
// // }

// // function AddProjectForm({ onAdd }) {
// //   const [project, setProject] = useState({ title: "", description: "", link: "" });
// //   return (
// //     <div className="add-form">
// //       <input placeholder="Title" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} />
// //       <input placeholder="Description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} />
// //       <input placeholder="Link" value={project.link} onChange={(e) => setProject({ ...project, link: e.target.value })} />
// //       <button onClick={() => { onAdd(project); setProject({ title: "", description: "", link: "" }); }}>Add</button>
// //     </div>
// //   );
// // }

// // function AddCourseForm({ onAdd }) {
// //   const [course, setCourse] = useState({ name: "", platform: "", completionDate: "" });
// //   return (
// //     <div className="add-form">
// //       <input placeholder="Course Name" value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} />
// //       <input placeholder="Platform" value={course.platform} onChange={(e) => setCourse({ ...course, platform: e.target.value })} />
// //       <input placeholder="Completion Date" value={course.completionDate} onChange={(e) => setCourse({ ...course, completionDate: e.target.value })} />
// //       <button onClick={() => { onAdd(course); setCourse({ name: "", platform: "", completionDate: "" }); }}>Add</button>
// //     </div>
// //   );
// // }

// // function AddAchievementForm({ onAdd }) {
// //   const [achievement, setAchievement] = useState({ title: "", date: "" });
// //   return (
// //     <div className="add-form">
// //       <input placeholder="Title" value={achievement.title} onChange={(e) => setAchievement({ ...achievement, title: e.target.value })} />
// //       <input placeholder="Date" value={achievement.date} onChange={(e) => setAchievement({ ...achievement, date: e.target.value })} />
// //       <button onClick={() => { onAdd(achievement); setAchievement({ title: "", date: "" }); }}>Add</button>
// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";

// // ─────────────────────────────
// // Main Component
// // ─────────────────────────────
// export default function Dashboard() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     summary: "",
//     skills: "",
//     projects: [],
//     courses: [],
//     achievements: [],
//   });

//   const [savedResume, setSavedResume] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // NOTE: In a real app, the API URL should likely be in an environment variable.
//   const API_URL = "http://localhost:5000/api/resume";

//   useEffect(() => {
//     const fetchResume = async () => {
//       try {
//         // Assume the backend uses some authentication (e.g., JWT token in headers)
//         // For simplicity here, we assume the backend handles auth implicitly or uses a public endpoint for fetching
//         const { data } = await axios.get(API_URL);
//         if (data) setForm(data);
//         setSavedResume(data);
//       } catch (error) {
//         console.error("Error fetching resume:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchResume();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAdd = (field, item) => {
//     // Basic validation to ensure an item has at least a title or name
//     if (!item.title && !item.name) return;
//     setForm({ ...form, [field]: [...form[field], item] });
//   };

//   const handleSave = async () => {
//     try {
//       // POST request to save or update the resume data
//       const { data } = await axios.post(API_URL, form);
//       setSavedResume(data);
//       alert("✅ Resume saved successfully!");
//     } catch {
//       alert("Error saving resume. Check server connection and authentication.");
//     }
//   };

//   const handleGenerateSummary = async () => {
//     try {
//       // POST request to trigger AI summary generation on the backend
//       // In a real scenario, you'd send relevant form data to the backend for context.
//       const { data } = await axios.post(`${API_URL}/generate-summary`);
//       setForm({ ...form, summary: data.summary });
//       alert("✨ Summary generated successfully!");
//     } catch {
//       alert("❌ Failed to generate summary. Is the AI service running?");
//     }
//   };

//   const handleLogout = () => {
//     // Clear stored user/token data
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     // Redirect to login/register page
//     navigate("/");
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="dashboard-container">
//       {/* ─── Header: Title (left) and Logout Button (right) ─── */}
//       <div className="dashboard-header">
//         <h1>🧾 Resume Dashboard</h1>
//         <button className="logout-btn" onClick={handleLogout}>
//           🚪 Logout
//         </button>
//       </div>

//       {/* ─── Main Content Area: Editor (left) and Preview (right) ─── */}
//       <div className="main-content-wrapper">
//         <div className="editor-card">
//           <h2>🧑‍💼 Edit Resume</h2>

//           <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
//           <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />

//           <textarea
//             name="summary"
//             rows="3"
//             value={form.summary}
//             onChange={handleChange}
//             placeholder="Professional Summary"
//           />
//           <button className="generate-btn" onClick={handleGenerateSummary}>
//             ⚡ Auto-Generate Summary
//           </button>

//           <input
//             name="skills"
//             value={form.skills}
//             onChange={handleChange}
//             placeholder="Skills (comma separated)"
//           />

//           <Section title="Projects">
//             <AddProjectForm onAdd={(p) => handleAdd("projects", p)} />
//           </Section>

//           <Section title="Courses">
//             <AddCourseForm onAdd={(c) => handleAdd("courses", c)} />
//           </Section>

//           <Section title="Achievements">
//             <AddAchievementForm onAdd={(a) => handleAdd("achievements", a)} />
//           </Section>

//           <button className="save-btn" onClick={handleSave}>
//             💾 Save Resume
//           </button>
//         </div>

//         <div className="preview-card">
//           <h2>📄 Resume Preview</h2>
//           <hr />
//           <h3>{savedResume?.name || "Your Name"}</h3>
//           <p className="email">{savedResume?.email || "your.email@example.com"}</p>
//           <p className="summary">{savedResume?.summary || "Professional summary goes here..."}</p>

//           <h4>Skills</h4>
//           <ul className="skill-list">
//             {savedResume?.skills?.split(",").map((s, i) => (
//               <li key={i}>{s.trim()}</li>
//             ))}
//           </ul>

//           <h4>Projects</h4>
//           <ul>
//             {savedResume?.projects?.map((p, i) => (
//               <li key={i}>
//                 <b>{p.title}</b> — {p.description}{" "}
//                 {p.link && (
//                   <a href={p.link} target="_blank" rel="noopener noreferrer">
//                     🔗
//                   </a>
//                 )}
//               </li>
//             ))}
//           </ul>

//           <h4>Courses</h4>
//           <ul>
//             {savedResume?.courses?.map((c, i) => (
//               <li key={i}>
//                 {c.name} – {c.platform} ({c.completionDate})
//               </li>
//             ))}
//           </ul>

//           <h4>Achievements</h4>
//           <ul>
//             {savedResume?.achievements?.map((a, i) => (
//               <li key={i}>
//                 {a.title} ({a.date})
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────
// // Sub-components for Form Sections
// // ─────────────────────────────
// function Section({ title, children }) {
//   return (
//     <div className="section">
//       <h3>{title}</h3>
//       {children}
//     </div>
//   );
// }

// function AddProjectForm({ onAdd }) {
//   const [project, setProject] = useState({ title: "", description: "", link: "" });
//   return (
//     <div className="add-form">
//       <input placeholder="Title" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} />
//       <input placeholder="Description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} />
//       <input placeholder="Link (Optional)" value={project.link} onChange={(e) => setProject({ ...project, link: e.target.value })} />
//       <button
//         onClick={() => {
//           onAdd(project);
//           setProject({ title: "", description: "", link: "" });
//         }}
//         disabled={!project.title}
//       >
//         Add
//       </button>
//     </div>
//   );
// }

// function AddCourseForm({ onAdd }) {
//   const [course, setCourse] = useState({ name: "", platform: "", completionDate: "" });
//   return (
//     <div className="add-form">
//       <input placeholder="Course Name" value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} />
//       <input placeholder="Platform" value={course.platform} onChange={(e) => setCourse({ ...course, platform: e.target.value })} />
//       <input placeholder="Completion Date (e.g., 2023-05)" value={course.completionDate} onChange={(e) => setCourse({ ...course, completionDate: e.target.value })} />
//       <button
//         onClick={() => {
//           onAdd(course);
//           setCourse({ name: "", platform: "", completionDate: "" });
//         }}
//         disabled={!course.name}
//       >
//         Add
//       </button>
//     </div>
//   );
// }

// function AddAchievementForm({ onAdd }) {
//   const [achievement, setAchievement] = useState({ title: "", date: "" });
//   return (
//     <div className="add-form">
//       <input placeholder="Title/Award" value={achievement.title} onChange={(e) => setAchievement({ ...achievement, title: e.target.value })} />
//       <input placeholder="Date (e.g., 2024)" value={achievement.date} onChange={(e) => setAchievement({ ...achievement, date: e.target.value })} />
//       <button
//         onClick={() => {
//           onAdd(achievement);
//           setAchievement({ title: "", date: "" });
//         }}
//         disabled={!achievement.title}
//       >
//         Add
//       </button>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas"; 
import jsPDF from "jspdf"; 
import "./Dashboard.css";

// ─────────────────────────────
// Main Component
// ─────────────────────────────
export default function Dashboard() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    summary: "",
    skills: "",
    projects: [],
    courses: [],
    achievements: [],
  });

  const [savedResume, setSavedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api/resume";

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await axios.get(API_URL);
        if (data) setForm(data);
        setSavedResume(data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (field, item) => {
    if (!item.title && !item.name) return;
    setForm({ ...form, [field]: [...form[field], item] });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.post(API_URL, form);
      setSavedResume(data);
      alert("✅ Resume saved successfully!");
    } catch {
      alert("Error saving resume. Check server connection and authentication.");
    }
  };

  const handleGenerateSummary = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/generate-summary`);
      setForm({ ...form, summary: data.summary });
      alert("✨ Summary generated successfully!");
    } catch {
      alert("❌ Failed to generate summary. Is the AI service running?");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  // ─────────────────────────────
  // PDF Download Logic
  // ─────────────────────────────
  const handleDownloadPdf = () => {
    // Target the specific div containing the resume content
    const input = document.getElementById("resume-preview-content");

    if (!input) {
      alert("Preview content not found!");
      return;
    }
    
    // Temporarily set height to auto to ensure all content is captured for the PDF
    // We add a class to temporarily override height/flex styles for proper capture
    input.classList.add('pdf-capture-mode');

    html2canvas(input, {
      scale: 2, 
      useCORS: true,
      logging: false, // Set to true for debugging
      allowTaint: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; 
      const pageHeight = 295; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${savedResume?.name?.replace(/\s/g, '_') || 'resume'}_generated.pdf`;
      pdf.save(fileName);
      
      // Remove the temporary class after capture
      input.classList.remove('pdf-capture-mode');
    });
  };
  // ─────────────────────────────

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      {/* ─── Header: Title (left) and Logout Button (right) ─── */}
      <div className="dashboard-header">
        <h1>🧾 Resume Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* ─── Main Content Area: Editor (left) and Preview (right) ─── */}
      <div className="main-content-wrapper">
        <div className="editor-card">
          <h2>🧑‍💼 Edit Resume</h2>

          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />

          <textarea
            name="summary"
            rows="3"
            value={form.summary}
            onChange={handleChange}
            placeholder="Professional Summary"
          />
          <button className="generate-btn" onClick={handleGenerateSummary}>
            ⚡ Auto-Generate Summary
          </button>

          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Skills (comma separated)"
          />

          <Section title="Projects">
            <AddProjectForm onAdd={(p) => handleAdd("projects", p)} />
          </Section>

          <Section title="Courses">
            <AddCourseForm onAdd={(c) => handleAdd("courses", c)} />
          </Section>

          <Section title="Achievements">
            <AddAchievementForm onAdd={(a) => handleAdd("achievements", a)} />
          </Section>

          <button className="save-btn" onClick={handleSave}>
            💾 Save Resume
          </button>
        </div>

        {/* This wrapper ensures the Preview Card and Download Button are treated as one column */}
        <div className="preview-column"> 
          <div className="preview-card">
            <div className="preview-header">
               <h2>📄 Resume Preview</h2>
               {/* DOWNLOAD BUTTON: Placed above the preview content */}
               <button className="download-pdf-btn" onClick={handleDownloadPdf}>
                  ⬇️ Download PDF
               </button>
            </div>
            
            {/* CONTENT AREA: Targeted by PDF generator */}
            <div id="resume-preview-content"> 
               <hr />
               <h3>{savedResume?.name || "Your Name"}</h3>
               <p className="email">{savedResume?.email || "your.email@example.com"}</p>
               <p className="summary">{savedResume?.summary || "Professional summary goes here..."}</p>

               <h4>Skills</h4>
               <ul className="skill-list">
                 {savedResume?.skills?.split(",").map((s, i) => (
                   <li key={i}>{s.trim()}</li>
                 ))}
               </ul>

               <h4>Projects</h4>
               <ul>
                 {savedResume?.projects?.map((p, i) => (
                   <li key={i}>
                     <b>{p.title}</b> — {p.description}{" "}
                     {p.link && (
                       <a href={p.link} target="_blank" rel="noopener noreferrer">
                         🔗
                       </a>
                     )}
                   </li>
                 ))}
               </ul>

               <h4>Courses</h4>
               <ul>
                 {savedResume?.courses?.map((c, i) => (
                   <li key={i}>
                     {c.name} – {c.platform} ({c.completionDate})
                   </li>
                 ))}
               </ul>

               <h4>Achievements</h4>
               <ul>
                 {savedResume?.achievements?.map((a, i) => (
                   <li key={i}>
                     {a.title} ({a.date})
                   </li>
                 ))}
               </ul>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────
// Sub-components (Unchanged logic)
// ─────────────────────────────
function Section({ title, children }) {
  return (
    <div className="section">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function AddProjectForm({ onAdd }) {
  const [project, setProject] = useState({ title: "", description: "", link: "" });
  return (
    <div className="add-form">
      <input placeholder="Title" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} />
      <input placeholder="Description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} />
      <input placeholder="Link (Optional)" value={project.link} onChange={(e) => setProject({ ...project, link: e.target.value })} />
      <button
        onClick={() => {
          onAdd(project);
          setProject({ title: "", description: "", link: "" });
        }}
        disabled={!project.title}
      >
        Add
      </button>
    </div>
  );
}

function AddCourseForm({ onAdd }) {
  const [course, setCourse] = useState({ name: "", platform: "", completionDate: "" });
  return (
    <div className="add-form">
      <input placeholder="Course Name" value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} />
      <input placeholder="Platform" value={course.platform} onChange={(e) => setCourse({ ...course, platform: e.target.value })} />
      <input placeholder="Completion Date (e.g., 2023-05)" value={course.completionDate} onChange={(e) => setCourse({ ...course, completionDate: e.target.value })} />
      <button
        onClick={() => {
          onAdd(course);
          setCourse({ name: "", platform: "", completionDate: "" });
        }}
        disabled={!course.name}
      >
        Add
      </button>
    </div>
  );
}

function AddAchievementForm({ onAdd }) {
  const [achievement, setAchievement] = useState({ title: "", date: "" });
  return (
    <div className="add-form">
      <input placeholder="Title/Award" value={achievement.title} onChange={(e) => setAchievement({ ...achievement, title: e.target.value })} />
      <input placeholder="Date (e.g., 2024)" value={achievement.date} onChange={(e) => setAchievement({ ...achievement, date: e.target.value })} />
      <button
        onClick={() => {
          onAdd(achievement);
          setAchievement({ title: "", date: "" });
        }}
        disabled={!achievement.title}
      >
        Add
      </button>
    </div>
  );
}