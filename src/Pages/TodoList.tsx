import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteMultipleTodos, getTodos } from "../Services/api";
import { ITodoResponse } from "../utils/Contants/types";
import { toast } from "react-toastify";
import TaskItem from "../Components/TaskItem";
import { AppContext } from "../Contexts/AppContext";

type Props = {};

const TodoList = (props: Props) => {
  const [todos, setTodos] = useState<ITodoResponse[]>();
  const { selectedTodos, clearSelectedTodos } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await getTodos();
        setTodos(data);
      } catch (err) {
        toast.error("Failed to fetch tasks");
      }
    };
    fetchTodos();
  }, []);

  const handleDelete = useCallback((id: number) => {
    console.log("🚀 ~ file: TodoList.tsx:29 ~ TodoList ~ id:", id);

    setTodos((prevState) => prevState?.filter((item) => item.id !== id));
  }, []);

  const handleCreateTodo = useCallback(
    () => navigate("/create-task"),
    [navigate]
  );

  const handleDeleteMultipleTasks = async () => {
    try {
      await deleteMultipleTodos(selectedTodos);
      setTodos((prevState) =>
        prevState?.filter((item) => !selectedTodos.includes(item.id))
      );
      clearSelectedTodos();
      toast.success("Tasks deleted successfully");
    } catch (error) {
      toast.error("Failed to delete tasks");
    }
  };

  return (
    <Box position={"relative"} sx={(theme) => ({ padding: theme.spacing(5) })}>
      <Grid container spacing={0} display={"flex"} direction={"column"}>
        <Grid item xs display={"flex"} justifyContent={"flex-end"}>
          {!!selectedTodos.length && (
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteMultipleTasks}
              sx={{ mr: 2 }}
            >
              Delete Selected Tasks
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTodo}
          >
            Create Task
          </Button>
        </Grid>
        <Grid item xs>
          <Grid container spacing={2}>
            {todos?.map((todo) => (
              <Grid item key={todo.id}>
                <TaskItem data={todo} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TodoList;
