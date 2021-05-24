import * as React from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";

const Loading = ({ type, color, height, width }) => {
  return (
    <ReactLoading type={type} color={color} height={height} width={width} />
  );
};

Loading.prototype = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
};

Loading.defaultProps = {
  type: ``,
  color: ``,
  height: ``,
  width: ``
};

export default Loading;
