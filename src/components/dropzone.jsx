import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const MyDropzone = ({ text }) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>{text}</p>}
    </div>
  );
};

export default MyDropzone;
