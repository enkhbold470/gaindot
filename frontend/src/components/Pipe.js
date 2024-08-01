import React from "react";

const Pipe = ({ top, left, height }) => {
  const style = {
    position: "absolute",
    top,
    left,
    width: "50px",
    height,
    backgroundColor: "#552BBF",
    borderRadius: "10px",
  };

  return <div style={style}></div>;
};

export default Pipe;
