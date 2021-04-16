import * as React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  /* max-width: 960px; */
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.45rem 1.0875rem;
  background: #f8f9fa;
  border-bottom: 2px solid #fff;
  position: fixed;
  top: 0;
  left: 0;
`;

//로고 나오면 background ulr(img)로 바꾸기
const Logo = styled(Link)`
  display: inline-block;
  align-self: center;
  font-size: 28px;
  font-weight: bold;
`;

const Right = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const Search = styled(Link)``;

const Mypage = styled(Link)`
  margin: 0 15px;
  margin: 0 3vw;
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

const Header = ({ siteTitle }) => {
  return (
    <Container>
      <Logo to="/">소곤소곤</Logo>
      <Right>
        <Search to="#">🔍</Search>
        <Mypage to="#">MY</Mypage>
        <Create to="/create">글쓰기</Create>
      </Right>
    </Container>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
