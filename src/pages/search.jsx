import React, { useState } from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Post from "../components/post";
import Pagination from "../components/pagination";
import SearchIcon from "../components/searchIcon";
import back from "../assets/svgs/back.svg";

import styled from "styled-components";

const Container = styled.div`
  margin-top: 10px;
  padding: 0 5px;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: baseline;
  margin: 0 auto;
`;

const Back = styled(Link)`
  width: 30px;
  padding: 5px;
  display: flex;
  align-items: center;
  background: url(${back}) center no-repeat;
  @media screen and (min-width: 960px) {
    display: none;
  }
`;

const Img = styled.div`
  display: inline-block;
  width: 10%;
  height: 45px;
  border: none;
  padding-top: 2vh;
  text-align: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background: #f8f9fa;
`;

const Input = styled.input`
  width: 90%;
  height: 45px;
  font-size: 12px;
  background: #f8f9fa;
  border: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 10px;
  outline: none;
`;

const Search = styled.button`
  width: 80px;
  font-size: 14px;
  color: #fff;
  background: #5c3ec2;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const Content = styled.div`
  font-size: 14px;
  margin-top: 82px;
  text-align: center;
`;

const SVG = styled.div`
  margin-top: 18px;
  text-align: center;
`;

const PaginationWrap = styled.div`
  text-align: center;
  padding: 10px 0;
  padding: 0.625rem 0;
`;

const SearchPage = ({ location }) => {
  //검색 버튼을 오른쪽에 하나 둬야 할거 같은데????
  const [isSearched, setIsSearched] = useState(false);

  const PER_PAGE = 10;
  const [curPage, setCurPage] = useState(1);
  const paginationHandler = current => {
    setCurPage(current);
  };

  return (
    <Layout isShow={false}>
      <SEO title="Search" />
      <Container>
        <InputContainer>
          <Back to="/" />
          <Img>
            <SearchIcon
              width={`14.344`}
              height={`14.346`}
              viewBox={`0 0 14.344 14.346`}
              d={`M14.148,12.4,11.355,9.61a.672.672,0,0,0-.476-.2h-.457a5.825,5.825,0,1,0-1.009,1.009v.457a.672.672,0,0,0,.2.476L12.4,14.148a.67.67,0,0,0,.95,0l.793-.793A.676.676,0,0,0,14.148,12.4ZM5.827,9.414A3.586,3.586,0,1,1,9.414,5.827,3.584,3.584,0,0,1,5.827,9.414Z`}
              fill={`#212529`}
            />
          </Img>
          <Input placeholder={`제목을 입력하세요`} />
          <Search>검색</Search>
        </InputContainer>
        {!isSearched ? (
          <>
            <Content>게시판의 글을 검색하세요 </Content>
            <SVG>
              <SearchIcon
                width={`40.005`}
                height={`40.012`}
                viewBox={`0 0 40.005 40.012`}
                d={`M39.461,34.593,31.671,26.8a1.874,1.874,0,0,0-1.328-.547H29.069a16.246,16.246,0,1,0-2.813,2.813v1.274a1.874,1.874,0,0,0,.547,1.328l7.791,7.791a1.868,1.868,0,0,0,2.649,0l2.211-2.211A1.884,1.884,0,0,0,39.461,34.593ZM16.253,26.255a10,10,0,1,1,10-10A10,10,0,0,1,16.253,26.255Z`}
                fill={`#212529`}
                opacity={`0.358`}
              />
            </SVG>{" "}
          </>
        ) : (
          <>
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
            <PaginationWrap>
              <Pagination
                current={curPage}
                total={50}
                pageSize={PER_PAGE}
                onChange={paginationHandler}
              />
            </PaginationWrap>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default SearchPage;
