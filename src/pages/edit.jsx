import React, { useCallback, useEffect, useState } from "react";
import { navigate } from "gatsby";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getData, putData } from "../utils/http";
import * as userActions from "../store/modules/user";
import * as boardActions from "../store/modules/board";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from "../components/nav";

const EditPage = ({ location }) => {
  const postNo = location.state.postNo;

  const dispatch = useDispatch();
  const regionBecode = useSelector(({ common }) => common.regionBcode);
  const sectorNo = useSelector(({ common }) => common.sectorNo);
  const navNames = useSelector(({ user }) => user.navNames);
  const data = useSelector(({ board }) => board.input).toJS();

  const [curType, setCurType] = useState("first");

  const getNavNames = useCallback(() => {
    getData(
      `/user/getName?region_bcode=${regionBecode}&sector_no=${sectorNo}`,
      data => {
        dispatch(userActions.setNavName(data));
      }
    );
  }, [regionBecode, sectorNo, dispatch]);

  const regionClickHandler = useCallback(() => {
    setCurType("first");
    dispatch(boardActions.setInput({ key: "category", value: "region" }));
    dispatch(
      boardActions.setInput({ key: "category_no", value: regionBecode })
    );
  }, [setCurType, dispatch, regionBecode]);

  const sectorClickHandler = useCallback(() => {
    setCurType("second");
    dispatch(boardActions.setInput({ key: "category", value: "sector" }));
    dispatch(boardActions.setInput({ key: "category_no", value: sectorNo }));
  }, [setCurType, dispatch, sectorNo]);

  const getPost = useCallback(() => {
    getData(`/board?board_no=${postNo}`, data => {
      dispatch(
        boardActions.setInput({ key: "title", value: data.board_title })
      );
      dispatch(
        boardActions.setInput({ key: "content", value: data.board_content })
      );

      data.region_bcode ? regionClickHandler() : sectorClickHandler();
    });
  }, [postNo, dispatch, regionClickHandler, sectorClickHandler]);

  useEffect(() => {
    if (regionBecode && sectorNo) {
      getNavNames();
      getPost();
    }
  }, [regionBecode, sectorNo, getNavNames, getPost]);

  const onChangeInput = useCallback(
    e => {
      dispatch(
        boardActions.setInput({ key: e.target.name, value: e.target.value })
      );
    },
    [dispatch]
  );

  const onClickRegister = useCallback(() => {
    putData(
      `/board`,
      {
        board_no: postNo,
        title: data.title,
        content: data.content,
        category: data.category,
        category_no: data.category_no
      },
      data => {
        alert(data.message);
        navigate(`/detail`, { state: { no: postNo } });
      }
    );
  }, [data, postNo]);

  return (
    <Layout>
      <SEO title="Edit" />
      <Container>
        <Nav
          firstCategory="내 지역"
          firstSubCategory={`${navNames.r2_bname} ${navNames.r3_bname}`}
          secondCategory="내 업종"
          secondSubCategory={navNames.sector_name}
          firstHandler={regionClickHandler}
          secondHandler={sectorClickHandler}
          curType={curType}
        />
        <Title
          placeholder={`제목을 입력해주세요`}
          name="title"
          value={data.title}
          onChange={onChangeInput}
        />
        <Content
          placeholder={`내용을 입력해주세요`}
          name="content"
          value={data.content}
          onChange={onChangeInput}
        />
        <BtnWrap>
          <SaveBtn onClick={onClickRegister}>저장</SaveBtn>
        </BtnWrap>
      </Container>
    </Layout>
  );
};

export default EditPage;

const Container = styled.div`
  margin-top: 0;
  padding-bottom: 20px;
`;

const Title = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  height: 3.125rem;
  background: #f8f9fa;
  outline: none;
  border: 2px solid #fff;
  padding: 13px;
  font-size: 13px;
`;

const Content = styled.textarea`
  display: block;
  width: 100%;
  height: 500px;
  height: 31.25rem;
  background: #f8f9fa;
  outline: none;
  border: 2px solid #fff;
  padding: 13px;
  font-size: 13px;
  resize: none;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SaveBtn = styled.button`
  /* width: 290px; */
  width: 90%;
  height: 45px;
  margin-top: 15px;
  font-size: 11px;
  color: #fff;
  background: #5c3ec2;
  border: #5c3ec2;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`;
