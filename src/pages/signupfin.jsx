import React from "react";
import { Link } from "gatsby";

import styled from "styled-components";
import GlobalStyles from "../components/globalstyles";

const Container = styled.div`
  width: cal(100% - 100px);
  margin: 160px 40px;
  margin: 10rem 2.5rem;
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
  line-height: 15px;
`;

const SubContent = styled.div`
  font-size: 9px;
  margin-bottom: 28px;
  line-height: 12px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OneInput = styled.div`
  margin-top: 10px;
`;

const Input = styled.input`
  width: 290px;
  height: 45px;
  font-size: 13px;
  padding: 0 14px;
  border: 2px solid #dededf;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 290px;
  height: 45px;
  font-size: 13px;
  padding: 0 14px;
  margin-bottom: 10px;
  border: 2px solid #dededf;
  border-radius: 4px;
  /* color: #b5b5b5; */
  /* -webkit-appearance: none; */
  /* -moz-appearance: none; */
  /* appearance: none; */
  /* outline: none; */
`;

const RegionContainer = styled.div`
  display: inline-block;
`;

const SelectRegion = styled.select`
  width: 96px;
  height: 45px;
  font-size: 13px;
  padding: 0 14px;
  border: 2px solid #dededf;
  border-radius: 4px;
  /* color: #b5b5b5; */
`;

const Option = styled.option`
  width: 290px;
  height: 45px;
`;

const Inputcaption = styled.div`
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  padding: 3px 5px;
`;

const AddImg = styled(Link)`
  width: 290px;
  height: 45px;
  padding: 14px 0;
  margin-top: 24px;
  font-size: 14px;
  border: 2px solid #dededf;
  border-radius: 4px;
`;

const Button = styled(Link)`
  width: 290px;
  height: 45px;
  padding: 14px 0;
  margin-top: 24px;
  font-size: 14px;
  color: #fff;
  background: #5c3ec2;
  border: #5c3ec2;
  border-radius: 4px;
`;

const SignupFinPage = () => {
  return (
    <Container>
      <GlobalStyles />
      <Title>소곤소곤</Title>
      <SubTitle>
        추가정보 선택, 사업자 등록증 사진을 <br />
        추가하신 후 회원가입 요청을 해주세요! <br />
        사업자 인증이 완료된 후 이용가능합니다 😊
      </SubTitle>
      <SubContent>
        사업자 인증은 소곤소곤 관리자에 의해 <br />
        이루어지는 점 양해부탁드립니다.
      </SubContent>
      <InputContainer>
        <OneInput>
          <Inputcaption>업종 선택</Inputcaption>
          <Select>
            <Option value="" selected="selected">
              해당하는 업장을 선택해주세요
            </Option>
            <Option value="">단란, 유흥주점</Option>
            <Option value="">일반음식점</Option>
            <Option value="">카페, 제과점</Option>
            <Option value="">헤어/피부/미용</Option>
            <Option value="">숙박업</Option>
            <Option value="">슈퍼/ 편의점</Option>
            <Option value="">체육시설업</Option>
            <Option value="">의료업</Option>
            <Option value="">교육업</Option>
            <Option value="">기타업종</Option>
          </Select>
        </OneInput>
        <RegionContainer>
          <Inputcaption>지역 선택</Inputcaption>
          <SelectRegion>
            <Option value="" selected="selected">
              시도
            </Option>
            <Option value="">서울특별시</Option>
          </SelectRegion>

          <SelectRegion>
            <Option value="" selected="selected">
              시구군
            </Option>
            <Option value="">강남구</Option>
            <Option value="">강서구</Option>
            <Option value="">강동구</Option>
            <Option value="">송파구</Option>
            <Option value="">서초구</Option>
          </SelectRegion>

          <SelectRegion>
            <Option value="" selected="selected">
              법정동
            </Option>
            <Option value="">송파동</Option>
            <Option value="">잠실동</Option>
            <Option value="">석촌동</Option>
            <Option value="">가락동</Option>
          </SelectRegion>
        </RegionContainer>
        <AddImg to="#">📷 사업자 등록증 사진 추가</AddImg>
        <Button to="#">회원가입 요청</Button>
      </InputContainer>
    </Container>
  );
};

export default SignupFinPage;
