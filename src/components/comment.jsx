import * as React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  padding: 15px 0;
  background: #f8f9fa;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
`;

const Author = styled.span`
  font-size: 12px;
`;

const Bar = styled.span`
  font-size: 10px;
  padding: 0 5px;
`;

const CreateDate = styled.span`
  font-size: 10px;
`;

const Content = styled.div`
  font-size: 13px;
  padding-top: 10px;
  line-height: 15px;
`;

//props로 commentId 넣어주기
const Comment = ({ author, createDate, content }) => {
  return (
    <Container>
      <Author>{author}</Author>
      <Bar>|</Bar>
      <CreateDate>{createDate}</CreateDate>
      <Content>{content}</Content>
    </Container>
  );
};

Comment.prototype = {
  author: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

Comment.defaultProps = {
  author: ``,
  createDate: ``,
  content: ``
};

export default Comment;
