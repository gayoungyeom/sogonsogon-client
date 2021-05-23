import React, { useCallback, useEffect, useState } from "react";
import { navigate } from "gatsby";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import { getData, putData } from "../../utils/http";
import * as userActions from "../../store/modules/user";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import Nav from "../../components/nav";

const MyInfoPage = ({ location }) => {
  const dispatch = useDispatch();
  const input = useSelector(({ user }) => user.input).toJS();
  const email = input.email || "";
  const nickName = input.nickName || "";
  const password = input.password || "";
  const password2 = input.password2 || "";

  const [isChangePw, setIsChangePw] = useState(false); //change pw
  const [cookies] = useCookies(["token"]);

  const getInfo = useCallback(() => {
    getData(`/user`, data => {
      dispatch(userActions.setInput({ key: "email", value: data.email }));
      dispatch(userActions.setInput({ key: "nickName", value: data.nickname }));
    });
  }, [dispatch]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  const onChangeInput = useCallback(
    e => {
      dispatch(
        userActions.setInput({ key: e.target.name, value: e.target.value })
      );
    },
    [dispatch]
  );

  const editNickName = useCallback(() => {
    putData(`/user/editnickname`, { nickname: nickName }, data => {
      alert(`${data.message}`);
    });
  }, [nickName]);

  const checkPassword = useCallback(() => {
    const reg = /^[0-9]{6}/;
    if (reg.test(password2)) return true;
    else return false;
  }, [password2]);

  const editPassword = useCallback(() => {
    if (!isChangePw) {
      setIsChangePw(true);
    } else {
      if (password === "" || password2 === "") {
        alert(`변경할 비밀번호를 모두 입력해 주세요.`);
      } else if (!checkPassword()) {
        alert("비밀번호 형식을 올바르게 입력해주세요. ex)123456");
      } else if (password !== password2) {
        alert(`비밀번호가 일치하지 않습니다.`);
      } else {
        putData(`/user/editpassword`, { password }, data => {
          alert(`${data.message}`);
        });
      }
    }
  }, [password, password2, isChangePw, checkPassword]);

  const listClickHandler = () => {
    navigate("/my/post");
  };

  return (
    <Layout isBack={true}>
      <SEO title="MY" />
      <Container>
        <Nav
          firstSubCategory="내 정보 수정"
          secondSubCategory="내 활동 내역"
          secondHandler={listClickHandler}
          curType={"first"}
        />
        <InfoContainer>
          <User>{nickName} 님</User>
          <EmailContainer>
            <EmailCaption>이메일</EmailCaption>
            <Email>{email}</Email>
          </EmailContainer>
          <InputContainer>
            <OneInput>
              <InputCaption>닉네임</InputCaption>
              <InputNick
                name="nickName"
                value={nickName}
                onChange={onChangeInput}
              />
              <EditBtnNick onClick={editNickName}>변경</EditBtnNick>
            </OneInput>

            {isChangePw && (
              <>
                <OneInput>
                  <InputCaption>비밀번호</InputCaption>
                  <Input
                    placeholder="변경하실 비밀번호를 입력해주세요"
                    type="password"
                    name="password"
                    maxLength="6"
                    onChange={onChangeInput}
                  />
                </OneInput>
                <OneInput>
                  <InputCaption>비밀번호 확인</InputCaption>
                  <Input
                    placeholder="비밀번호를 한번 더 입력해주세요"
                    type="password"
                    name="password2"
                    maxLength="6"
                    onChange={onChangeInput}
                  />
                </OneInput>
              </>
            )}
            <EditBtnPw onClick={editPassword}>비밀번호 변경하기</EditBtnPw>
          </InputContainer>
        </InfoContainer>
      </Container>
    </Layout>
  );
};

export default MyInfoPage;

const Container = styled.div``;

//내 정보 수정
const User = styled.div`
  font-size: 16px;
  color: #5c3ec2;
  padding: 30px 0;
  text-align: center;
`;

const InfoContainer = styled.div`
  padding-top: 10px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 2px solid #fff;
`;

const EmailContainer = styled.div`
  width: 315px;
`;

const EmailCaption = styled.span`
  font-weight: bold;
  text-align: left;
  padding: 10px 5px;
  padding-right: 20px;
`;

const Email = styled.span``;

const InputContainer = styled.div`
  margin-top: 20px;
`;

const OneInput = styled.div`
  margin-top: 10px;
  width: 315px;
`;

const InputNick = styled.input`
  width: 265px;
  height: 45px;
  font-size: 13px;
  padding: 0 14px;
  border: 2px solid #dededf;
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const Input = styled.input`
  width: 315px;
  height: 45px;
  font-size: 13px;
  padding: 0 14px;
  border: 2px solid #dededf;
  border-radius: 4px;
`;

const InputCaption = styled.div`
  font-weight: bold;
  text-align: left;
  padding: 10px 5px;
`;

const EditBtnNick = styled.button`
  width: 50px;
  height: 45px;
  color: #fff;
  background: #5c3ec2;
  border: #5c3ec2;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  outline: none;
  cursor: pointer;
`;

const EditBtnPw = styled.button`
  width: 315px;
  height: 45px;
  padding: 14px 0;
  margin-top: 22px;
  font-size: 14px;
  color: #fff;
  background: #5c3ec2;
  border: #5c3ec2;
  border-radius: 4px;
  cursor: pointer;
`;
