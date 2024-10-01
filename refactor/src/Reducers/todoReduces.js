export default function todoReducer(currentState, action) {
  // switch statement يفضل استخدام ال
  switch (action.type) {
    case "get": {
      return action.payload;
    }
    case "added": {
      const newTodo = {
        id:
          currentState.length > 0
            ? currentState[currentState.length - 1].id + 1
            : 1,
        title: action.payload.title,
        details: "Detailes ..",
        isCompleted: false,
      };
      const updatedTodos = [...currentState, newTodo];

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "updated": {
      let updatedTasks = currentState.map((task) => {
        console.log(task.title);

        return task.id == action.payload.specficTodo
          ? {
              ...task,
              title: action.payload.editedValue.title,
              details: action.payload.editedValue.details,
            } // دي معناها انك بتقوله كل مره تعمل كليك ويكون الايدي واحد غير من ترو لفولس
          : // ولو هي فولس غيرهالي لترو
            task;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "deleted": {
      let updatedTasks = currentState.filter((task) => {
        return task.id !== action.payload.specficTodo;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    case "checked": {
      // يبقا هنا انت كنت بتعدل بالفيلتر العكس بقايامعلم لو عاوز تعدل يبقا تعجل بالماب
      // عاوز تممسح استهدم الفيلتر
      let updatedTasks = currentState.map((task) => {
        return task.id == action.payload
          ? { ...task, isCompleted: !task.isCompleted } // دي معناها انك بتقوله كل مره تعمل كليك ويكون الايدي واحد غير من ترو لفولس
          : // ولو هي فولس غيرهالي لترو
            task;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTasks));
      return updatedTasks;
    }

    default:
      throw Error(action.type);
  }
}
