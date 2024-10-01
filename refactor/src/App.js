import "./App.css";
import TodoList from "./ToDoComponents/TodoList";
import { ThemeProvider, createTheme } from "@mui/material";
import { ToastProvider } from "./Contexts/ToastContextToProvider";
import { TodosProvider } from "./Contexts/TodosProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#dd2c00",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          {/*كدا بقينا بنستخدمها ك بروفيدر عادي جدا وبا الموضوع منظم جدا برضو */}
          {/*هنعوز نبعت الاستيت كلها  لكل ملف هيستخدممه فهنعمل اوبجيكت  نبعت فيه قيمه  القرائه وقيمه التعديل*/}
          {/* للعلم لو هتعبت اوبيجت بنفس السامائ بمعنى ان ال
          KEY & VALUE === نفس الاسم فاكتب بس اسم الفاليو وهتوصل عادي*/}
          <div
            className="App bg-gradiant"
            style={{
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;

// >> useReducer Ex
/*

// */
// import "./App.css";

// import { useReducer, useState } from "react";

// // Pram 1 == state الحاليه
// // Pram 2 == جديده state الي   state بيمثلكرد الفعل الي هتطبقه عليها عشان تقدر تغيرلي ال
// //  disatch والفعل ده راج يا معلم للبراميتررز الي هتحطها في ال
// //  بنبعتها كهيئه اوبجيكت  dispatch بس مهم كل مره بنبعت فيها ال
// // بيكون فيها ايه اول حاجه ال
// // dispatch({type:"وده انت بتوصف فيه اي الي حصل ", payload:"وجه بتبعت فيه الفعل او الناتج الي هتعرضه"})
// //  عشان يتم هناك اللوجيك reducer  ا نها بتمسك البيانات ال هتبعتهاله عشان توديها  للdispatch  يبقا كدا مهمه ال
// // والبيانات دي بيكونفيها نوع العمليه وبيانات العمليه الي انت عاوز تعملها
// function stateReducer(currentResultState, action) {
//   // console.log("claling the reducer >> ", currentResultState, action);

//   const { firstNumber, secondNumber } = action.payload;
//   if (action.type === "sum") {
//     return +firstNumber + +secondNumber;
//   } else if (action.type === "substraced") {
//     return +firstNumber - +secondNumber;
//   } else if (action.type === "multiple") {
//     return +firstNumber * +secondNumber;
//   } else if (action.type === "devide") {
//     return +firstNumber / +secondNumber;
//   }
// }

// function App() {
//   const [firstNumberInput, setFirstNumberInput] = useState(null);
//   const [secondNumberInput, setSecondNumberInput] = useState(null);

//   // useReducer >> prams
//   // pram 1 >> الفانكشن  بتاعت الي هيكون فيها اللوجيك بتاعك
//   // pram 2 >> state القيمه الافتراضيه لل
//   const [resultReudcer, dispatch] = useReducer(stateReducer, 10);
//   /*
//     state المتغير الاول هو الي بيمثلك ال
//     بس بطريقه غير مباشره state اقدر اعدل بيه على ال  actions المتغير التاني هو عباره عن الوسيط الي هيساعدني ابعت
//     useState  by >> state setState xxx بس مش من الشئع اننا نسميهم زي ماكنا بنسمي ال  useState  وهما يعتبرو شبه ال

// */

//   // EVENT HANDLERS
//   function handleSumClick() {
//     dispatch({
//       type: "sum",
//       payload: {
//         firstNumber: firstNumberInput,
//         secondNumber: secondNumberInput,
//       },
//     });
//   }

//   function handleSubClick() {
//     dispatch({
//       type: "substraced",
//       payload: {
//         firstNumber: firstNumberInput,
//         secondNumber: secondNumberInput,
//       },
//     });
//   }

//   function handleMultClick() {
//     dispatch({
//       type: "multiple",
//       payload: {
//         firstNumber: firstNumberInput,
//         secondNumber: secondNumberInput,
//       },
//     });
//   }

//   function handleDivClick() {
//     dispatch({
//       type: "devide",
//       payload: {
//         firstNumber: firstNumberInput,
//         secondNumber: secondNumberInput,
//       },
//     });
//   }

//   return (
//     <div className="App">
//       <div
//         style={{
//           height: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           flexDirection: "column",
//           alignItems: "center",
//           background: "teal",
//         }}>
//         {/* FIRST INPUT */}
//         <label>First Number</label>
//         <input
//           value={firstNumberInput}
//           onChange={(e) => setFirstNumberInput(e.target.value)}
//         />

//         {/* SECOND INPUT */}
//         <label>Second Number</label>
//         <input
//           value={secondNumberInput}
//           onChange={(e) => setSecondNumberInput(e.target.value)}
//         />

//         <button onClick={handleSumClick}>sum</button>

//         <button onClick={handleSubClick}>subtract</button>

//         <button onClick={handleMultClick}>multiply</button>

//         <button onClick={handleDivClick}>divide</button>

//         <hr />

//         <h2>{resultReudcer}</h2>
//       </div>
//     </div>
//   );
// }

// export default App;
