import React, { useCallback, useState } from "react";
import { Link, navigate } from "gatsby";

import { useDispatch } from "react-redux";
import styled from "styled-components";

import GlobalStyles from "../components/globalstyles";
import * as commonActions from "../store/modules/common";
import { login } from "../utils/http";

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

const Button = styled.button`
  display: block;
  width: 290px;
  height: 45px;
  margin: 22px auto;
  font-size: 14px;
  color: #fff;
  background: ${props => (props.name === "login" ? "#5c3ec2" : "#000")};
  border: ${props => (props.name === "login" ? "#5c3ec2" : "#000")};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    font-size: 15px;
  }
`;

const checkFillInput = form => {
  if (form.email === "" || form.password === "") return false;
  else return true;
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const setToken = useCallback(
    token => dispatch(commonActions.setToken(token)),
    [dispatch]
  );
  const setRegion = useCallback(
    regionNo => dispatch(commonActions.setRegionNo(regionNo)),
    [dispatch]
  );
  const setSector = useCallback(
    sectorNo => dispatch(commonActions.setSectorNo(sectorNo)),
    [dispatch]
  );

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const onChangeInput = useCallback(
    e => {
      const newForm = {
        ...form,
        [e.target.name]: e.target.value
      };
      setForm(newForm);
    },
    [form]
  );

  const onClickLogin = useCallback(() => {
    if (!checkFillInput(form)) {
      alert("모든 칸을 입력해주세요.");
    } else {
      login(`/login`, { ...form }, data => {
        setToken(data.token);
        setRegion(data.region_no);
        setSector(data.sector_no);
        navigate("/");
      });
    }
  }, [form]);

  return (
    <Container>
      <GlobalStyles />
      <Title>소곤소곤</Title>
      <Input
        placeholder="이메일을 입력해주세요"
        name="email"
        type="text"
        onChange={onChangeInput}
      />
      <Input
        placeholder="비밀번호를 입력해주세요"
        name="password"
        type="password"
        maxLength="6"
        onChange={onChangeInput}
      />
      <Button name="login" onClick={onClickLogin}>
        로그인
      </Button>
      <Button name="signup" onClick={() => navigate("/signup")}>
        회원가입
      </Button>
    </Container>
  );
};

export default LoginPage;
