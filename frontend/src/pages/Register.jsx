// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert("Registration failed. Try again.");
//     }
//   };

//   return (
//     <div className="register-page">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
//         <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
//         <button type="submit">Register</button>
//       </form>
//       <p>Already have an account? <a href="/">Login here</a></p>

//     </div>
//   );
// }







import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      alert("Registration successful! Please login.");
      navigate("/"); // Redirect to login page after successful registration
    } catch (err) {
      console.error("Registration error:", err);
      const message = err?.response?.data?.message || err?.message || "Registration failed. Try again.";
      alert(message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="project-title">ResumeCraft Pro</h1> {/* Project Name */}
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p className="auth-switch-link">
          Already have an account? <a href="/">Login here</a>
        </p>
      </div>
    </div>
  );
}