import React, { useState } from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Post from "../components/post";
import Nav from "../components/nav";
import Pagination from "../components/pagination";

import styled from "styled-components";

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

const PostTitle = styled.div`
  height: 10%;
  background: #f8f9fa;
  padding: 10px;
  padding-left: 15px;
  font-size: 15px;
  font-weight: bold;
`;

const PaginationWrap = styled.div`
  text-align: center;
  padding: 10px 0;
  padding: 0.625rem 0;
`;

const AllPage = ({ location }) => {
  const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const PER_PAGE = 10;
  const [curPage, setCurPage] = useState(1);
  const paginationHandler = current => {
    setCurPage(current);
  };

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
      <SEO title="All" />
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
          <PostTitle>전체 게시글 📋</PostTitle>
          <PostList>
            {testArr.map(() => (
              <Post
                title={`물어볼 때마다...`}
                author={`익명의 사나이`}
                createDate={`03.14`}
                like={1442}
                comment={70}
              />
            ))}
          </PostList>
        </ListContainer>
        <PaginationWrap>
          <Pagination
            current={curPage}
            total={50}
            pageSize={PER_PAGE}
            onChange={paginationHandler}
          />
        </PaginationWrap>
      </Container>
    </Layout>
  );
};

export default AllPage;
