import React, { useCallback, useContext, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteTwoTone";
import { ITodoResponse } from "../utils/Contants/types";
import { AppContext } from "../Contexts/AppContext";
import { deleteTodo } from "../Services/api";
import { toast } from "react-toastify";

type Props = {
  data: ITodoResponse;
  onDelete: (id: number) => void;
};

const TaskItem = ({ data, onDelete }: Props) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { selectedTodos, setSelectedTodos, removeSelectedTodos } =
    useContext(AppContext);

  const handleDeleteTodo = useCallback(async () => {
    try {
      setIsDeleting(true);
      await deleteTodo(data.id);
      toast.success("Task deleted successfully");
      onDelete(data.id);
    } catch (error) {
      toast.error("Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  }, [data.id, onDelete]);

  const handleCheckboxPress = () =>
    selectedTodos.find((item) => item === data.id)
      ? removeSelectedTodos(data.id)
      : setSelectedTodos(data.id);

  return (
    <Card
      sx={(theme) => ({ minWidth: `${theme.breakpoints.values.sm / 2}px` })}
    >
      <CardHeader title={data.title} />
      <CardContent>
        <Grid container direction={"column"}>
          <Grid item xs>
            <Typography variant="body1">{data.description}</Typography>
          </Grid>
          <Grid item xs>
            <Grid container flex={1}>
              <Grid item>
                <Typography variant="subtitle2">
                  {data.dueDate
                    ? new Date(data.dueDate || "").toLocaleString()
                    : null}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Priority:</Typography>
                <Typography variant="subtitle2">{data.priority}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <IconButton color="error" onClick={handleDeleteTodo}>
          {isDeleting ? <CircularProgress color="error" /> : <DeleteIcon />}
        </IconButton>
        <Checkbox
          checked={!!selectedTodos.find((item) => item === data?.id)}
          onChange={handleCheckboxPress}
          inputProps={{ "aria-label": "controlled" }}
        />
      </CardActions>
    </Card>
  );
};

export default TaskItem;
