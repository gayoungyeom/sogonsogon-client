import * as React from "react";
import { Link, navigate } from "gatsby";

import PropTypes from "prop-types";
import styled from "styled-components";

import SearchIcon from "./searchIcon";
import back from "../assets/svgs/back.svg";

const Container = styled.div`
  width: 100%;
  height: 90px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  background: #f8f9fa;
  padding: 1.45rem 1.0875rem;
`;

const Back = styled.button`
  width: 30px;
  height: 30px;
  padding: 5px;
  border: none;
  cursor: pointer;
  background: url(${back}) center no-repeat;
  @media screen and (min-width: 960px) {
    display: none;
  }
`;

//로고 나오면 background ulr(img)로 바꾸기
const Logo = styled(Link)`
  display: inline-block;
  align-self: center;
  font-size: 28px;
  font-weight: bold;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const Search = styled(Link)``;

const Mypage = styled(Link)`
  margin: 0 15px;
  margin: 0 3vw;
  font-weight: bold;
`;

const Create = styled(Link)`
  display: flex;
  width: 64px;
  height: 45px;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #5c3ec2;
  border-radius: 3px;
`;

const Header = ({ siteTitle, isBack }) => {
  // const prevPath = useSelector(({ common }) => common.path);
  return (
    <Container>
      <Wrap>
        <Span>
          {isBack && <Back onClick={() => navigate(-1)} />}
          <Logo to="/">소곤소곤</Logo>
        </Span>
        <Span>
          <Search to="/search">
            <SearchIcon
              width={`12.558`}
              height={`12.457`}
              viewBox={`0 0 12.558 12.457`}
              d={`M12.388,10.77,9.942,8.344a.591.591,0,0,0-.417-.17h-.4A5.009,5.009,0,0,0,10.2,5.06a5.1,5.1,0,1,0-5.1,5.06,5.1,5.1,0,0,0,3.14-1.07v.4a.581.581,0,0,0,.172.414l2.446,2.425a.59.59,0,0,0,.832,0l.694-.688A.583.583,0,0,0,12.388,10.77ZM5.1,8.174A3.114,3.114,0,1,1,8.242,5.06,3.125,3.125,0,0,1,5.1,8.174Z`}
              fill={`#212529`}
            />
          </Search>
          <Mypage to="/my">MY</Mypage>
          <Create to="/create">글쓰기</Create>
        </Span>
      </Wrap>
    </Container>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  isBack: PropTypes.bool
};

Header.defaultProps = {
  siteTitle: ``,
  isBack: false
};

export default Header;
