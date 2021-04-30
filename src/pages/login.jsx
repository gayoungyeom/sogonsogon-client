import React from "react";
import { Link } from "gatsby";

import styled from "styled-components";
import GlobalStyles from "../components/globalstyles";

const Container = styled.div`
  width: cal(100% - 100px);
  margin: 100px 40px;
`;

const Title = styled.div`
  font-size: 37px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  margin-bottom: 28px;
`;

const Input = styled.input`
  display: block;
  width: 290px;
  height: 45px;
  margin: 22px auto;
  font-size: 13px;
  padding: 0 14px;
  border: 2px solid #dededf;
  border-radius: 4px;
`;

const Button = styled(Link)`
  display: block;
  width: 290px;
  height: 45px;
  text-align: center;
  padding: 14px 0;
  margin: 22px auto;
  font-size: 14px;
  color: #fff;
  background: ${props => (props.name === "login" ? "#5c3ec2" : "#000")};
  border: ${props => (props.name === "login" ? "#5c3ec2" : "#000")};
  border-radius: 4px;
`;

const LoginPage = () => {
  return (
    <Container>
      <GlobalStyles />
      <Title>소곤소곤</Title>
      <Input placeholder={`이메일을 입력해주세요`} />
      <Input placeholder={`비밀번호를 입력해주세요`} />
      <Button name="login" to="#">
        로그인
      </Button>
      <Button name="signup" to="/signup">
        회원가입
      </Button>
    </Container>
  );
};

export default LoginPage;
