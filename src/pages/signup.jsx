import React from "react";
import { Link } from "gatsby";

import styled from "styled-components";
import GlobalStyles from "../components/globalstyles";

const Container = styled.div`
  width: cal(100% - 100px);
  margin: 160px 40px;
  margin: 10rem 2.5rem;
  text-align: center;
`;

const Title = styled.div`
  font-size: 37px;
  font-weight: bold;
  padding: 10px;
`;

const SubTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  padding: 10px;
`;

const SubContent = styled.div`
  font-size: 9px;
  margin-bottom: 28px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OneInput = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  width: 290px;
  height: 45px;
  font-size: 13px;
  padding: 0 14px;
  border: 2px solid #dededf;
  border-radius: 4px;
`;

const InputCaption = styled.div`
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  padding: 3px 5px;
`;

const Button = styled(Link)`
  width: 290px;
  height: 45px;
  padding: 14px 0;
  margin-top: 24px;
  font-size: 14px;
  color: #fff;
  background: #5c3ec2;
  border: #5c3ec2;
  border-radius: 4px;
`;

const SignupPage = () => {
  return (
    <Container>
      <GlobalStyles />
      <Title>Montent</Title>
      <SubTitle>방문해주셔서 감사합니다!</SubTitle>
      <SubContent>
        간단한 정보를 입력하신 후 Montent에서 소통해보세요 :)
      </SubContent>
      <InputContainer>
        <OneInput>
          <InputCaption>이메일</InputCaption>
          <Input placeholder={`이메일을 입력해주세요`} />
        </OneInput>
        <OneInput>
          <InputCaption>비밀번호</InputCaption>
          <Input placeholder={`비밀번호를 입력해주세요`} />
        </OneInput>
        <OneInput>
          <InputCaption>비밀번호 확인</InputCaption>
          <Input placeholder={`비밀번호를 한번 더 입력해주세요`} />
        </OneInput>
        <OneInput>
          <InputCaption>닉네임</InputCaption>
          <Input placeholder={`사용하실 닉네임을 입력해주세요`} />
        </OneInput>
        <Button to="/signupfin">다음</Button>
      </InputContainer>
    </Container>
  );
};

export default SignupPage;
