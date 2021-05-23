import React, { useCallback, useState } from "react";
import { navigate } from "gatsby";

import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import { login } from "../utils/http";
import * as commonActions from "../store/modules/common";
import GlobalStyles from "../components/globalstyles";
import logo from "../assets/img/logo.png";

const LoginPage = () => {
  const dispatch = useDispatch();

  const [tokenCookie, setTokenCookie] = useCookies(["token"]); // eslint-disable-line no-unused-vars
  const [sectorCookie, setSectorCookie] = useCookies(["sector"]); // eslint-disable-line no-unused-vars
  const [regionCookie, setRegionCookie] = useCookies(["region"]); // eslint-disable-line no-unused-vars

  const setToken = useCallback(
    token => dispatch(commonActions.setToken(token)),
    [dispatch]
  );
  const setRegion = useCallback(
    regionBcode => dispatch(commonActions.setRegionBcode(regionBcode)),
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

  const onKeyPress = e => {
    if (e.key === "Enter") onClickLogin();
  };

  const checkFillInput = useCallback(() => {
    if (form.email === "" || form.password === "") return false;
    else return true;
  }, [form]);

  const onClickLogin = useCallback(() => {
    if (!checkFillInput()) {
      alert("모든 칸을 입력해주세요.");
    } else {
      login(`/login`, { ...form }, data => {
        if (!data.message) {
          const curToken = data.token;
          const curSector = data.sector_no;
          const curRegion = data.region_bcode;
          setTokenCookie("token", curToken);
          setSectorCookie("sector", curSector);
          setRegionCookie("region", curRegion);
          setToken(curToken);
          setSector(curSector);
          setRegion(curRegion);
          navigate("/");
        }
      });
    }
  }, [
    form,
    checkFillInput,
    setTokenCookie,
    setSectorCookie,
    setRegionCookie,
    setToken,
    setSector,
    setRegion
  ]);

  return (
    <Container>
      <GlobalStyles />
      <Title>
        <Logo src={logo} alt="logo" />
      </Title>
      <Input
        placeholder="이메일을 입력해주세요"
        name="email"
        type="text"
        onChange={onChangeInput}
        onKeyPress={onKeyPress}
      />
      <Input
        placeholder="비밀번호를 입력해주세요"
        name="password"
        type="password"
        maxLength="6"
        onChange={onChangeInput}
        onKeyPress={onKeyPress}
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

const Container = styled.div`
  width: cal(100% - 100px);
  margin: 100px 40px;
`;

const Title = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  width: 195px;
  height: 65px;
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
