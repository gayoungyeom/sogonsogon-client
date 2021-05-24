import React, { useCallback, useEffect, useState } from "react";
import { navigate } from "gatsby";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getData } from "../../utils/http";
import * as userActions from "../../store/modules/user";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Nav from "../../components/nav";
import Post from "../../components/post";
import Pagination from "../../components/pagination";

const MyPostPage = ({ location }) => {
  const dispatch = useDispatch();
  const posts = useSelector(({ user }) => user.myPosts);

  const PER_PAGE = 10;
  const [curPage, setCurPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  const getMyPosts = useCallback(
    page => {
      getData(`/board/list/mine?page=${page}&count=${PER_PAGE}`, data => {
        dispatch(userActions.setMyPosts(data.results));
        setTotalCnt(data.total_count);
      });
    },
    [PER_PAGE, dispatch]
  );

  useEffect(() => {
    getMyPosts(0);
  }, [getMyPosts]);

  const editClickHandler = () => {
    navigate("/my/info");
  };

  const paginationHandler = current => {
    setCurPage(current);
    getMyPosts(current - 1);
  };

  return (
    <Layout isBack={true}>
      <SEO title="MY" />
      <Container>
        <Nav
          firstSubCategory="내 정보 수정"
          secondSubCategory="내 활동 내역"
          firstHandler={editClickHandler}
          curType={"second"}
        />

        <SubTitle>내가 쓴 게시글</SubTitle>
        {posts &&
          posts.map(post => (
            <Post
              key={post.board_no}
              no={post.board_no}
              title={post.board_title}
              author={post.nickname}
              createDate={post.create_datetime}
              like={post.likes}
              comment={post.comments}
            />
          ))}

        <PaginationWrap>
          <Pagination
            current={curPage}
            total={totalCnt}
            pageSize={PER_PAGE}
            onChange={paginationHandler}
          />
        </PaginationWrap>
      </Container>
    </Layout>
  );
};

export default MyPostPage;

const Container = styled.div``;

const SubTitle = styled.div`
  padding: 12px;
  font-size: 15px;
  font-weight: bold;
  background: #f8f9fa;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
`;

const PaginationWrap = styled.div`
  text-align: center;
  padding: 10px 0;
  padding: 0.625rem 0;
`;
