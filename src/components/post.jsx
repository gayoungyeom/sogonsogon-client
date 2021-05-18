import * as React from "react";
import { Link } from "gatsby";

import PropTypes from "prop-types";
import styled from "styled-components";

import heartIcon from "../assets/svgs/heart.svg";
import commentIcon from "../assets/svgs/comment.svg";

//Link로 넘길 때 post_id 넣어줘야 하니까 props로 postId 넣어주기
const Post = ({ no, title, author, createDate, like, comment, rank }) => {
  return (
    <Link to="/detail" state={{ no }}>
      <Container>
        <Title>
          {rank ? <Rank>{rank}</Rank> : null}
          {title}
        </Title>
        <PostSub>
          <Left>
            <Author>{author}</Author>
            <Bar>|</Bar>
            <CreateDate>{createDate}</CreateDate>
          </Left>
          <Right>
            <Span>
              <Emo>
                <object type="image/svg+xml" data={heartIcon} />
              </Emo>
              {like}
              <Emo>
                <object type="image/svg+xml" data={commentIcon} />
              </Emo>
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
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  padding-top: 20px;
`;

const Left = styled.span``;

const Author = styled.span``;

const Bar = styled.span`
  padding: 0 5px;
`;

const CreateDate = styled.span``;

const Right = styled.span``;

const Span = styled.span``;

const Emo = styled.span`
  padding: 0 6px;
  /* color: #5c3ec2; */
`;
