import React, { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import { get } from "../utils/http";
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
  const allPosts = useSelector(({ board }) => board.allPosts);

  const PER_PAGE = 10;
  const [curPage, setCurPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [curType, setCurType] = useState("first");
  const [cookies] = useCookies(["token"]);

  const getNavNames = useCallback(() => {
    get(
      `/user/getName?region_bcode=${regionBcode}&sector_no=${sectorNo}`,
      data => {
        dispatch(userActions.setNavName(data));
      }
    );
  }, [regionBcode, sectorNo, dispatch]);

  const getPosts = useCallback(
    async (page, category) => {
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
    [PER_PAGE, dispatch, regionBcode, sectorNo]
  );

  useEffect(() => {
    if (cookies["token"]) {
      if (regionBcode && sectorNo) {
        getNavNames();
        getPosts(0, "region");
      }
    }
  }, [cookies, getNavNames, getPosts]);

  const paginationHandler = current => {
    setCurPage(current);
    if (curType === "first") getPosts(current - 1, "region");
    else getPosts(current - 1, "sector");
  };

  const regionClickHandler = useCallback(() => {
    setCurType("first");
    setCurPage(1);
    getPosts(0, "region");
  }, [getPosts]);

  const sectorClickHandler = useCallback(() => {
    setCurType("second");
    setCurPage(1);
    getPosts(0, "sector");
  }, [getPosts]);

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
