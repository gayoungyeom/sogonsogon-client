import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Comment from "../components/comment";

import styled from "styled-components";

const Container = styled.div`
  background: #f8f9fa;
  padding: 10px;
  margin-bottom: 60px;
`;

const Post = styled.div``;

const CurType = styled.div`
  font-size: 12px;
  color: #5c3ec2;
`;

const PostTitle = styled.div`
  padding: 12.5px 0;
  font-size: 15px;
  font-weight: bold;
  line-height: 18px;
`;

const ABDContainer = styled.div`
  padding-bottom: 10px;
`;

const Author = styled.span`
  font-size: 11px;
`;

const Bar = styled.span`
  font-size: 11px;
  padding: 0 10px;
`;

const Date = styled.span`
  font-size: 11px;
`;

const Content = styled.div`
  font-size: 14px;
  padding: 20px 0;
  line-height: 18px;
  border-top: 2px solid #fff;
  border-bottom: 2px solid #fff;
`;

const CommuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;
  font-size: 11px;
  padding: 15px 5px;
`;

const CommuRight = styled.span`
  align-self: center;
  color: #5c3ec2;
`;

const Views = styled.span``;

const Likes = styled.span`
  padding: 0 10px;
`;

const Comments = styled.span``;

const LikeBtn = styled.button`
  align-self: center;
  width: 61px;
  height: 26px;
  color: #5c3ec2;
  font-weight: bold;
  background: #fff;
  border: 1px solid #5c3ec2;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`;

const CommentContainer = styled.div``;

const CommentCnt = styled.div`
  font-size: 13px;
  font-weight: bold;
  border-top: 2px solid #fff;
  padding: 10px 0;
`;

const MoreWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

const More = styled.button`
  /* width: 290px; */
  width: 90%;
  height: 45px;
  border: 2px solid #dededf;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
  color: #212529;
  background: #fff;
  margin: 0 auto;
  outline: none;
  cursor: pointer;
`;

const InputContainer = styled.div`
  width: 100%;
  border: 2px solid #ebebeb;
  box-shadow: 2px 2px 2px 2px gray;
  margin-bottom: 5px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
`;

const Input = styled.input`
  width: 90%;
  height: 45px;
  font-size: 12px;
  padding: 25px;
  border: none;
  outline: none;
`;

const InputBtn = styled.button`
  width: 10%;
  height: 45px;
  border: none;
  cursor: pointer;
  outline: none;
  background: #fff;
  color: #5c3ec2;
  font-weight: bold;
`;

const DetailPage = ({ location }) => {
  const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Layout>
      <SEO title="PostDetail" />
      <Container>
        <Post>
          <CurType>지역 | 서초구 방배동</CurType>
          <PostTitle>
            물어볼 때마다 말이 달라지는 직원 어떻게 대처하시나요?
          </PostTitle>
          <ABDContainer>
            <Author>익명의 사나이</Author>
            <Bar>|</Bar>
            <Date>2021.03.14</Date>
          </ABDContainer>
          <Content>
            예전에 이렇게하라고 시켰는데 갑자기 그게 아니라고 다른 방식으로
            한다던지, 본인이 말했던 걸 기억 못하고 계속해서 다른 변명만 내뱉는
            직원분들이 많이 있으신가요? 본인이 잘못 해놓고 제가 그렇게 말한적
            없는 것처럼 말하는데 답답하기 그지없네요
          </Content>
          <CommuContainer>
            <CommuRight>
              <Views>👁 2843</Views>
              <Likes>♥ 1442</Likes>
              <Comments>💬 70</Comments>
            </CommuRight>
            <LikeBtn>♡ 공감</LikeBtn>
          </CommuContainer>
        </Post>
        <CommentContainer>
          <CommentCnt>댓글 70</CommentCnt>
          {testArr.map(() => (
            <Comment
              author={`조나단`}
              createDate={`3일전`}
              content={`말로 하시지 마시고 종이에 해야할 사항 적어서 전달하세요.`}
            />
          ))}
        </CommentContainer>
        <MoreWrap>
          <More>더보기</More>
        </MoreWrap>
      </Container>
      <InputContainer>
        <Input placeholder={`댓글을 입력하세요.`} />
        <InputBtn>✈</InputBtn>
      </InputContainer>
    </Layout>
  );
};

export default DetailPage;
