import React, { useCallback } from "react";
import { navigate } from "gatsby";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import * as userActions from "../store/modules/user";
import GlobalStyles from "../components/globalstyles";
import logo from "../assets/img/logo.png";

const SignupPage = () => {
  const dispatch = useDispatch();
  const input = useSelector(({ user }) => user.input).toJS();
  const email = input.email;
  const password = input.password;
  const password2 = input.password2;
  const nickName = input.nickname;

  const onChangeInput = useCallback(
    e => {
      dispatch(
        userActions.setInput({ key: e.target.name, value: e.target.value })
      );
    },
    [dispatch]
  );

  const checkFillInput = useCallback(() => {
    if (email === "" || password === "" || password2 === "" || nickName === "")
      return false;
    else return true;
  }, [email, password, password2, nickName]);

  const checkEmail = useCallback(() => {
    const reg = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (reg.test(email)) return true;
    else return false;
  }, [email]);

  const checkPassword = useCallback(() => {
    const reg = /^[0-9]{6}/;
    if (reg.test(password2)) return true;
    else return false;
  }, [password2]);

  const checkPasswordEqual = useCallback(() => {
    if (password === password2) return true;
    else return false;
  }, [password, password2]);

  const onClickNext = useCallback(() => {
    if (!checkFillInput()) {
      alert("모든 칸을 입력해주세요.");
    } else if (!checkEmail()) {
      alert("이메일 형식을 올바르게 입력해주세요.");
    } else if (!checkPassword()) {
      alert("비밀번호 형식을 올바르게 입력해주세요. ex)123456");
    } else if (!checkPasswordEqual()) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      navigate("/signupfin");
    }
  }, [checkFillInput, checkEmail, checkPassword, checkPasswordEqual]);

  return (
    <Container>
      <GlobalStyles />
      <Title>
        {" "}
        <Logo src={logo} alt="logo" />
      </Title>
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
            name="nickname"
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

const Title = styled.div``;

const Logo = styled.img`
  width: 195px;
  height: 65px;
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
