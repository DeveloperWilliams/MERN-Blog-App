import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      if (response.data.message === "Email Not Found") {
        alert("Email Not Found");
      } else if (response.data.message === "Password Does Not Match") {
        alert("Incorrect Password");
      } else if (response.data.message === "Login Successful") {
        navigate("/home");
      } else if (response.data.message === "Email Not Verified") {
        navigate(response.data.redirect);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="home">
      <div className="container">
        <form>
          <img src="./login-pana.svg" alt="Login" srcSet="" />
        </form>
        <form className="myform" onSubmit={handleSubmit}>
          <h3>
            Hi <em>👋</em>, Welcome Back!
          </h3>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mydiv">
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link to="/reset-password">Reset Password</Link>
            </div>
            <div className="second-div">
              <button type="submit">Login</button>
              <p>
                Not Having Account? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
