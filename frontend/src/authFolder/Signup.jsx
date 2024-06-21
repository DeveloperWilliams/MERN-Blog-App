import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // useNavigate should be defined outside of handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        email,
        password,
        confirmedPassword,
      });
      if (response.data.message === "User Created") {
        toast.success("User Created Succesfully");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Use Strong Password" );
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
      setConfirmedPassword("");
    }
  };

  return (
    <>
      <div className="home">
        <ToastContainer
          position="top-center"
          autoClose={8000}
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
            <img src="./signup.svg" alt="Signup Illustration" />
          </form>
          <form className="myform" onSubmit={handleSubmit}>
            <h3>
              Hi <em>👋</em>, Welcome!
            </h3>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="mydiv">
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mydiv">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                />
              </div>
              <div className="second-div">
                <button type="submit" disabled={loading}>
                  {loading ? "Loading" : "Submit"}
                </button>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
