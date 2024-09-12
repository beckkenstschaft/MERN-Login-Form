import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const containerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/users/login", {
        username,
        password,
      });

      if (res.data) {
        window.location.href = "https://ats-resume-tracker-qboo.onrender.com/index.html";
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseMove = (event) => {
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const containerCenterY = containerRect.top + containerRect.height / 2;

      const offsetX = event.clientX - containerCenterX;
      const offsetY = event.clientY - containerCenterY;

      const maxRotation = 20; 
      const rotateY = (offsetX / containerRect.width) * maxRotation;
      const rotateX = -(offsetY / containerRect.height) * maxRotation;

      container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transition = "transform 0.6s ease-out";
      container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <h1><span className="brand-logo">hard</span>Coded</h1>
      <p>Easing your job search journey.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-fields"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-fields"
            placeholder="Password"
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="Signup-button">Login</button>
        <p className="form-copyright">Copyright © 2024 hardCoded v1.1.0</p>
      </form>
    </div>
  );
};

export default Login;
