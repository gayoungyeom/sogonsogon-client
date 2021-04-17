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

const User = styled.div`
  font-size: 16px;
  color: #5c3ec2;
  text-align: center;
  padding: 27px;
`;

const InfoContainer = styled.div`
  padding: 30px;
  font-size: 13px;
`;

const EmailCaption = styled.span`
  font-weight: bold;
  padding-right: 20px;
`;

const Email = styled.span``;

const InputContainer = styled.div`
  margin-top: 33.5px;
`;

const OneInput = styled.div`
  margin-top: 22px;
  width: 100%;
`;

const Input = styled.input`
  width: 265px;
  height: 45px;
  font-size: 13px;
  padding: 0 14px;
  border: 2px solid #dededf;
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const InputCaption = styled.div`
  font-weight: bold;
  padding-bottom: 10px;
`;

const EditBtn = styled.button`
  width: 50px;
  height: 45px;
  color: #fff;
  background: #5c3ec2;
  border: #5c3ec2;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  outline: none;
`;

const MyPage = ({ location }) => {
  const [curType, setCurType] = useState("first");
  const editClickHandler = () => {
    console.log("edit my info");
    setCurType("first");
  };
  const listClickHandler = () => {
    console.log("my post list");
    setCurType("second");
  };

  //첫 번째 비밀번호 입력
  const [isSetFirst, setIsSetFirst] = useState(false);
  const setFirstPassword = () => {
    setIsSetFirst(true);
  };

  return (
    <Layout>
      <SEO title="MY" />
      <Container>
        <Nav
          firstSubCategory={`내 정보 수정`}
          secondSubCategory={`내 활동 내역`}
          firstHandler={editClickHandler}
          secondHandler={listClickHandler}
          curType={curType}
        />
        <User>몽뜨님</User>
        <InfoContainer>
          <EmailCaption>이메일</EmailCaption>
          <Email>montent@email.com</Email>
          <InputContainer>
            <OneInput>
              <InputCaption>닉네임</InputCaption>
              <Input value={`몽뜨`} />
              <EditBtn>변경</EditBtn>
            </OneInput>
            <OneInput>
              <InputCaption>비밀번호</InputCaption>
              <Input placeholder={`변경하실 비밀번호를 입력해주세요`} />
              <EditBtn onClick={setFirstPassword}>변경</EditBtn>
            </OneInput>
            {isSetFirst ? (
              <OneInput>
                <InputCaption>비밀번호 확인</InputCaption>
                <Input placeholder={`비밀번호를 한번 더 입력해주세요`} />
                <EditBtn onClick={setFirstPassword}>변경</EditBtn>
              </OneInput>
            ) : null}
          </InputContainer>
        </InfoContainer>
      </Container>
    </Layout>
  );
};

export default MyPage;
