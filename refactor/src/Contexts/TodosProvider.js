import { createContext, useContext, useReducer } from "react";
import todoReducer from "../Reducers/todoReduces";
export const todosContext = createContext([]);
export const dispatchContext = createContext([]);

export function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    // يفضل نخلي عندنا اتنين بروفايدر واحد للتود  والتاي للديستباتش

    <todosContext.Provider value={todos}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </todosContext.Provider>
  );
}

export const useTodos = () => {
  return useContext(todosContext);
};

export const useTodosDispatch = () => {
  return useContext(dispatchContext);
};
