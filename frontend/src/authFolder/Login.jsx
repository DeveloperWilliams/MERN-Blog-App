import React, { useState } from "react";
import "../App.css";
import './auth.css'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (response.data.message === "Login Successful") {
        navigate("/home");
        toast.success("Login Succesfull")
      }
    } catch (error) {
      if (error.response) {
        const { message, redirect } = error.response.data;

        if (message === "Email Not Found") {
          toast.error("Email Not Found");
        } else if (message === "Password Does Not Match") {
          toast.error("Incorrect Password");
        } else if (message === "Email Not Verified") {
          navigate(redirect);
        } else {
          toast.error(message);
        }
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
      setEmail("")
      setPassword("")
    }
  };

  return (
    <div className="home">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="container">
        <form>
          <img src="./login-pana.svg" alt="Login" />
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
              <Link to="/forgot-password">Reset Password</Link>
            </div>
            <div className="second-div">
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
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
