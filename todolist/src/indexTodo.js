import {useRef,useReducer} from "react";
import reducer, {initState} from "./reducer";
import { setTask,addTask,deleteTask } from "./actions";
import logger from "./logger";



// Dispatch

function TodoApp() {

  const [state, dispatch] = useReducer(logger(reducer), initState);
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
            <li key={index} >
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

export default TodoApp;
