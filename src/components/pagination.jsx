import React from "react";
import PropTypes from "prop-types";
import Pagination from "rc-pagination";

import "rc-pagination/assets/index.css";

import "./pagination.css";

const PaginationComponent = ({ current, total, pageSize, onChange }) => {
  return (
    <Pagination
      defaultCurrent={1}
      current={current}
      total={total}
      pageSize={pageSize}
      prevIcon={`<`}
      nextIcon={`>`}
      onChange={onChange}
    />
  );
};

PaginationComponent.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func
};
PaginationComponent.defaultProps = {
  current: undefined,
  total: 0,
  pageSize: 10,
  onChange: () => {}
};

export default PaginationComponent;
