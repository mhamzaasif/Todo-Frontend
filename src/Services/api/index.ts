import axios, { AxiosPromise } from "axios";
import {
  ICreateTodo,
  ILoginFormFields,
  ILoginResponse,
  ISignUpFields,
  ITodoResponse,
} from "../../utils/Contants/types";

axios.defaults.baseURL = "http://localhost:3001";

export const login = (values: ILoginFormFields): AxiosPromise<ILoginResponse> =>
  axios.post("/auth/login", values);

export const signup = (values: ISignUpFields): AxiosPromise<ILoginResponse> =>
  axios.post("/auth/register", values);

export const createTodo = (values: ICreateTodo): AxiosPromise<ITodoResponse> =>
  axios.post("/todos", values);

export const getTodos = (): AxiosPromise<ITodoResponse[]> =>
  axios.get("/todos");

export const deleteTodo = (id: number) => axios.delete(`/todos/${id}`);

export const deleteMultipleTodos = (ids: number[]) =>
  axios.delete("/todos/delete-multiple", { data: ids });
