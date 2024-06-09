import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Forgot = () => {
  return (
    <>
      <div className="home">
        <div className="container">
          <form>
            <img src="./forgot.svg" alt="" srcset="" />
          </form>
          <form className="myform">
            <h3>
              Hi <em>👋</em>, <br /> Reset Password!
            </h3>
            <div>
              <input type="email" placeholder="Email Address" required />
              <div className="second-div">
                <button>Send</button>
                <p>
                   <Link to="/" color="blue">Login Instead</Link>
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
