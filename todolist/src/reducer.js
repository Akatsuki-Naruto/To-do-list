import {SET_TASK, ADD_TASK, DELETE_TASK} from './constants';

// Reducer
export const initState = {
    task: '',
    tasks: []
  }
  
  const reducer = (state, action) => {
  
  
    switch (action.type) {
      case SET_TASK:
        return {
          ...state,
          task: action.payload
        }
      case ADD_TASK:
        return {
          ...state,
          tasks: [...state.tasks, action.payload]
        }
      case DELETE_TASK:
        const newTasks = [...state.tasks]
  
        newTasks.splice(action.payload, 1)
  
        return {
          ...state,
          tasks: newTasks
        }
  
      default:
        throw new Error(`Invalid action`)
    }
  }

export default reducer