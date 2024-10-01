import "../App.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Start Importing Icons >>
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "../App.css";
import { useToast } from "../Contexts/ToastContextToProvider";
import { useTodosDispatch } from "../Contexts/TodosProvider";

export default function Todo({ allTasks, openDialog, openEditDialog }) {
  // const { todos, dispatch } = useContext(TodosContext);

  const { showHideToast } = useToast();
  const dispatch = useTodosDispatch();
  // const [todos, dispatch] = useReducer(todoReducer, []);

  /*
              <IconButton
                aria-label="update"
                size="small"
                onClick={() => {
                  popUpEditOpen();
                  // احنا هنا عبينا الاستيت في الكيلك طب مكنت تخلي القيمه الافتراضيه هي اصلا الي انت جيت عبيتها فاهم
                  setEditInputValue({
                    title: allTasks.title,
                    details: allTasks.details,
                  });
                }}>
*/

  // Edit

  function handelCheckClick() {
    dispatch({ type: "checked", payload: allTasks.id });
    showHideToast("Changed Successfully");
  }

  return (
    <>
      <Card sx={{ color: "white" }} className="bg-gradiant todo">
        <CardContent className="task-container">
          <Grid
            container
            spacing={2}
            alignItems={"center"}
            className="task-holder">
            {/* <<< Start Task Details >>> */}
            <Grid className="task-details" item>
              <Typography
                variant="h6"
                textAlign={"start"}
                style={{
                  textDecoration: allTasks.isCompleted ? "line-through" : "",
                }}>
                {allTasks.title}{" "}
              </Typography>
              <Typography textAlign={"start"}>{allTasks.details}</Typography>
            </Grid>
            {/* <<< END Task Details >>> */}

            {/* <<<  Start Icons Action  >>> */}
            <Grid
              className="btn-container"
              item
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              {/* <<<< START Check Icon  >>>> */}
              <IconButton
                onClick={(e) => {
                  handelCheckClick();
                }}
                aria-label="finshed"
                size="small">
                <CheckIcon
                  className="icon-style"
                  // Use the conditon in the style by this way >>>>
                  style={{
                    backgroundColor: allTasks.isCompleted ? "#8bc34a" : "white",
                    color: allTasks.isCompleted ? "white" : "#8bc34a",
                    borderColor: allTasks.isCompleted ? "white" : "#8bc34a",
                  }}
                />
              </IconButton>
              {/* <<<<  END Check Icon  >>>> */}

              {/* <<<<  START Edit  >>>> */}
              <IconButton
                aria-label="update"
                size="small"
                onClick={() => {
                  openEditDialog(allTasks);
                  // popUpEditOpen();
                  // احنا هنا عبينا الاستيت في الكيلك طب مكنت تخلي القيمه الافتراضيه هي اصلا الي انت جيت عبيتها فاهم
                  // setEditInputValue({
                  //   title: allTasks.title,
                  //   details: allTasks.details,
                  // });
                }}>
                <UpdateIcon
                  className="icon-style"
                  style={{
                    color: "#90caf9",
                    borderColor: "#90caf9",
                  }}
                />
              </IconButton>
              {/* <<<<  END Edit  >>>> */}

              {/* Start Delet icon */}
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => {
                  openDialog(allTasks);
                }}>
                <DeleteForeverIcon
                  className="icon-style"
                  style={{
                    color: "#ff5060",
                    borderColor: "#ff818c",
                  }}
                />
              </IconButton>
              {/* End Delet icon */}
            </Grid>
            {/*  <<< End Icons Action >>>  */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
