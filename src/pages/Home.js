import React from "react";

const Home = ({ setUser }) => {
  return (
    <div className="Home">
      Welcome!
      <button onClick={() => setUser(null)}>Logout </button>
    </div>
  );
};

export default Home;
