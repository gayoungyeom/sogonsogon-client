import React, { useCallback, useEffect, useState } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import { get } from "../utils/http";
import * as boardActions from "../store/modules/board";
import * as userActions from "../store/modules/user";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Post from "../components/post";
import Nav from "../components/nav";
import PostTitle from "../components/postTitle";
import crownIcon from "../assets/svgs/crown.svg";
import boardIcon from "../assets/svgs/board.svg";
import ads from "../assets/img/ads.png";

const IndexPage = ({ location }) => {
  const dispatch = useDispatch();
  const regionBcode = useSelector(({ common }) => common.regionBcode);
  const sectorNo = useSelector(({ common }) => common.sectorNo);
  const navNames = useSelector(({ user }) => user.navNames);
  const bestPosts = useSelector(({ board }) => board.bestPosts, shallowEqual);
  const allPosts = useSelector(({ board }) => board.allPosts, shallowEqual);
  // console.log(navNames);
  const [cookies] = useCookies(["token"]);
  const [curType, setCurType] = useState("first");

  const getNavNames = useCallback(() => {
    get(
      `/user/getName?region_bcode=${regionBcode}&sector_no=${sectorNo}`,
      data => {
        dispatch(userActions.setNavName(data));
      }
    );
  }, [regionBcode, sectorNo, dispatch]);

  const regionClickHandler = useCallback(() => {
    setCurType("first");
    get(`/board/list/best?category=region&category_no=${regionBcode}`, data => {
      dispatch(boardActions.setBestPosts(data.results));
    });
    get(
      `/board/list/all?count=5&page=0&category=region&category_no=${regionBcode}`,
      data => {
        dispatch(boardActions.setAllPosts(data.results));
      }
    );
  }, [regionBcode, dispatch]);

  useEffect(() => {
    if (cookies["token"]) {
      if (regionBcode && sectorNo) {
        getNavNames();
        regionClickHandler();
      }
    }
  }, [cookies, regionBcode, sectorNo, regionClickHandler, getNavNames]);

  const sectorClickHandler = useCallback(() => {
    setCurType("second");
    get(`/board/list/best?category=sector&category_no=${sectorNo}`, data => {
      dispatch(boardActions.setBestPosts(data.results));
    });
    get(
      `/board/list/all?count=5&page=0&category=sector&category_no=${sectorNo}`,
      data => {
        dispatch(boardActions.setAllPosts(data.results));
      }
    );
  }, [sectorNo, dispatch]);

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <Ads>
          <img src={ads} style={{ width: "100%", height: "156px" }} alt="ads" />
        </Ads>

        <Nav
          firstCategory="내지역"
          firstSubCategory={`${navNames.r2_bname} ${navNames.r3_bname}`}
          secondCategory="내업종"
          secondSubCategory={navNames.sector_name}
          firstHandler={regionClickHandler}
          secondHandler={sectorClickHandler}
          curType={curType}
        />

        <ListContainer>
          <PostTitle title="베스트 게시글" svg={crownIcon} />
          <PostList>
            {bestPosts &&
              bestPosts.map((post, idx) => (
                <Post
                  key={post.board_no}
                  no={post.board_no}
                  title={post.board_title}
                  author={post.nickname}
                  createDate={post.create_datetime}
                  like={post.likes}
                  comment={post.comments}
                  rank={idx + 1}
                />
              ))}
          </PostList>
        </ListContainer>
        <ListContainer>
          <PostTitle title="전체 게시글" svg={boardIcon} isMore={true} />
          <PostList>
            {allPosts &&
              allPosts.map((post, idx) => (
                <Post
                  key={post.board_no}
                  no={post.board_no}
                  title={post.board_title}
                  author={post.nickname}
                  createDate={post.create_datetime}
                  like={post.likes}
                  comment={post.comment}
                  rank={idx + 1}
                />
              ))}
          </PostList>
        </ListContainer>
      </Container>
    </Layout>
  );
};

export default IndexPage;

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
