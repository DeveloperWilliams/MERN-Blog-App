import React from "react";
import "../App.css";
import "./auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/auth/forgot", {email});
      console.log(response.data.message)

      if (response.data.message === "Reset Link Sent") {
        alert("Reset Link Sent to Email");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="home">
        <div className="container">
          <form>
            <img src="./forgot.svg" alt="" srcset="" />
          </form>
          <form className="myform" onSubmit={handleSubmit}>
            <h3>
              Hi <em>👋</em>, <br /> Forgot Password!
            </h3>
            <div>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="second-div">
                <button type="submit" disabled={loading}>
                  {loading ? "Loading" : "Reset"}
                </button>
                <p>
                  <Link to="/" color="blue">
                    Login Instead
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgot;
