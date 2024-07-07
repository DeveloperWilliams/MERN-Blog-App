import React from "react";

const NotVerified = () => {
  return (
    <>
      <div
        className="home"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "cursive",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "black",
          }}
        >
          Email Not Verified 😞,
          <br /> <em style={{color: "rebeccapurple"}}>Please Verify Email First.</em>
        </p>
      </div>
    </>
  );
};

export default NotVerified;
