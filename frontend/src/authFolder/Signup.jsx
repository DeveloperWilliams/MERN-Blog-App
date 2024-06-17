import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className="home">
        <div className="container">
          <form>
            <img src="./signup.svg" alt="" srcset="" />
          </form>
          <form className="myform">
            <h3>
              Hi <em>👋</em>, Welcome!
            </h3>
            <div>
              <input type="email" placeholder="Email Address" required />
              <div className="mydiv">
                <input type="password" placeholder="New Password" required />
              </div>
              <div className="mydiv">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div className="second-div">
                <button>Signup</button>
                <p>
                  Already Having Account <Link to="/">Login</Link>
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
