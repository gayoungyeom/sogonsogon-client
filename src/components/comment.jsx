import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import deleteIcon from "../assets/svgs/delete.svg";
import dateformat from "../utils/dateformat";

const Comment = ({
  no,
  author,
  createDate,
  content,
  isMine,
  onClickDelete
}) => {
  return (
    <Container>
      <Wrap>
        <Author>{author}</Author>
        <Bar>|</Bar>
        <CreateDate>{dateformat(createDate)}</CreateDate>
        {isMine && <Icon onClick={onClickDelete} />}
      </Wrap>
      <Content>{content}</Content>
    </Container>
  );
};

Comment.prototype = {
  no: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isMine: PropTypes.bool.isRequired,
  onClickDelete: PropTypes.func.isRequired
};

Comment.defaultProps = {
  no: 0,
  author: ``,
  createDate: ``,
  content: ``,
  isMine: false,
  onClickDelete: () => {}
};

export default Comment;

const Container = styled.div`
  padding: 15px 0;
  background: #f8f9fa;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
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

const Icon = styled.button`
  padding: 0 15px;
  height: 15px;
  border: none;
  cursor: pointer;
  background: url(${deleteIcon}) center no-repeat;
`;

const Content = styled.div`
  font-size: 13px;
  padding-top: 10px;
  line-height: 15px;
`;
