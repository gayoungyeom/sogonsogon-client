import React, { useCallback, useState } from "react";
import { Link, navigate } from "gatsby";

import styled from "styled-components";
import GlobalStyles from "../components/globalstyles";
import * as userActions from "../store/modules/user";

import { useDispatch, useSelector } from "react-redux";

const SignupPage = () => {
  const dispatch = useDispatch();
  const email = useSelector(({ signup }) => signup.email);
  const password = useSelector(({ signup }) => signup.password);
  const password2 = useSelector(({ signup }) => signup.password2);
  const nickName = useSelector(({ signup }) => signup.nickName);

  const onChangeInput = useCallback(e => {
    dispatch(
      userActions.setInput({ key: e.target.name, value: e.target.value })
    );
  }, []);

  const checkFillInput = () => {
    if (email === "" || password === "" || password2 === "" || nickName === "")
      return false;
    else return true;
  };

  const checkPassword = () => {
    if (password === password2) return true;
    else return false;
  };

  const onClickNext = useCallback(() => {
    //모든 정보 입력되었는지 확인후 네비게이트
    if (!checkFillInput()) {
      alert("모든 칸을 입력해주세요.");
    } else if (!checkPassword()) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      navigate("/signupfin");
    }
  }, [email, password, password2, nickName]);

  return (
    <Container>
      <GlobalStyles />
      <Title>소곤소곤</Title>
      <SubTitle>방문해주셔서 감사합니다!</SubTitle>
      <SubContent>
        간단한 정보를 입력하신 후 소곤소곤에서 소통해보세요 :)
      </SubContent>
      <InputContainer>
        <OneInput>
          <InputCaption>이메일</InputCaption>
          <Input
            placeholder="이메일을 입력해주세요"
            name="email"
            type="text"
            onChange={onChangeInput}
          />
        </OneInput>
        <OneInput>
          <InputCaption>비밀번호</InputCaption>
          <Input
            placeholder="비밀번호를 입력해주세요. 예) 123456"
            name="password"
            type="password"
            maxLength="6"
            onChange={onChangeInput}
          />
        </OneInput>
        <OneInput>
          <InputCaption>비밀번호 확인</InputCaption>
          <Input
            placeholder="비밀번호를 한번 더 입력해주세요"
            name="password2"
            type="password"
            maxLength="6"
            onChange={onChangeInput}
          />
        </OneInput>
        <OneInput>
          <InputCaption>닉네임</InputCaption>
          <Input
            placeholder="사용하실 닉네임을 입력해주세요"
            name="nickName"
            type="text"
            onChange={onChangeInput}
          />
        </OneInput>
        <Button name="next" onClick={onClickNext}>
          다음
        </Button>
        <Button name="cancel" onClick={() => navigate("/login")}>
          뒤로
        </Button>
      </InputContainer>
    </Container>
  );
};

export default SignupPage;

const Container = styled.div`
  width: cal(100% - 100px);
  margin: 100px 40px;
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
  margin-bottom: 18px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OneInput = styled.div`
  margin-top: 15px;
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
  padding: 5px;
`;

const Button = styled.button`
  display: block;
  width: 290px;
  height: 45px;
  margin-top: 22px;
  font-size: 14px;
  color: #fff;
  background: ${props => (props.name === "next" ? "#5c3ec2" : "#000")};
  border: ${props => (props.name === "next" ? "#5c3ec2" : "#000")};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    font-size: 15px;
  }
`;
