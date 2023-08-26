export interface ILoginFormFields {
  email: string;
  password: string;
}

export interface ISignUpFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginResponse {
  user: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  authToken: string;
}

export interface ICreateTodo {
  title: string;
  description?: string;
  dueDate?: string | Date;
  priority?: "HIGH" | "MEDIUM" | "LOW";
}

export interface ITodoResponse extends ICreateTodo {
  id: number;
}
