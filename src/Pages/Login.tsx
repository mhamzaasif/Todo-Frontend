import React from "react";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Formik, FormikHelpers, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ILoginFormFields } from "../utils/Contants/types";
import { login } from "../Services/api";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be more than 7 character")
    .required("Password is required"),
});

const Login = (props: Props) => {
  const navigate = useNavigate();

  const handleFormSubmit = async (
    values: ILoginFormFields,
    { setSubmitting }: FormikHelpers<ILoginFormFields>
  ) => {
    try {
      setSubmitting(true);
      const { data } = await login(values);
      localStorage.setItem("todo/user", JSON.stringify(data));
      axios.defaults.headers.common.Authorization = `Bearer ${data.authToken}`;
      console.log("Header set");
      navigate("/");
    } catch (error) {
      toast.error("Failed to login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card
        variant="elevation"
        square
        sx={(theme) => ({
          padding: theme.spacing(5),
          [theme.breakpoints.up("md")]: {
            minWidth: `${theme.breakpoints.values.sm}px`,
          },
        })}
        elevation={10}
      >
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Grid container direction={"column"} spacing={4} display={"flex"}>
                <Grid item xs>
                  <Typography variant="h4">Login</Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs>
                  <Grid
                    container
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Grid item xs>
                      <Button type="submit" variant="contained">
                        Login
                      </Button>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body2">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default Login;
