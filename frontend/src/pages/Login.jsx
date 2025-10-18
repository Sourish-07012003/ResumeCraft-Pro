// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       const message = err?.response?.data?.message || err?.message || "Login failed. Please try again.";
//       alert(message);
//     }
//   };

//   return (
//     <div className="login-page">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
//         <button type="submit">Login</button>
//       </form>
//       <p>Don't have an account? <a href="/register">Register here</a></p>

//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      const message = err?.response?.data?.message || err?.message || "Login failed. Please try again.";
      alert(message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="project-title">ResumeCraft Pro</h1> {/* Project Name */}
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p className="auth-switch-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}