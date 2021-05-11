import React, { useCallback, useEffect, useState } from "react";
import { Link } from "gatsby";

import styled from "styled-components";
import { useDispatch } from "react-redux";

import * as commonActions from "../store/modules/common";
import { get } from "../utils/http";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Post from "../components/post";
import Nav from "../components/nav";
import crownIcon from "../assets/svgs/crown.svg";
import boardIcon from "../assets/svgs/board.svg";
import PostTitle from "../components/postTitle";

const Container = styled.div`
  margin-top: 0;
  padding: 0;
`;

const Ads = styled.div`
  height: 156px;
  background: #bdc3c7;
`;

const ListContainer = styled.div`
  /* height: 442px; */
`;

const PostList = styled.div``;

const IndexPage = ({ location }) => {
  // const dispatch = useDispatch();
  // const setCurPath = useCallback(
  //   () => dispatch(commonActions.getPath(location.pathname)),
  //   [dispatch]
  // );

  const getBestPosts = () =>
    get("/", () => {
      console.log("getposts");
    });

  useEffect(() => {
    // setCurPath(location.pathname);
    getBestPosts();
  }, []);

  const [curType, setCurType] = useState("first");

  const regionClickHandler = () => {
    console.log("region");
    setCurType("first");
  };

  const businessClickHandler = () => {
    console.log("business");
    setCurType("second");
  };

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <Ads>광고</Ads>

        <Nav
          firstCategory={`내 지역`}
          firstSubCategory={`서초구 방배동`}
          secondCategory={`내 업종`}
          secondSubCategory={`외식업`}
          firstHandler={regionClickHandler}
          secondHandler={businessClickHandler}
          curType={curType}
        />

        <ListContainer>
          <PostTitle title="베스트 게시글" svg={crownIcon} />
          <PostList>
            <Post
              title={`물어볼 때마다 물어볼 때마다 물어볼 때마다 물...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
              rank={1}
            />
            <Post
              title={`진상 손님...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
              rank={2}
            />
            <Post
              title={`옆에 싱싱마트...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
              rank={3}
            />
            <Post
              title={`방배동 먹자...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
              rank={4}
            />
            <Post
              title={`오늘따라...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
              rank={5}
            />
          </PostList>
        </ListContainer>
        <ListContainer>
          <PostTitle title="전체 게시글" svg={boardIcon} isMore={true} />
          <PostList>
            <Post
              title={`물어볼 때마다...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
            />
            <Post
              title={`진상 손님...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
            />
            <Post
              title={`옆에 싱싱마트...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
            />
            <Post
              title={`방배동 먹자...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
            />
            <Post
              title={`오늘따라...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
            />
          </PostList>
        </ListContainer>
      </Container>
    </Layout>
  );
};

export default IndexPage;
