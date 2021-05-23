import React, { useCallback, useEffect } from "react";
import { navigate } from "gatsby";

import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";
import styled from "styled-components";

import * as commonActions from "../store/modules/common";
import GlobalStyles from "./globalstyles";
import Header from "./header";
import "./layout.css";

const Body = styled.div`
  margin: 0 auto;
  max-width: 960px; //테블릿 size
  margin-top: ${props => props.isShow && "80px"};
  padding-bottom: 15px;
`;

const Layout = ({ children, isShow, isBack }) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies();

  const tokenValidation = useCallback(() => {
    const token = cookies["token"];
    dispatch(commonActions.setToken(token));
  }, [cookies, dispatch]);

  const regionValidation = useCallback(() => {
    const region = cookies["region"];
    dispatch(commonActions.setRegionBcode(region));
  }, [cookies, dispatch]);

  const sectorValidation = useCallback(() => {
    const sector = cookies["sector"];
    dispatch(commonActions.setSectorNo(sector));
  }, [cookies, dispatch]);

  useEffect(() => {
    if (!cookies["token"]) {
      alert(`로그아웃 되었습니다. 다시 로그인 해주세요.`);
      navigate(`/login`);
    } else {
      tokenValidation();
      regionValidation();
      sectorValidation();
    }
  }, [cookies, tokenValidation, regionValidation, sectorValidation]);

  return (
    <>
      <GlobalStyles />
      <Body isShow={isShow}>
        {isShow && <Header isBack={isBack} />}
        <main>{children}</main>
      </Body>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isShow: PropTypes.bool,
  isBack: PropTypes.bool
};

Layout.defaultProps = {
  children: [],
  isShow: true,
  isBack: false
};

export default Layout;
