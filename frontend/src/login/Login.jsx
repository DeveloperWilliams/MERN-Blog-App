import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="home">
        <div className="container">
          <form>
            <img src="./login-pana.svg" alt="" srcset="" />
          </form>
          <form className="myform">
            <h3>
              Hi <em>👋</em>, Welcome Back!
            </h3>
            <div>
              <input type="email" placeholder="Email Address" required/>
              <div className="mydiv">
                <input type="password" placeholder="Password" required/>
                <Link to="/reset-password">Reset Passowrd</Link>
              </div>
              <div className="second-div">
                <button>Login</button>
                <p>Not Having Account <Link to='/signup'>Signup</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
