import React, { useCallback, useEffect, useState } from "react";
import { Link, navigate } from "gatsby";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { deleteData, get, postData, put } from "../utils/http";
import * as boardActions from "../store/modules/board";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Comment from "../components/comment";
import viewIcon from "../assets/svgs/view.svg";
import heartIcon from "../assets/svgs/heart.svg";
import commentIcon from "../assets/svgs/comment.svg";
import emptyHeartIcon from "../assets/svgs/emptyHeart.svg";
import flyIcon from "../assets/svgs/fly.svg";

const DetailPage = ({ location }) => {
  const dispatch = useDispatch();
  const postNo = location.state.no;
  const post = useSelector(({ board }) => board.post);
  const comment = useSelector(({ board }) => board.comment);
  const comments = useSelector(({ board }) => board.comments);

  const PER_PAGE = 10;
  const [curPage, setCurPage] = useState(0);
  const [isMine, setIsMine] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [totalComment, setTotalComment] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const getPost = useCallback(() => {
    get(`/board?board_no=${postNo}`, data => {
      dispatch(boardActions.setPost(data));
      setIsMine(data.is_mine);
      setLikeCnt(data.likes);
    });
  }, [postNo, isMine, setIsLike, dispatch]);

  const getComments = useCallback(() => {
    get(
      `/comment/list/all?count=${PER_PAGE}&page=${curPage}&board_no=${postNo}`,
      data => {
        setTotalComment(data.total_count);
        curPage === 0
          ? dispatch(boardActions.setComments(data.results))
          : dispatch(boardActions.setNextComments(data.results));
      }
    );
  }, [PER_PAGE, curPage, postNo, dispatch]);

  useEffect(() => {
    getPost();
    getComments();
  }, [getPost, getComments]);

  const onClickLike = useCallback(() => {
    if (isLike) {
      put(`/board/like/down?board_no=${postNo}`, {}, data => {
        setIsLike(!isLike);
        setLikeCnt(likeCnt - 1);
      });
    } else {
      put(`/board/like/up?board_no=${postNo}`, {}, data => {
        setIsLike(!isLike);
        setLikeCnt(likeCnt + 1);
      });
    }
  }, [postNo, isLike, likeCnt]);

  const paginationHandler = useCallback(() => {
    setCurPage(curPage => curPage + 1);
    const curCnt = parseInt(totalComment / 10);
    if (curPage >= curCnt) {
      alert(`마지막 댓글 입니다.`);
      setIsLast(true);
    }
  }, [curPage, totalComment]);

  const onChangeInput = useCallback(e => {
    dispatch(boardActions.setComment(e.target.value));
  }, []);

  const createComment = useCallback(() => {
    postData(`/comment`, { board_no: postNo, text: comment }, data => {
      alert(`${data.message}`);
      dispatch(boardActions.setComment(""));
      getComments();
    });
  }, [postNo, comment]);

  const onKeyPress = e => {
    if (e.key === "Enter") createComment();
  };

  const deletePost = useCallback(() => {
    if (window.confirm(`해당 게시글을 삭제하시겠습니까?`)) {
      deleteData(`/board?board_no=${postNo}`, {}, data => {
        alert(`${data.message}`);
        navigate("/all");
      });
    }
  }, [postNo]);

  const deleteComment = useCallback(
    idx => {
      if (window.confirm(`해당 댓글을 삭제하시겠습니까?`)) {
        const deletedNo = comments[idx].no;
        deleteData(`/comment?comment_no=${deletedNo}`, {}, data => {
          dispatch(boardActions.deleteComment(idx));
        });
      }
    },
    [comments]
  );

  return (
    <Layout isBack={true}>
      <SEO title="PostDetail" />
      <Container>
        <Post>
          <CurType>지역 | 서초구 방배동</CurType>
          <PostTitle>{post.board_title}</PostTitle>
          <ABDContainer>
            <ABDWrap>
              <Author>익명의 사나이</Author>
              <Bar>|</Bar>
              <Date>{post.create_datetime}</Date>
            </ABDWrap>
            {isMine && (
              <EditDeleteWrap>
                <Edit to="/edit" state={{ postNo }}>
                  수정
                </Edit>
                <Delete onClick={deletePost}>삭제</Delete>
              </EditDeleteWrap>
            )}
          </ABDContainer>
          <Content>{post.board_content}</Content>
          <CommuContainer>
            <CommuRight>
              <ViewImg>
                <SVG>
                  <object type="image/svg+xml" data={viewIcon} />
                </SVG>
                {post.views}
              </ViewImg>
              <LikeImg>
                <SVG>
                  <object type="image/svg+xml" data={heartIcon} />
                </SVG>
                {likeCnt}
              </LikeImg>
              <CommentImg>
                <SVG>
                  <object type="image/svg+xml" data={commentIcon} />
                </SVG>
                {post.comments}
              </CommentImg>
            </CommuRight>
            <LikeBtn isLike={isLike} onClick={onClickLike}>
              ♡ 공감
            </LikeBtn>
          </CommuContainer>
        </Post>
        <CommentContainer>
          <CommentCnt>댓글 70</CommentCnt>
          {comments &&
            comments.map((comment, idx) => (
              <Comment
                key={comment.no}
                no={comment.no}
                author={comment.nickname}
                createDate={comment.create_datetime}
                content={comment.text}
                isMine={comment.is_mine}
                onClickDelete={() => deleteComment(idx)}
              />
            ))}
        </CommentContainer>
        <MoreWrap>
          <More isLast={isLast} onClick={paginationHandler} disabled={isLast}>
            더보기
          </More>
        </MoreWrap>
      </Container>
      <InputContainer>
        <InputWrap>
          <Input
            placeholder={`댓글을 입력하세요.`}
            value={comment}
            onChange={onChangeInput}
            onKeyPress={onKeyPress}
          />
          <InputBtn onClick={createComment} />
        </InputWrap>
      </InputContainer>
    </Layout>
  );
};

export default DetailPage;

const Container = styled.div`
  background: #f8f9fa;
  padding: 10px;
  margin-bottom: 60px;
`;

const Post = styled.div``;

const CurType = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #5c3ec2;
`;

const PostTitle = styled.div`
  padding: 12.5px 0;
  font-size: 15px;
  font-weight: bold;
  line-height: 18px;
`;

const ABDContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const ABDWrap = styled.div`
  display: flex;
`;

const EditDeleteWrap = styled.div`
  display: flex;
  padding-right: 10px;
`;

const Edit = styled(Link)`
  font-size: 11px;
  font-weight: bold;
  color: #5c3ec2;
  padding-right: 10px;
`;

const Delete = styled.button`
  font-size: 11px;
  font-weight: bold;
  color: #5c3ec2;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

const Author = styled.span`
  font-size: 11px;
`;

const Bar = styled.span`
  font-size: 11px;
  padding: 0 10px;
`;

const Date = styled.span`
  font-size: 11px;
`;

const Content = styled.div`
  font-size: 14px;
  padding: 20px 0;
  line-height: 18px;
  border-top: 2px solid #fff;
`;

const CommuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  font-size: 11px;
  padding: 15px 0;
  padding-right: 5px;
`;

const CommuRight = styled.span`
  align-self: center;
  color: #5c3ec2;
`;

const ViewImg = styled.span``;

const LikeImg = styled.span`
  padding: 0 10px;
`;

const CommentImg = styled.span``;

const LikeBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 26px;
  color: ${props => (props.isLike ? "#fff" : "#5c3ec2")};
  background: ${props => (props.isLike ? "#5c3ec2" : "#fff")};
  /* background: url(${emptyHeartIcon}) left no-repeat; */
  border: 1px solid #5c3ec2;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`;

const CommentContainer = styled.div``;

const CommentCnt = styled.div`
  font-size: 13px;
  font-weight: bold;
  border-top: 2px solid #fff;
  padding: 10px 0;
`;

const MoreWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const More = styled.button`
  /* width: 290px; */
  width: 90%;
  height: 45px;
  border: 2px solid #dededf;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
  color: #212529;
  background: #fff;
  margin: 0 auto;
  outline: none;
  cursor: ${props => (props.isLast ? "not-allowed" : "pointer")};
  &:hover {
    border: 2px solid #5c3ec2;
    color: #5c3ec2;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 2px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  border: 2px solid #ebebeb;
  box-shadow: 1px 1px 1px 1px gray;
  background: #fff;
`;

const Input = styled.input`
  width: 90%;
  height: 45px;
  font-size: 12px;
  padding: 25px;
  border: none;
  outline: none;
`;

const InputBtn = styled.button`
  width: 10%;
  height: 45px;
  border: none;
  cursor: pointer;
  outline: none;
  background: url(${flyIcon}) center no-repeat;
  font-weight: bold;
`;

const SVG = styled.span`
  padding: 3px;
`;
