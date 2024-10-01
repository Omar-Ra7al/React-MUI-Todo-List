import { useState, createContext, useContext } from "react";
import SnackBar from "../ToDoComponents/MySnakBar";

export const toastContext = createContext({});

export function ToastProvider({ children }) {
  const [openToast, setOpenToast] = useState(false);
  const [msgToast, setMsgToast] = useState("");

  const showHideToast = (massage) => {
    setOpenToast(true);
    setTimeout(() => {
      setOpenToast(false);
    }, 2000);
    setMsgToast(massage);
  };
  return (
    <toastContext.Provider value={{ showHideToast }}>
      <SnackBar open={openToast}>{msgToast} </SnackBar>
      {children}
    </toastContext.Provider>
  );
}
export const useToast = () => {
  return useContext(toastContext);
};
