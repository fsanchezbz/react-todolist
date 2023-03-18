import React, { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [TaskList, setTaskList] = useState([]);
  const [Task, setTask] = useState("");

  // useState for Edit
  const [TaskEdit, setTaskEdit] = useState(0); //or null
  const [TextTask, setTextTask] = useState("");

  // Strart useEffect - LocalStore
  useEffect(() => {
    const list = localStorage.getItem("tasks");
    const loadedTaskList = JSON.parse(list);

    // console.log(loadedTaskList.count)
    // console.log(loadedTaskList.result)
    // console.log(loadedTaskList);

    if (loadedTaskList) {
      setTaskList(loadedTaskList);
    }
  }, []);

  useEffect(() => {
    const list = JSON.stringify(TaskList);
    localStorage.setItem("tasks", list);
  }, [TaskList]);

  // End useEffect - LocalStore

  //FUNTION SUMIT ACTION FORM
  const SubmitActionForm = (event) => {
    event.preventDefault();

    if (Task === "" || Task === null) {
      alert("Please enter a task");
    } else {
      const newTask = {
        id: "" + new Date().getTime() + Math.floor(Math.random() * 90000),
        text: Task,
        done: false,
        style: ""
      };
      //I add an item to the list
      setTaskList([...TaskList].concat(newTask));
      setTask(""); // clean input
    }
  };

  //FUNTION TO TAKE OUT THE ELEMENT
  const deleteTask = (id) => {
    // if return true incluid the elment in the array. if false NOT return the value.
    const updatedTaskList = [...TaskList].filter((Element) => {
      return Element.id !== id;
    });

    setTaskList(updatedTaskList); // update list with changes
  };

  //FUNTION TO switch on/off the checkbox and line-through
  const taskDone = (id) => {
    const updatedTaskList = [...TaskList].map((Element) => {
      if (Element.id === id) {
        Element.done = !Element.done;
        console.log(Element.style);
        Element.style === ""
          ? (Element.style = "line-through")
          : (Element.style = "");
      }
      return Element;
    });

    setTaskList(updatedTaskList); // update list with changes
  };

  //FUNTION Edit - Busca en la tabla y lo actualiza
  const FunctionEditTask = (id) => {
    const updatedTaskList = [...TaskList].map((Element) => {
      if (Element.id === id) {
        Element.text = TextTask;
      }
      return Element;
    });

    setTaskList(updatedTaskList); // update list with changes
    // reset our edit states
    setTaskEdit(null);
    setTextTask("");
  };

  return (
    <div className="App">
      <h1>TO DO LIST</h1>
      <div className="block">
        <form onSubmit={SubmitActionForm}>
          <input
            onChange={(event) => setTask(event.target.value)}
            value={Task}
            type="text"
            placeholder="Add a new task..."
          />

          {"  "}

          <button type="submit"> Add </button>
        </form>

        {/* Creacion de elementos de forma dinamica al agrear tareas */}
        {TaskList.map((Element) => (
          // To resolve Warning Error Child need a ID key={Task.id}
          <div key={Element.id}>
            {/* TaskEdit we use that als ID for the array */}
            {/* Only show the boton INPUT if you edit */}
            {TaskEdit === Element.id ? (
              <input
                type="text"
                onChange={(event) => setTextTask(event.target.value)}
                value={TextTask}
              />
            ) : (
              <span
                id="Tasklist"
                style={{ textDecoration: `${Element.style}` }}
              >
                {" "}
                {Element.text}{" "}
              </span>
            )}

            <button onClick={() => deleteTask(Element.id)}> Delete</button>

            {/* Only show the boton EDIT if you edit */}
            {TaskEdit === Element.id ? (
              <button onClick={() => FunctionEditTask(Element.id)}>
                {" "}
                save{" "}
              </button>
            ) : (
              <button onClick={() => setTaskEdit(Element.id)}> edit </button>
            )}
            <input
              type="checkbox"
              onChange={() => taskDone(Element.id)}
              checked={Element.done}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

//it is working => style={{textDecoration: "line-through"}}>
//it is working => style={{ textDecoration: `${Element.style}` }}

//style={{ text-decoration: {Task.style}}
// style={{ height: `${height}%` }}
// style="text-decoration:line-through;"
//{{`${Task.style}`}
//style={Task.style}
//style={{`${Task.style}`}}

