import Container from "@mui/material/Container";

import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Typography from "@mui/material/Typography"; // like h1 || h2 || h3 etc >> but u select the type by (variant="h2")

import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";

import { Divider } from "@mui/material";

// >> Start Icons <<

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import SendIcon from "@mui/icons-material/Send";

// >> End Icons <<

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// Import Components
import Todo from "./Todo";
import { useState, useEffect, useMemo, useReducer } from "react";
import "../App.css";
import { useToast } from "../Contexts/ToastContextToProvider";
// import todoReducer from "../Reducers/todoReduces";

import { useTodos, useTodosDispatch } from "../Contexts/TodosProvider";
export default function TodoList() {
  // The reducerr >>
  // const [todos, dispatch] = useReducer(todoReducer, []);
  const todos = useTodos();
  const dispatch = useTodosDispatch();

  const { showHideToast } = useToast();

  // Add new Task State
  const [inputValue, setInputValue] = useState("");

  // Show task type (all===allTasks || completed === completedTasks || notCompleted === not completed Tasks)
  const [btnStatus, setBtnStatus] = useState("all");

  // Get the clicked Todo State >>
  const [specficTodo, setSpecficTodo] = useState({});

  // Delete state
  const [open, setOpen] = useState(false);

  // Edit state
  const [openEdit, setOpenEdit] = useState(false);
  const [editInputValue, setEditInputValue] = useState({});

  // We se use effect to get data from the local storage when frist load happen >>
  useEffect(() => {
    let storageTodos = JSON.parse(localStorage.getItem("todos")) ?? []; // بتقوله لو فاضيه حطلي بس ايه يا عمملم اراى عشان تتجنب اي خطا بس
    dispatch({ type: "get", payload: storageTodos });
    // console.log("Calling useEffect >> ");
  }, []);

  // Add task Handler
  function handelAddTask() {
    // if (inputValue.length > 0) {
    // setTodos([
    //   ...todos,
    //   {
    //     id: todos.length,
    //     title: inputValue,
    //     details: "Detailes ..",
    //     isCompleted: false,
    //   },
    // ]);

    // localStorage.setItem(
    //   "todos",
    //   JSON.stringify([
    //     ...todos,
    //     {
    //       id: todos.length + 1,
    //       title: inputValue,
    //       details: "Detailes ..",
    //       isCompleted: false,
    //     },
    //   ])
    // );

    // }
    dispatch({ type: "added", payload: { title: inputValue } });

    showHideToast("Added Successfully");

    // Clear the input value
    setInputValue("");
  }
  // === Add task Handler ===

  //  Start Delete Fn
  // قلنا اي تغير ي البيانات لازم نعمل استييت
  const popUpDeletOpen = (allTasks) => {
    setOpen(true);
    // setId(allTasks.id); // خدنا القيمه اصلا من الابن بفانكشن بعتنهاله ك بروب وبعد كدا استلمناها منه باننا عملنا اسيت
    setSpecficTodo(allTasks);
  };

  const popUpDeletCLose = () => {
    setOpen(false);
  };
  function handelDeleteTask() {
    dispatch({
      type: "deleted",
      payload: {
        specficTodo: specficTodo.id,
      },
    });

    showHideToast("Deleted Successfully");
  }
  //  END Delete Fn

  const popUpEditOpen = (allTasks) => {
    setOpenEdit(true);
    setEditInputValue({
      title: allTasks.title,
      details: allTasks.details,
    });
    // setId(allTasks.id); // خدنا القيمه اصلا من الابن بفانكشن بعتنهاله ك بروب وبعد كدا استلمناها منه باننا عملنا اسيت
    setSpecficTodo(allTasks);
  };

  const popUpEditCLose = () => {
    setOpenEdit(false);
  };
  function handelEditTaks() {
    dispatch({
      type: "updated",
      payload: {
        specficTodo: specficTodo.id,
        editedValue: editInputValue,
      },
    });
    showHideToast("Edited Successfully");
  }

  // Main function >>
  // البشمهندس عمل نفي الاتيشك بالكوندشن بس عمل تلاته اراى وعمل متغير المتغير جه
  // بياخد اسم الارى المناسبه في الحاله بتاعتها بالموندشن
  let idCounter = 1;
  let tasksData = useMemo(() => {
    return todos.map((task) => {
      idCounter++;

      // console.log(
      //   "Calling the component again cuz if state changes in any thing have state it will (((reRender))) the component "
      // );
      if (btnStatus === "completed") {
        if (task.isCompleted) {
          return (
            <Todo
              key={idCounter}
              allTasks={task}
              openDialog={popUpDeletOpen}
              openEditDialog={popUpEditOpen}
            />
          );
        }
      } else if (btnStatus === "notCompleted") {
        if (!task.isCompleted) {
          return (
            <Todo
              key={idCounter}
              allTasks={task}
              openDialog={popUpDeletOpen}
              openEditDialog={popUpEditOpen}
            />
          );
        }
      } else {
        return (
          <Todo
            key={idCounter}
            allTasks={task}
            openDialog={popUpDeletOpen}
            openEditDialog={popUpEditOpen}
          />
        );
      }
      // allTasks.isCompleted || !allTasks.isCompleted ? "" : "";
      // احنا هنا بنبعت يا معلم  ايه ؟؟ بنبعت للتودو كومبوننت الاوبججيكت بتاع الجزئيه الي اتعملها ريندر بس
      // بمعنى لو احنا مش عندنا الماب فانكشن اصلاكاكانك بتقوله اندكس 1 في الاراى ف بكل بساطه هناك هتقدر تاكسس على كل حاجه في الاندكس ده
      // هنعدل على الكود ونبعت الاوبجيكت كله عشان اتضح اننا محتاجين نعدل على حاجات تانيه
      // وهنضطر اننا نبعت فانكشن بتغير الاستيت بتاعت البيرنت يا معلم عشان اجنا عاوزين نغير الحاله بتاعه التاسك
      //
    });
  }, [todos, btnStatus]);

  return (
    <>
      {/* START Delete Modal */}
      <Dialog
        open={open}
        onClose={popUpDeletCLose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"Are you sure u wanna delete this task ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            if u delet it it will never come back again !!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={popUpDeletCLose} color="secondary">
            Disagree
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              handelDeleteTask();
              popUpDeletCLose();
            }}
            autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* END Delete Modal */}

      {/* Start Dialog Edit */}

      <Dialog
        open={openEdit}
        onClose={popUpEditCLose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            popUpEditCLose();
          },
        }}>
        <DialogTitle>Edit Your Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here u Can edit your task at any time Keep Going :))
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Edit Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setEditInputValue({
                ...editInputValue,
                title: e.target.value,
              });
            }}
            value={editInputValue.title}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Edit Details"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setEditInputValue({
                ...editInputValue,
                details: e.target.value,
              });
            }}
            value={editInputValue.details}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={popUpEditCLose}>Cancel</Button>
          <Button
            onClick={() => {
              handelEditTaks();
              setEditInputValue({
                title: editInputValue.title,
                details: editInputValue.details,
              });
            }}
            type="submit">
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* End Dialog Edit */}

      <Container maxWidth="sm">
        <Card className="card">
          <CardContent>
            {/*  >> Start Title  << */}
            <Typography variant="h3" style={{ fontWeight: "bold" }}>
              <Divider>Tasks</Divider>
            </Typography>
            {/*  <<< End Title  >>> */}

            {/* >>  Start Butons << */}

            {/*
          
          
          هنا يا معلم القيمه بتاعت الاب بتاعهم لو بتتطابق مع قيمه الابن 
          خيحطلك ظل عليها كلاس اكتيف مثلا
          وفي فانكشن ممكن تديها للبيرنت في التغير 
          onchange return e. taget.value >> هيجبلك قيمه الالزارا الي هتدوس عليه

          */}
            <ToggleButtonGroup
              className="btnGroup"
              color={"primary"}
              value={btnStatus}
              style={{ margin: "30px 0" }}>
              <ToggleButton
                className="btn"
                value="all"
                onClick={() => {
                  setBtnStatus("all");
                }}>
                All Tasks
                <FormatListBulletedIcon style={{ marginLeft: "5px" }} />
              </ToggleButton>
              <ToggleButton
                className="btn"
                value="completed"
                onClick={() => {
                  setBtnStatus("completed");
                }}>
                Finshed Tasks
                <PlaylistAddCheckIcon
                  style={{ marginLeft: "5px", fontSize: "30px" }}
                />
              </ToggleButton>
              <ToggleButton
                className="btn"
                value="notCompleted"
                onClick={() => {
                  setBtnStatus("notCompleted");
                }}>
                Not Finshed
                <SpeakerNotesOffIcon style={{ marginLeft: "5px" }} />
              </ToggleButton>
            </ToggleButtonGroup>
            {/* <<<  End Butons >>> */}
          </CardContent>

          {/* <<< START All Todods >>> */}
          <div className="todoHolder">{tasksData}</div>
          {/* <<< END All Todods >>> */}

          {/* <<<< START Input Add Button >>>> */}
          <Grid
            className="inputText"
            width={"98%"}
            margin={"0 auto"}
            container
            spacing={2}>
            <Grid xs={8}>
              <TextField
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                value={inputValue}
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Task Titile"
                variant="outlined"
              />
            </Grid>
            <Grid xs={4}>
              <Button
                onClick={() => {
                  handelAddTask();
                }}
                disabled={inputValue.length === 0}
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                endIcon={<SendIcon />}>
                Add
              </Button>
            </Grid>
          </Grid>
          {/* <<<< END Input Add Button >>>> */}
        </Card>
      </Container>
    </>
  );
}
