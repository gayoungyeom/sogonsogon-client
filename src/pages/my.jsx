import React, { useCallback, useEffect, useState } from "react";
import { Link } from "gatsby";

import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from "../components/nav";
import Post from "../components/post";
import Pagination from "../components/pagination";
import { get, put } from "../utils/http";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../store/modules/user";

const MyPage = ({ location }) => {
  const dispatch = useDispatch();
  const input = useSelector(({ user }) => user.input).toJS();
  const email = input.email || "";
  const nickName = input.nickName || "";
  const password = input.password || "";
  const password2 = input.password2 || "";

  const posts = useSelector(({ user }) => user.myPosts);

  const getInfo = useCallback(() => {
    get(`/user`, data => {
      dispatch(userActions.setInput({ key: "email", value: data.email }));
      dispatch(userActions.setInput({ key: "nickName", value: data.nickname }));
    });
  }, [dispatch]);

  useEffect(() => {
    getInfo();
    getMyPosts(0);
  }, [getInfo, getMyPosts]);

  const onChangeInput = useCallback(e => {
    dispatch(
      userActions.setInput({ key: e.target.name, value: e.target.value })
    );
  }, []);

  const editNickName = useCallback(() => {
    put(`/user/editnickname`, { nickname: nickName }, data => {
      alert(`${data.message}`);
    });
  }, [nickName]);

  const [isChangePw, setIsChangePw] = useState(false);
  const editPassword = useCallback(() => {
    if (!isChangePw) {
      setIsChangePw(true);
    } else {
      if (password === "" || password2 === "") {
        alert(`변경할 비밀번호를 모두 입력해 주세요.`);
      } else if (password !== password2) {
        alert(`비밀번호가 일치하지 않습니다.`);
      } else {
        put(`/user/editpassword`, { password }, data => {
          alert(`${data.message}`);
        });
      }
    }
  }, [password, password2]);

  //nav control
  const [curType, setCurType] = useState("first");
  const editClickHandler = () => {
    setCurType("first");
  };
  const listClickHandler = () => {
    setCurType("second");
  };

  //pagination
  const PER_PAGE = 10;
  const [curPage, setCurPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  const paginationHandler = current => {
    setCurPage(current);
    getMyPosts(current - 1);
  };

  const getMyPosts = useCallback(
    page => {
      get(`/board/list/mine?page=${page}&count=${PER_PAGE}`, data => {
        dispatch(userActions.setMyPosts(data.results1));
        setTotalCnt(data.total_count);
      });
    },
    [curPage, PER_PAGE, dispatch]
  );

  return (
    <Layout isBack={true}>
      <SEO title="MY" />
      <Container>
        <Nav
          firstSubCategory="내 정보 수정"
          secondSubCategory="내 활동 내역"
          firstHandler={editClickHandler}
          secondHandler={listClickHandler}
          curType={curType}
        />
        {curType === "first" ? (
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
                      onChange={onChangeInput}
                    />
                  </OneInput>
                  <OneInput>
                    <InputCaption>비밀번호 확인</InputCaption>
                    <Input
                      placeholder="비밀번호를 한번 더 입력해주세요"
                      type="password"
                      name="password2"
                      onChange={onChangeInput}
                    />
                  </OneInput>
                </>
              )}
              <EditBtnPw onClick={editPassword}>비밀번호 변경하기</EditBtnPw>
            </InputContainer>
          </InfoContainer>
        ) : (
          <>
            <SubTitle>내가 쓴 게시글</SubTitle>
            {posts &&
              posts.map(post => (
                <Post
                  key={post.board_no}
                  no={post.board_no}
                  title={post.board_title}
                  author={`익명의 사나이`}
                  createDate={post.create_datetime}
                  like={post.likes}
                  comment={post.comments}
                />
              ))}

            <PaginationWrap>
              <Pagination
                current={curPage}
                total={totalCnt}
                pageSize={PER_PAGE}
                onChange={paginationHandler}
              />
            </PaginationWrap>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default MyPage;

const Container = styled.div`
  /* background: #f8f9fa; */
  /* padding-bottom: 100px; */
`;

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

//내 활동 내역
const SubTitle = styled.div`
  padding: 12px;
  font-size: 15px;
  font-weight: bold;
  background: #f8f9fa;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
`;

const PaginationWrap = styled.div`
  text-align: center;
  padding: 10px 0;
  padding: 0.625rem 0;
`;
