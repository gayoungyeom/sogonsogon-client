import * as React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  height: 80px;
  padding: 15px;
  background: #f8f9fa;
  border: 2px solid #fff;
`;

const Title = styled.div`
  font-size: 14px;
`;

const Rank = styled.span`
  font-size: 16px;
  color: #5c3ec2;
  padding-right: 5px;
`;

const PostSub = styled.div`
  font-size: 11px;
  padding-top: 10px;
`;

const Author = styled.span``;

const Bar = styled.span`
  padding: 0 5px;
`;

const CreateDate = styled.span``;

const Right = styled.span`
  display: flex;
  justify-content: flex-end;
`;

const Span = styled.span``;

const Emo = styled.span`
  padding: 0 5px;
  color: #5c3ec2;
`;

//Link로 넘길 때 post_id 넣어줘야 하니까 props로 postId 넣어주기
const Post = ({ title, author, createDate, like, comment, rank }) => {
  return (
    <Link to="/detail">
      <Container>
        <Title>
          {rank ? <Rank>{rank}</Rank> : null}
          {title}
        </Title>
        <PostSub>
          <Author>{author}</Author>
          <Bar>|</Bar>
          <CreateDate>{createDate}</CreateDate>
          <Right>
            <Span>
              <Emo>❤</Emo>
              {like}
              <Emo>💬</Emo>
              {comment}
            </Span>
          </Right>
        </PostSub>
      </Container>
    </Link>
  );
};

Post.prototype = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
  like: PropTypes.number.isRequired,
  comment: PropTypes.number.isRequired,
  rank: PropTypes.number
};

Post.defaultProps = {
  title: ``,
  author: ``,
  createDate: ``,
  like: 0,
  comment: 0,
  rank: 0
};

export default Post;
