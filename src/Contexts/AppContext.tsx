import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

export const AppContext = createContext<{
  selectedTodos: number[];
  setSelectedTodos: (id: number) => void;
  removeSelectedTodos: (id: number) => void;
  clearSelectedTodos: () => void;
}>({
  selectedTodos: [],
  setSelectedTodos: (id: number) => {},
  removeSelectedTodos: (id: number) => {},
  clearSelectedTodos: () => {},
});

const AppContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useState<number[]>([]);
  const setSelectedTodos = useCallback((id: number) => {
    dispatch((prevState) => [...prevState, id]);
  }, []);
  const removeSelectedTodos = useCallback((id: number) => {
    dispatch((prevState) => prevState.filter((item) => item !== id));
  }, []);
  const clearSelectedTodos = useCallback(() => {
    dispatch([]);
  }, []);

  const value = useMemo(
    () => ({
      selectedTodos: state,
      setSelectedTodos,
      removeSelectedTodos,
      clearSelectedTodos,
    }),
    [state, setSelectedTodos, removeSelectedTodos, clearSelectedTodos]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
