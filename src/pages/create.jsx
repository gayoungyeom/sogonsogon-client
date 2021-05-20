import React, { useCallback, useEffect, useState } from "react";
import { navigate } from "gatsby";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import { get, postData } from "../utils/http";
import * as boardActions from "../store/modules/board";
import * as userActions from "../store/modules/user";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from "../components/nav";

const CreatePage = ({ location }) => {
  const dispatch = useDispatch();
  const regionBcode = useSelector(({ common }) => common.regionBcode);
  const sectorNo = useSelector(({ common }) => common.sectorNo);
  const navNames = useSelector(({ user }) => user.navNames);
  const data = useSelector(({ board }) => board.input).toJS();
  console.log(data);
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
    dispatch(boardActions.setInput({ key: "category", value: "region" }));
    dispatch(boardActions.setInput({ key: "category_no", value: regionBcode }));
  }, [setCurType, dispatch, regionBcode]);

  const sectorClickHandler = useCallback(() => {
    setCurType("second");
    dispatch(boardActions.setInput({ key: "category", value: "sector" }));
    dispatch(boardActions.setInput({ key: "category_no", value: sectorNo }));
  }, [setCurType, dispatch, sectorNo]);

  useEffect(() => {
    if (cookies["token"]) {
      getNavNames();
      regionClickHandler();
    }
  }, [cookies, getNavNames, regionClickHandler]);

  const onChangeInput = useCallback(
    e => {
      dispatch(
        boardActions.setInput({ key: e.target.name, value: e.target.value })
      );
    },
    [dispatch]
  );

  const onClickRegister = useCallback(() => {
    if (data.title === "" || data.content === "") {
      alert("제목과 내용을 모두 입력해주세요.");
    } else {
      postData(`/board`, { ...data }, data => {
        alert(`${data.message}`);
        dispatch(boardActions.setInput({ key: "category", value: "" }));
        dispatch(boardActions.setInput({ key: "category_no", value: "" }));
        dispatch(boardActions.setInput({ key: "content", value: "" }));
        dispatch(boardActions.setInput({ key: "title", value: "" }));
        navigate("/all");
      });
    }
  }, [data, dispatch]);

  return (
    <Layout isBack={true}>
      <SEO title="Create" />
      <Container>
        <Nav
          firstCategory="내지역"
          firstSubCategory={`${navNames.r2_bname} ${navNames.r3_bname}`}
          secondCategory="내업종"
          secondSubCategory={navNames.sector_name}
          firstHandler={regionClickHandler}
          secondHandler={sectorClickHandler}
          curType={curType}
        />
        <Title
          placeholder="제목을 입력해주세요"
          name="title"
          onChange={onChangeInput}
        />
        <Content
          placeholder="내용을 입력해주세요"
          name="content"
          onChange={onChangeInput}
        />
        <BtnWrap>
          <SaveBtn onClick={onClickRegister}>등록</SaveBtn>
        </BtnWrap>
      </Container>
    </Layout>
  );
};

export default CreatePage;

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
  font-size: 15px;
  color: #fff;
  background: #5c3ec2;
  border: #5c3ec2;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`;
