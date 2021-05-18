import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";

import * as userActions from "../store/modules/user";

const MyDropzone = ({ text }) => {
  const dispatch = useDispatch();

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    Object.assign(file, { preview: URL.createObjectURL(file) });
    dispatch(
      userActions.setInput({ key: "img", value: file.preview.slice(5) })
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
    multiple: false
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>{text}</p>
    </div>
  );
};

export default MyDropzone;
