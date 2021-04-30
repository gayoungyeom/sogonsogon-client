import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Post from "../components/post";
import Nav from "../components/nav";
import crownIcon from "../assets/svgs/crown.svg";
import boardIcon from "../assets/svgs/board.svg";

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

const PostTitle = styled.div`
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

const IndexPage = ({ location }) => {
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
          <PostTitleWrap>
            <PostTitle>
              베스트 게시글
              <Svg>
                <object type="image/svg+xml" data={crownIcon} />
              </Svg>
            </PostTitle>
          </PostTitleWrap>
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
          <PostTitleWrap>
            <PostTitle>
              전체 게시글
              <Svg>
                <object type="image/svg+xml" data={boardIcon} />
              </Svg>
            </PostTitle>
            <More to="/all">더보기 &gt;</More>
          </PostTitleWrap>
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
