import React, { useEffect, PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BaseLayout from "../Layouts/Base";
import axios from "axios";

type Props = {};

const WithUserLogin = ({ children }: PropsWithChildren<Props>) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("todo/user") || "{}");
    const isUserLoggedIn = !!user.authToken || false;
    if (!isUserLoggedIn) {
      navigate("/login");
    } else {
      axios.defaults.headers.common.Authorization = `Bearer ${user.authToken}`;
      if (pathname === "/") navigate("/list-tasks");
    }
  }, [navigate, pathname]);

  return <BaseLayout />;
};

export default WithUserLogin;
