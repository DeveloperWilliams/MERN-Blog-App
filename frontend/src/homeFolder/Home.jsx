import React from "react";
import { Link } from "react-router-dom";
import "./home.css"

//twill0 = L511X4FKR4CXU7X4HVNKJRH5

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="nav">
          <h4>
            Archy<em>Blog</em>
          </h4>
          <Link to="/signup">Signup Now</Link>
        </div>
        <div className="body">
          <img src="/blog.svg" alt="" />
        </div>
        <div className="lower">
          <p>The Home for Best Blog, <em>Signup Now!</em></p>
        </div>
      </div>
    </>
  );
};

export default Home;
