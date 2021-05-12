import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import Header from "./header";
import GlobalStyles from "./globalstyles";
import "./layout.css";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import * as commonActions from "../store/modules/common";

const Body = styled.div`
  margin: 0 auto;
  max-width: 960px; //테블릿 size
  margin-top: ${props => props.isShow && "90px"};
`;

const Layout = ({ children, isShow, isBack }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const dispatch = useDispatch();

  const [cookies] = useCookies();
  const tokenValidation = useCallback(() => {
    //쿠키에 토큰이 있으면 리덕스에 저장
    const token = cookies["token"];
    dispatch(commonActions.setToken(token));
  }, [cookies, dispatch]);

  useEffect(() => {
    tokenValidation();
  }, [tokenValidation]);

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
