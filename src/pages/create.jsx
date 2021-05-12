import React, { useCallback, useEffect, useState } from "react";
import { Link, navigate } from "gatsby";

import styled from "styled-components";
import * as boardActions from "../store/modules/board";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from "../components/nav";
import { post } from "../utils/http";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const CreatePage = ({ location }) => {
  const dispatch = useDispatch();
  const data = useSelector(({ board }) => board.input).toJS();

  const onChangeInput = useCallback(e => {
    dispatch(
      boardActions.setInput({ key: e.target.name, value: e.target.value })
    );
  }, []);

  const [curType, setCurType] = useState("first");

  const regionClickHandler = () => {
    setCurType("first");
    dispatch(boardActions.setInput({ key: "category", value: "region" }));
  };

  const sectorClickHandler = () => {
    setCurType("second");
    dispatch(boardActions.setInput({ key: "category", value: "sector" }));
  };

  const onClickRegister = useCallback(() => {
    if (data.title === "" || data.content === "") {
      alert("제목과 내용을 모두 입력해주세요.");
    } else {
      post(`/board`, { ...data }, data => {
        //글쓴 후 그냥 게시판으로 넘어가도 될거 같음
        alert(`${data.success}`);
        navigate("/all"); //본인 게시글로 이동 or 전체 게시글로 이동?
      });
    }
  }, [data]);

  return (
    <Layout isBack={true}>
      <SEO title="Create" />
      <Container>
        <Nav
          firstCategory={`내 지역`}
          firstSubCategory={`서초구 방배동`}
          secondCategory={`내 업종`}
          secondSubCategory={`외식업`}
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
  font-size: 11px;
  color: #fff;
  background: #5c3ec2;
  border: #5c3ec2;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`;
