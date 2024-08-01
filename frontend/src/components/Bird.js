import React, { use } from "react";

const Bird = ({ position }) => {
  const style = {
    position: "absolute",
    top: position,
    left: "50px",
    width: "40px",
    height: "40px",
    userSelect: "none",
  };

  return <img src="/polkadot-new-dot-logo.svg" alt="Bird" style={style} />;
};

export default Bird;
