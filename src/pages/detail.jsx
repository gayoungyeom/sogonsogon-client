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

const SVG = styled.span`
  padding: 3px;
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
              <Views>
                <SVG>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.632"
                    height="9.742"
                    viewBox="0 0 12.632 9.742"
                  >
                    <path
                      id="_Color"
                      data-name=" ↳Color"
                      d="M6.316,9.742A6.209,6.209,0,0,1,2.454,8.376,7.608,7.608,0,0,1,0,4.871a7.607,7.607,0,0,1,2.454-3.5,6.141,6.141,0,0,1,7.724,0,7.608,7.608,0,0,1,2.454,3.5,7.608,7.608,0,0,1-2.454,3.505A6.209,6.209,0,0,1,6.316,9.742Zm0-8.119A3.08,3.08,0,0,0,3.445,4.871,3.08,3.08,0,0,0,6.316,8.119,3.08,3.08,0,0,0,9.187,4.871,3.08,3.08,0,0,0,6.316,1.624Zm0,5.2A1.848,1.848,0,0,1,4.594,4.871,1.848,1.848,0,0,1,6.316,2.923,1.848,1.848,0,0,1,8.039,4.871,1.848,1.848,0,0,1,6.316,6.82Z"
                      fill="#5c3ec2"
                    />
                  </svg>
                </SVG>
                2843
              </Views>
              <Likes>
                <SVG>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11.715"
                    height="11.315"
                    viewBox="0 0 11.715 11.315"
                  >
                    <path
                      id="heart"
                      d="M9.234,32.672a2.485,2.485,0,0,0-3.732.313l-.394.467-.394-.467a2.485,2.485,0,0,0-3.732-.313,3.657,3.657,0,0,0-.2,4.786l1.358,1.614,2.512,2.985a.572.572,0,0,0,.906,0l.6-.716L9.43,37.458A3.655,3.655,0,0,0,9.234,32.672Z"
                      transform="translate(0.749 -31.465)"
                      fill="#5c3ec2"
                      stroke="#5c3ec2"
                    />
                  </svg>
                </SVG>
                1442
              </Likes>
              <Comments>
                <SVG>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10.65"
                    height="11.028"
                    viewBox="0 0 10.65 11.028"
                  >
                    <path
                      id="comment-dots"
                      d="M5.325,32A5.225,5.225,0,0,0,0,37.12a4.971,4.971,0,0,0,1.186,3.217A6.562,6.562,0,0,1,.046,42.7a.223.223,0,0,0-.031.214.165.165,0,0,0,.152.118,4.366,4.366,0,0,0,2.925-1.265,5.48,5.48,0,0,0,2.234.478,5.124,5.124,0,1,0,0-10.24ZM2.662,37.908a.8.8,0,0,1,0-1.575.8.8,0,0,1,0,1.575Zm2.662,0a.8.8,0,0,1,0-1.575.8.8,0,0,1,0,1.575Zm2.662,0a.8.8,0,0,1,0-1.575.8.8,0,0,1,0,1.575Z"
                      transform="translate(0 -32)"
                      fill="#5c3ec2"
                    />
                  </svg>
                </SVG>
                70
              </Comments>
            </CommuRight>
            <LikeBtn>
              <SVG>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12.952"
                  height="12.488"
                  viewBox="0 0 12.952 12.488"
                >
                  <path
                    id="heart"
                    d="M10.779,32.752a2.991,2.991,0,0,0-4.355.349l-.46.52L5.5,33.1a2.99,2.99,0,0,0-4.355-.349,3.934,3.934,0,0,0-.231,5.33l4.516,5.123a.687.687,0,0,0,1.057,0l4.516-5.123A3.932,3.932,0,0,0,10.779,32.752Z"
                    transform="translate(0.513 -31.465)"
                    fill="none"
                    stroke="#5c3ec2"
                  />
                </svg>
              </SVG>
              공감
            </LikeBtn>
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
        <InputBtn>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14.959"
            height="14.251"
            viewBox="0 0 14.959 14.251"
          >
            <path
              id="paper-plane"
              d="M13.918.059.375,7.5A.655.655,0,0,0,.439,8.7L3.545,9.944,11.94,2.9c.161-.136.389.072.251.231L5.152,11.3v2.24a.706.706,0,0,0,1.242.44L8.25,11.825l3.641,1.453a.707.707,0,0,0,.964-.506L14.958.749A.7.7,0,0,0,13.918.059Z"
              transform="translate(-0.01 0.031)"
              fill="#5c3ec2"
            />
          </svg>
        </InputBtn>
      </InputContainer>
    </Layout>
  );
};

export default DetailPage;
