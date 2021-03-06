import React, { useCallback, useEffect, useState } from "react";
import { Link, navigate } from "gatsby";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { deleteData, getData, postData, putData } from "../utils/http";
import * as boardActions from "../store/modules/board";
import * as userActions from "../store/modules/user";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Comment from "../components/comment";
import viewIcon from "../assets/svgs/view.svg";
import heartIcon from "../assets/svgs/heart.svg";
import commentIcon from "../assets/svgs/comment.svg";
import emptyHeartIcon from "../assets/svgs/emptyHeart.svg";
import flyIcon from "../assets/svgs/fly.svg";
import dateformat from "../utils/dateformat";

const DetailPage = ({ location }) => {
  const dispatch = useDispatch();
  const postNo = location.state.no;
  const regionBcode = useSelector(({ common }) => common.regionBcode);
  const sectorNo = useSelector(({ common }) => common.sectorNo);
  const navNames = useSelector(({ user }) => user.navNames);
  const post = useSelector(({ board }) => board.post);
  const comment = useSelector(({ board }) => board.comment);
  const comments = useSelector(({ board }) => board.comments);

  const PER_PAGE = 10;
  const [curPage, setCurPage] = useState(0);
  const [isMine, setIsMine] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [totalComment, setTotalComment] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [isLast, setIsLast] = useState(false);

  const getNavNames = useCallback(() => {
    getData(
      `/user/getName?region_bcode=${regionBcode}&sector_no=${sectorNo}`,
      data => {
        dispatch(userActions.setNavName(data));
      }
    );
  }, [regionBcode, sectorNo, dispatch]);

  const getPost = useCallback(() => {
    getData(`/board?board_no=${postNo}`, data => {
      dispatch(boardActions.setPost(data));
      setIsMine(data.is_mine);
      setIsLike(data.is_like);
      setLikeCnt(data.likes);
      setTotalComment(data.comments);
    });
  }, [postNo, dispatch]);

  const getComments = useCallback(() => {
    getData(
      `/comment/list/all?count=${PER_PAGE}&page=${curPage}&board_no=${postNo}`,
      data => {
        setTotalComment(data.total_count);
        if (curPage === 0) {
          dispatch(boardActions.setComments(data.results));
        } else {
          dispatch(boardActions.setNextComments(data.results));
        }
      }
    );
  }, [PER_PAGE, curPage, postNo, setTotalComment, dispatch]);

  const getOneComment = useCallback(() => {
    const page =
      totalComment % PER_PAGE === 0
        ? setCurPage(curPage => curPage + 1)
        : curPage;
    page &&
      getData(
        `/comment/list/all?count=${PER_PAGE}&page=${page}&board_no=${postNo}`,
        data => {
          setTotalComment(data.total_count);
          const idx = data.total_count - curPage * PER_PAGE - 1;
          dispatch(boardActions.setNextComments([data.results[idx]]));
        }
      );
  }, [
    totalComment,
    PER_PAGE,
    postNo,
    curPage,
    setCurPage,
    setTotalComment,
    dispatch
  ]);

  useEffect(() => {
    if (regionBcode && sectorNo) {
      getNavNames();
      getPost();
      getComments();
    }
  }, [regionBcode, sectorNo, getNavNames, getPost, getComments]);

  const onClickLike = useCallback(() => {
    if (isLike) {
      putData(`/board/like/up?board_no=${postNo}`, {}, data => {
        setIsLike(!isLike);
        setLikeCnt(likeCnt + 1);
      });
    } else {
      putData(`/board/like/down?board_no=${postNo}`, {}, data => {
        setIsLike(!isLike);
        setLikeCnt(likeCnt - 1);
      });
    }
  }, [postNo, isLike, likeCnt]);

  const paginationHandler = useCallback(() => {
    let curCnt = totalComment - curPage * 10;
    if (curCnt > PER_PAGE) {
      setCurPage(curPage => curPage + 1);
      curCnt -= 10;
    } else {
      alert(`?????? ???????????? ???????????? ????????????.`);
      setIsLast(true);
    }
  }, [curPage, totalComment, PER_PAGE, setIsLast]);

  const onChangeInput = useCallback(
    e => {
      dispatch(boardActions.setComment(e.target.value));
    },
    [dispatch]
  );

  const createComment = useCallback(() => {
    if (comment === "") {
      alert("????????? ????????? ?????????.");
    } else {
      postData(`/comment`, { board_no: postNo, text: comment }, data => {
        alert(`${data.message}`);
        dispatch(boardActions.setComment(""));
        if (curPage === 0) getComments();
        else getOneComment();
        setIsLast(false);
      });
    }
  }, [
    postNo,
    comment,
    curPage,
    dispatch,
    getComments,
    getOneComment,
    setIsLast
  ]);

  const onKeyPress = e => {
    if (e.key === "Enter") createComment();
  };

  const deletePost = useCallback(() => {
    if (window.confirm(`?????? ???????????? ?????????????????????????`)) {
      deleteData(`/board?board_no=${postNo}`, {}, data => {
        alert(`${data.message}`);
        navigate("/all/region");
      });
    }
  }, [postNo]);

  const deleteComment = useCallback(
    idx => {
      if (window.confirm(`?????? ????????? ?????????????????????????`)) {
        const deletedNo = comments[idx].no;
        deleteData(`/comment?comment_no=${deletedNo}`, {}, data => {
          dispatch(boardActions.deleteComment(idx));
          setTotalComment(totalComment => totalComment - 1);
        });
      }
    },
    [comments, dispatch]
  );

  return (
    <Layout isBack={true}>
      <SEO title="PostDetail" />
      <Container>
        <Post>
          <CurType>
            {post.category === "region" ? "??????" : "??????"} |{" "}
            {post.category === "region"
              ? navNames.r2_bname + " " + navNames.r3_bname
              : navNames.sector_name}
          </CurType>
          <PostTitle>{post.board_title}</PostTitle>
          <ABDContainer>
            <ABDWrap>
              <Author>{post.nickname}</Author>
              <Bar>|</Bar>
              <Date>{dateformat(post.create_datetime)}</Date>
            </ABDWrap>
            {isMine && (
              <EditDeleteWrap>
                <Edit to="/edit" state={{ postNo }}>
                  ??????
                </Edit>
                <Delete onClick={deletePost}>??????</Delete>
              </EditDeleteWrap>
            )}
          </ABDContainer>
          <Content>{post.board_content}</Content>
          <CommuContainer>
            <CommuRight>
              <ViewImg>
                <SVG>
                  <object
                    type="image/svg+xml"
                    aria-label="view"
                    data={viewIcon}
                  />
                </SVG>
                {post.views}
              </ViewImg>
              <LikeImg>
                <SVG>
                  <object
                    type="image/svg+xml"
                    aria-label="like"
                    data={heartIcon}
                  />
                </SVG>
                {likeCnt}
              </LikeImg>
              <CommentImg>
                <SVG>
                  <object
                    type="image/svg+xml"
                    aria-label="comment"
                    data={commentIcon}
                  />
                </SVG>
                {totalComment}
              </CommentImg>
            </CommuRight>
            <LikeBtn isLike={isLike} onClick={onClickLike}>
              ??? ??????
            </LikeBtn>
          </CommuContainer>
        </Post>
        <CommentContainer>
          <CommentCnt>?????? {totalComment}</CommentCnt>
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
        {totalComment > PER_PAGE && (
          <MoreWrap>
            <More isLast={isLast} onClick={paginationHandler} disabled={isLast}>
              ?????????
            </More>
          </MoreWrap>
        )}
      </Container>
      <InputContainer>
        <InputWrap>
          <Input
            placeholder={`????????? ???????????????.`}
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
  font-size: 13px;
  font-weight: bold;
  color: #5c3ec2;
  padding-right: 10px;
`;

const Delete = styled.button`
  font-size: 13px;
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
  font-weight: bold;
  color: ${props => (props.isLike ? "#5c3ec2" : "#fff")};
  background: ${props => (props.isLike ? "#fff" : "#5c3ec2")};
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
  width: 100%;
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
