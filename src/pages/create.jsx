import React, { useState } from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from "../components/nav";

import styled from "styled-components";

const Container = styled.div`
  margin-top: 0;
  padding: 0;
`;

const Title = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  height: 3.125rem;
  background: #f8f9fa;
  outline: none;
  border: 2px solid #fff;
  padding: 12px;
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
  padding: 12px;
  font-size: 13px;
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

const CreatePage = ({ location }) => {
  const [curType, setCurType] = useState("first");

  const clickRegionHandler = () => {
    console.log("region");
    setCurType("first");
  };

  const clickBusinessHandler = () => {
    console.log("business");
    setCurType("second");
  };

  return (
    <Layout>
      <SEO title="Create" />
      <Container>
        <Nav
          firstCategory={`내 지역`}
          firstSubCategory={`서초구 방배동`}
          secondCategory={`내 업종`}
          secondSubCategory={`외식업`}
          firstHandler={clickRegionHandler}
          secondHandler={clickBusinessHandler}
          curType={curType}
        />
        <Title placeholder={`제목을 입력해주세요`} />
        <Content placeholder={`내용을 입력해주세요`} />
        <BtnWrap>
          <SaveBtn>등록</SaveBtn>
        </BtnWrap>
      </Container>
    </Layout>
  );
};

export default CreatePage;
