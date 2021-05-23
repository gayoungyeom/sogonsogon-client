import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { useCookies } from "react-cookie";

const LogoutPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(); // eslint-disable-line no-unused-vars

  useEffect(() => {
    removeCookie("token");
    removeCookie("region");
    removeCookie("sector");
    alert("로그아웃 되었습니다");
    navigate("/login");
  }, [removeCookie]);

  return <div>LOGOUT</div>;
};

export default LogoutPage;
