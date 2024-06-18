import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import './auth.css'

const Signup = () => {
  return (
    <>
      <div className="home">
        <div className="container">
          <form>
            <img src="./reset.svg" alt="" srcset="" />
          </form>
          <form className="myform">
            <h3>
              Hi <em>👋</em>, Welcome!
            </h3>
            <div>
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
                <button>Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
