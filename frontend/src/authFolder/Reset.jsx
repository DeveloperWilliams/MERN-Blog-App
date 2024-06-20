import React, { useState } from "react";
import "../App.css";
import { useParams, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/auth/reset/${token}`,
        {
          password,
          confirmedPassword,
        }
      );

      if (response.data.message === "Password Updated") {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <>
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
            <img src="./forgot.svg" alt="" srcset="" />
          </form>
          <form className="myform" onSubmit={handleSubmit}>
            <h3>
              Hi <em>👋</em>, Welcome!
            </h3>
            <div>
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
                <button type="submit">Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
