## To do list chi su  dung useState

import { useState } from "react";

function ToDoList() {
  
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState(() => {
    const storageTasks = JSON.parse(localStorage.getItem('tasks'))
    return storageTasks
  })

  const handleSubmit = () => {
    setTasks(prev => {
      const newTasks = [...prev,task]
      const jsonTask = JSON.stringify(newTasks)
      localStorage.setItem('tasks', jsonTask)
      return newTasks
    })
    setTask('')
  }
  return (
    <div className="To Do List" style={{padding: 32}}>

      <input 
        value = {task}
        onChange={e => setTask(e.target.value)} 
        placeholder="Enter task name"
      />
      <button onClick={handleSubmit}>Add</button>
      
      <ul>
        {tasks.map((task,index)=> (
          <>
            <li key={index}>{task} &time;</li>
          </>
        ))}
        
      </ul>
    </div>
  );
}

export default ToDoList;



##  To do List su dung useReducer


import {useState,useRef,useEffect,memo,useCallback,useMemo,useReducer} from "react";
import Content from "./Content";


// Init state
const initState = {
  task: '',
  tasks: []
}

// Actions
const SET_TASK = 'set_task'
const ADD_TASK = 'add_task'
const DELETE_TASK = 'delete_task'

const setTask = payload => {
  return {
    type: SET_TASK,
    payload
  }
}

const addTask = payload => {
  return {
    type: ADD_TASK,
    payload
  }
}

const deleteTask = payload => {
  return {
    type: DELETE_TASK,
    payload
  }
}

// Reducer
const reducer = (state, action) => {

  let newState

  switch (action.type) {
    case SET_TASK:
      newState = {
        ...state,
        task: action.payload
      }
      break
    case ADD_TASK:
      newState = {
        ...state,
        tasks: [...state.tasks, action.payload]
      }
      break
    case DELETE_TASK:
      const newTasks = [...state.tasks]

      newTasks.splice(action.payload, 1)

      newState = {
        ...state,
        tasks: newTasks
      }
      break

    default:
      throw new Error(`Invalid action`)
  }
  return newState
}

// Dispatch




function App() {

  const [state, dispatch] = useReducer(reducer, initState);
  const {task, tasks} = state
  const inputRef = useRef()

  // const  setTasks = useState(() => {
  //   const storageTasks = JSON.parse(localStorage.getItem('tasks'))
  //   return storageTasks
  // })

  const handleSubmit = () => {
    dispatch(addTask(task))
    dispatch(setTask(''))

    inputRef.current.focus()

  }


  return (
    <div style={{padding: 32}}>

      <h3>To do List</h3>
      <input 
        ref={inputRef}
        value = {task}
        onChange={e => {
          dispatch(setTask(e.target.value));
        }} 
        placeholder="Enter to do..."
      />
      <button onClick={handleSubmit}>Add</button>
      
      <ul>
        {tasks.map((task,index)=> (
          <>
            <li key={index}>
              {task}  
              <button onClick={() => dispatch(deleteTask(index))}>
                X
              </button>
            </li>
          </>
        ))}
      </ul>
      
    </div>
  );
}

export default App;