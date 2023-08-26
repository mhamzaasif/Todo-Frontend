import React from "react";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ICreateTodo } from "../utils/Contants/types";
import { toast } from "react-toastify";
import { createTodo } from "../Services/api";
import { useNavigate } from "react-router-dom";

type Props = {};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string()
    .max(250, "Description cannot be more than 250 characters")
    .optional(),
  dueDate: Yup.date().optional(),
  priority: Yup.mixed<"HIGH" | "MEDIUM" | "LOW">()
    .oneOf(["HIGH", "LOW", "MEDIUM"])
    .optional(),
});

const CreateTodo = (props: Props) => {
  const navigate = useNavigate();

  const handleFormSubmit = async (
    values: ICreateTodo,
    { setSubmitting }: FormikHelpers<ICreateTodo>
  ) => {
    console.log("🚀 ~ file: CreateTodo.tsx:39 ~ CreateTodo ~ values:", values);
    try {
      setSubmitting(true);
      await createTodo({ ...values });
      toast.success("Task created successfully");
      navigate("/list-tasks");
    } catch (error) {
      toast.error("Failed to create todo");
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
            title: "",
            description: "",
            dueDate: "",
            priority: "LOW",
          }}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Form>
              <Grid container direction={"column"} spacing={4} display={"flex"}>
                <Grid item xs>
                  <Typography variant="h4">Create Todo</Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    multiline
                    maxRows={10}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    id="dueDate"
                    name="dueDate"
                    label="Due Date"
                    value={values.dueDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.dueDate && Boolean(errors.dueDate)}
                    helperText={touched.dueDate && errors.dueDate}
                    type="date"
                  />
                </Grid>
                <Grid item xs>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      label="Priority"
                      value={values.priority}
                      fullWidth
                      onChange={(e) =>
                        setFieldValue("priority", e.target.value)
                      }
                      onBlur={handleBlur}
                    >
                      <MenuItem value={"HIGH"}>High</MenuItem>
                      <MenuItem value={"MEDIUM"}>Medium</MenuItem>
                      <MenuItem value={"LOW"}>Low</MenuItem>
                    </Select>
                  </FormControl>
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
                        Create Todo
                      </Button>
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

export default CreateTodo;
