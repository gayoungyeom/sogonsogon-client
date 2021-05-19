import React from "react";
import { Link } from "gatsby";

import PropTypes from "prop-types";
import styled from "styled-components";

const PostTitleWrap = styled.div`
  height: 45px;
  background: #f8f9fa;
  padding: 10px;
  padding-left: 15px;
  padding-top: 15px;
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const Svg = styled.span`
  margin-left: 8px;
`;

const More = styled(Link)`
  font-size: 11px;
  padding-right: 10px;
`;

const PostTitle = ({ title, svg, isMore }) => {
  return (
    <PostTitleWrap>
      <Title>
        {title}
        <Svg>
          <object type="image/svg+xml" aria-label="title" data={svg} />
        </Svg>
      </Title>
      {isMore && <More to="all">더보기 &gt;</More>}
    </PostTitleWrap>
  );
};

PostTitle.propTypes = {
  title: PropTypes.string,
  svg: PropTypes.string,
  isMore: PropTypes.bool
};

PostTitle.defaultProps = {
  title: "",
  svg: "",
  isMore: false
};

export default PostTitle;
