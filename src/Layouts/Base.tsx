import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {};

const BaseLayout = (props: Props) => {
  const navigate = useNavigate();

  const handleLogout = useCallback((): void => {
    localStorage.removeItem("todo/user");
    navigate("/login");
  }, [navigate]);

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h4" flexGrow={1}>
            Todo App
          </Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={(theme) => ({ ...theme.mixins.toolbar })}>
        <Outlet />
      </Box>
    </>
  );
};

export default BaseLayout;
