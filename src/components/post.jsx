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
  padding: 0 6px;
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
              <Emo>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10.837"
                  height="9.483"
                  viewBox="0 0 10.837 9.483"
                >
                  <path
                    id="heart"
                    d="M9.773,32.615a2.894,2.894,0,0,0-3.95.288l-.417.43L4.99,32.9a2.894,2.894,0,0,0-3.95-.288,3.039,3.039,0,0,0-.21,4.4l4.1,4.229a.664.664,0,0,0,.959,0l4.1-4.229A3.037,3.037,0,0,0,9.773,32.615Z"
                    transform="translate(0.012 -31.967)"
                    fill="#5c3ec2"
                  />
                </svg>
              </Emo>
              {like}
              <Emo>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.158"
                  height="9.763"
                  viewBox="0 0 11.158 9.763"
                >
                  <path
                    id="comment-dots"
                    d="M5.579,32C2.5,32,0,34.029,0,36.533a4.023,4.023,0,0,0,1.242,2.848A5.544,5.544,0,0,1,.048,41.469a.173.173,0,0,0-.033.19.171.171,0,0,0,.159.1,4.984,4.984,0,0,0,3.064-1.12,6.646,6.646,0,0,0,2.34.423c3.081,0,5.579-2.029,5.579-4.533S8.66,32,5.579,32ZM2.789,37.23a.7.7,0,1,1,.7-.7A.7.7,0,0,1,2.789,37.23Zm2.789,0a.7.7,0,1,1,.7-.7A.7.7,0,0,1,5.579,37.23Zm2.789,0a.7.7,0,1,1,.7-.7A.7.7,0,0,1,8.368,37.23Z"
                    transform="translate(0 -32)"
                    fill="#5c3ec2"
                  />
                </svg>
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
