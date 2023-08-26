import React from "react";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ISignUpFields } from "../utils/Contants/types";
import * as Yup from "yup";
import { signup } from "../Services/api";
import { toast } from "react-toastify";
import axios from "axios";

type Props = {};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .max(30, "Name cannot be longer than 30 characters"),
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be longer than 8 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .equals([Yup.ref("password")], "Passwords must match"),
});

const SignUp = (props: Props) => {
  const navigate = useNavigate();

  const handleFormSubmit = async (
    values: ISignUpFields,
    { setSubmitting }: FormikHelpers<ISignUpFields>
  ) => {
    try {
      setSubmitting(true);
      const { data } = await signup(values);
      axios.defaults.headers.common.Authorization = `Bearer ${data.authToken}`;
      navigate("/");
    } catch (error) {
      toast.error("Failed to sign up");
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
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Grid container direction={"column"} spacing={4} display={"flex"}>
                <Grid item xs>
                  <Typography variant="h4">Sign Up</Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
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
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
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
                        Sign Up
                      </Button>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body2">
                        Already have an account? <Link to="/login">Login</Link>
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

export default SignUp;
