import React, { useEffect, useCallback, useState } from "react";
import { Link } from "gatsby";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import GlobalStyles from "../components/globalstyles";
import MyDropzone from "../components/dropzone";
import cameraIcon from "../assets/svgs/camera.svg";
import * as userActions from "../store/modules/user";
import * as commonActions from "../store/modules/common";

import { get, signupAxios } from "../utils/http";

const SignupFinPage = () => {
  const dispatch = useDispatch();
  const input = useSelector(({ user }) => user.input).toJS();
  const sector = input.sector_no;
  const region = input.region_bcode;
  const image = input.img;
  console.log(input);

  const [sectorList, setSectorList] = useState([]);
  const [regionList1, setRegionList1] = useState([]);
  const [regionList2, setRegionList2] = useState([]);
  const [regionList3, setRegionList3] = useState([]);

  // const [region1, setRegion1] = useState(0);

  const [isFirstSelected, setIsFirstSelected] = useState(false);
  const [isSecondSelected, setIsSecondSelected] = useState(false);

  const getSectorList = useCallback(() => {
    get(`/user/selectSectors`, data => {
      setSectorList(data.results);
    });
  }, []);

  const getRegionList1 = useCallback(() => {
    get(`/user/selectregion1`, data => {
      setRegionList1(data.result);
    });
  }, []);

  useEffect(() => {
    if (input.email === "") {
      console.log("네비게이트");
    }
    getSectorList();
    getRegionList1();
  }, [getSectorList, getRegionList1]);

  const onChangeInput = useCallback(e => {
    console.log(e.target.value);
    dispatch(
      userActions.setInput({ key: e.target.name, value: e.target.value })
    );
  }, []);

  const onSelectFirstRegion = useCallback(
    e => {
      const region1No = e.target.value; //임시 변수
      get(`/user/selectregion2?region_1_no=${region1No}`, data => {
        setRegionList2(data.results);
        setIsFirstSelected(true);
      });
    },
    [regionList1]
  );

  const onSelectSecondRegion = useCallback(
    e => {
      const region2No = e.target.value; //임시 변수
      get(`/user/selectregion3?region_2_no=${region2No}`, data => {
        setRegionList3(data.results);
        setIsSecondSelected(true);
      });
    },
    [regionList2]
  );

  const onClickSignup = useCallback(() => {
    console.log("회원가입");
    signupAxios(`/user`, { ...input }, res => {
      console.log(res);
    });
  }, [input]);

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
          <Select name="sector_no" onChange={onChangeInput}>
            <Option value="default" defaultValue>
              해당하는 업장을 선택해주세요
            </Option>
            {sectorList &&
              sectorList.map(sector => (
                <Option key={sector.no} value={sector.no}>
                  {sector.sector_name}
                </Option>
              ))}
          </Select>
        </OneInput>
        <RegionContainer>
          <Inputcaption>지역 선택</Inputcaption>
          <SelectRegion onChange={onSelectFirstRegion}>
            <Option value="default" defaultValue>
              시도
            </Option>
            {regionList1 &&
              regionList1.map(region => (
                <Option key={region.no} value={region.no}>
                  {region.bname}
                </Option>
              ))}
          </SelectRegion>

          <SelectRegion
            onChange={onSelectSecondRegion}
            disabled={!isFirstSelected}
          >
            <Option value="default" defaultValue>
              시구군
            </Option>
            {regionList2 &&
              regionList2.map(region => (
                <Option key={region.no} value={region.no}>
                  {region.bname}
                </Option>
              ))}
          </SelectRegion>

          <SelectRegion
            name="region_bcode"
            onChange={onChangeInput}
            disabled={!isSecondSelected}
          >
            <Option value="default" defaultValue>
              법정동
            </Option>
            {regionList3 &&
              regionList3.map(region => (
                <Option key={region.no} value={region.bcode}>
                  {region.bname}
                </Option>
              ))}
          </SelectRegion>
        </RegionContainer>
        <AddImg>
          <Object type="image/svg+xml" data={cameraIcon} />
          <MyDropzone text="사업자 등록증 사진 추가" />
        </AddImg>
        <Button name="signup" onClick={onClickSignup}>
          회원가입 요청
        </Button>
        <Button name="cancel" to="/login">
          취소
        </Button>
      </InputContainer>
    </Container>
  );
};

export default SignupFinPage;

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
  line-height: 15px;
`;

const SubContent = styled.div`
  font-size: 9px;
  margin-bottom: 18px;
  line-height: 12px;
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
`;

const Option = styled.option`
  width: 290px;
  height: 45px;
`;

const Inputcaption = styled.div`
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  padding: 5px;
`;

const AddImg = styled.button`
  width: 290px;
  height: 45px;
  padding: 10px 0;
  margin-top: 24px;
  font-size: 14px;
  border: 2px solid #dededf;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #fff;
`;

const Object = styled.object`
  width: 20px;
  margin-right: 5px;
`;

const Button = styled.button`
  display: block;
  width: 290px;
  height: 45px;
  margin-top: 22px;
  font-size: 14px;
  color: #fff;
  background: ${props => (props.name === "signup" ? "#5c3ec2" : "#000")};
  border: ${props => (props.name === "signup" ? "#5c3ec2" : "#000")};
  border-radius: 4px;
  cursor: pointer;
`;
