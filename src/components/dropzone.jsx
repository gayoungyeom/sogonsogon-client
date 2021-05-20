import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";

import * as userActions from "../store/modules/user";

const MyDropzone = ({ text }) => {
  const dispatch = useDispatch();
  const [isUpload, setIsUpload] = useState(false);
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];
      dispatch(userActions.setInput({ key: "img", value: file }));
      setIsUpload(true);
      setFileName(file.name);
    },
    [dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>{isUpload ? fileName : text}</p>
    </div>
  );
};

export default MyDropzone;
