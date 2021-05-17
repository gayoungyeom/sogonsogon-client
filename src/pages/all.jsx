import React, { useCallback, useEffect, useState } from "react";
import { Link } from "gatsby";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { get, post } from "../utils/http";

import * as boardActions from "../store/modules/board";
import * as userActions from "../store/modules/user";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Post from "../components/post";
import Nav from "../components/nav";
import Pagination from "../components/pagination";
import PostTitle from "../components/postTitle";
import boardIcon from "../assets/svgs/board.svg";

const AllPage = ({ location }) => {
  const dispatch = useDispatch();

  const regionBcode = useSelector(({ common }) => common.regionBcode);
  const sectorNo = useSelector(({ common }) => common.sectorNo);

  const navNames = useSelector(({ user }) => user.navNames);
  const getNavNames = useCallback(() => {
    get(
      `/user/getName?region_bcode=${regionBcode}&sector_no=${sectorNo}`,
      data => {
        console.log(data);
        dispatch(userActions.setNavName(data));
      }
    );
  }, [regionBcode, sectorNo, dispatch]);

  const allPosts = useSelector(({ board }) => board.allPosts);

  const PER_PAGE = 10;
  const [curPage, setCurPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  const paginationHandler = current => {
    setCurPage(current);
    if (curType === "first") getPosts(current - 1, "region");
    else getPosts(current - 1, "sector");
  };

  useEffect(() => {
    getPosts(0, "region");
    getNavNames();
  }, [getPosts, getNavNames]);

  const [curType, setCurType] = useState("first");

  const getPosts = useCallback(
    async (page, category) => {
      //새로고침 했을 때 regionBcode랑 sectorNo가 날라감, 새로 받는 속도보다 useEffect가 먼저 실행됨....
      const categoryNo = category === "region" ? regionBcode : sectorNo;
      console.log(category, categoryNo);
      get(
        `/board/list/all?count=${PER_PAGE}&page=${page}&category=${category}&category_no=${categoryNo}`,
        data => {
          dispatch(boardActions.setAllPosts(data.results));
          setTotalCnt(data.total_count);
        }
      );
    },
    [PER_PAGE, curType]
  );

  const regionClickHandler = useCallback(() => {
    setCurType("first");
    setCurPage(1);
    getPosts(0, "region");
  }, [curType, curPage]);

  const sectorClickHandler = useCallback(() => {
    setCurType("second");
    setCurPage(1);
    getPosts(0, "sector");
  }, [curType, curPage]);

  return (
    <Layout isBack={true}>
      <SEO title="All" />
      <Container>
        <Ads>광고</Ads>
        <Nav
          firstCategory="내 지역"
          firstSubCategory={`${navNames.r2_bname} ${navNames.r3_bname}`}
          secondCategory="내 업종"
          secondSubCategory={navNames.sector_name}
          firstHandler={regionClickHandler}
          secondHandler={sectorClickHandler}
          curType={curType}
        />

        <ListContainer>
          <PostTitle title="전체 게시글" svg={boardIcon} />
          <PostList>
            {allPosts.map(post => (
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
          </PostList>
        </ListContainer>
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

export default AllPage;

const Container = styled.div`
  margin-top: 0;
  padding: 0;
`;

const Ads = styled.div`
  height: 156px;
  background: #bdc3c7;
`;

const ListContainer = styled.div``;

const PostList = styled.div``;

const PaginationWrap = styled.div`
  text-align: center;
  padding: 10px 0;
  padding: 0.625rem 0;
`;
