import React, { useState } from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from "../components/nav";

import styled from "styled-components";

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

const EditPage = ({ location }) => {
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
      <SEO title="Edit" />
      <Container>
        <Nav
          firstCategory={`내 지역`}
          firstSubCategory={`서초구 방배동`}
          secondCategory={`내 업종`}
          secondSubCategory={`외식업`}
          firstHandler={regionClickHandler}
          secondHandler={businessClickHandler}
          curType={curType}
        />
        <Title
          placeholder={`제목을 입력해주세요`}
          value={`물어볼 때마다 말이 달라지는 직원 어떻게 대처하시나요?`}
        />
        <Content
          placeholder={`내용을 입력해주세요`}
          value={`예전에 이렇게하라고 시켰는데 갑자기 그게 아니라고 다른 방식으로 한다던지, 본인이 말했던 걸 기억 못하고 계속해서 다른 변명만 내뱉는 직원분들이 많이 있으신가요?
본인이 잘못 해놓고 제가 그렇게 말한적 없는 것처럼 말하는데 답답하기 그지없네요
`}
        />
        <BtnWrap>
          <SaveBtn>저장</SaveBtn>
        </BtnWrap>
      </Container>
    </Layout>
  );
};

export default EditPage;
