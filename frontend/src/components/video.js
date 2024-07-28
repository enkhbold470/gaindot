import React from "react";

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center">
      <input
        ref={inputRef}
        className="flex justify-center"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {!source && <button onClick={handleChoose}>Choose</button>}
      {source && (
        <video
          className="flex justify-center"
          width="100%"
          height={height}
          controls
          src={source}
        />
      )}
      <div className="flex justify-center">{source || "Nothing selectd"}</div>
    </div>
  );
}
