import React, { useState } from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from "../components/nav";
import Post from "../components/post";
import Pagination from "../components/pagination";

import styled from "styled-components";

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

  //비밀번호 변경
  const [isChangePw, setIsChangePw] = useState(false);
  const changePassword = () => {
    setIsChangePw(true);
  };

  //pagination
  const PER_PAGE = 10;
  const [curPage, setCurPage] = useState(1);
  const paginationHandler = current => {
    setCurPage(current);
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
        {curType === "first" ? (
          <InfoContainer>
            <User>몽뜨님</User>
            <EmailContainer>
              <EmailCaption>이메일</EmailCaption>
              <Email>montent@email.com</Email>
            </EmailContainer>
            <InputContainer>
              <OneInput>
                <InputCaption>닉네임</InputCaption>
                <InputNick value={`몽뜨`} />
                <EditBtnNick>변경</EditBtnNick>
              </OneInput>

              {isChangePw && (
                <>
                  <OneInput>
                    <InputCaption>비밀번호</InputCaption>
                    <Input
                      placeholder={`변경하실 비밀번호를 입력해주세요`}
                      type={`password`}
                    />
                  </OneInput>
                  <OneInput>
                    <InputCaption>비밀번호 확인</InputCaption>
                    <Input
                      placeholder={`비밀번호를 한번 더 입력해주세요`}
                      type={`password`}
                    />
                  </OneInput>
                </>
              )}
              <EditBtnPw onClick={changePassword}>비밀번호 변경하기</EditBtnPw>
            </InputContainer>
          </InfoContainer>
        ) : (
          <>
            <SubTitle>내가 쓴 게시글</SubTitle>
            <Post
              title={`물어볼 때마다...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
            />
            <Post
              title={`진상 손님...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
            />
            <Post
              title={`옆에 싱싱마트...`}
              author={`익명의 사나이`}
              createDate={`03.14`}
              like={1442}
              comment={70}
            />
            <PaginationWrap>
              <Pagination
                current={curPage}
                total={50}
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
