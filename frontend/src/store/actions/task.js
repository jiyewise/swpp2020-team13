import * as actionTypes from './types'
import axios from 'axios'
import history from '../../history'
import { closeModal } from './modal'

export const getAllTask_ = (tasks) => {
    return { type: actionTypes.GET_ALL_TASK, payload: tasks }
}

export const getAllTask = () => {
    return dispatch => {
        return axios.get('/api/v1/tasks/')
        .then(res => dispatch(getAllTask_(res.data)))
    }
}

export const addTask_ = (task) => {
    return {
        // type: actionTypes.ADD_GOAL,
        // title: goal.title,
        // photo: goal.photo ? goal.photo : null, 
        // created_at: goal.created_at ? goal.created_at : null,
        // deadline: goal.deadline ? goal.deadline : null,
        // tags: goal.tags ? goal.tags : null
        type: actionTypes.ADD_TASK,
        payload: {
            id: task.id,
            goal_id: task.goal_id,
            title: task.title,
            start_at: task.start_at,
            deadline: task.deadline,
            importance: task.importance,
            day_of_week: task.day_of_week
        }
    }
}

export const addTaskToGoal = task => {
    return {
        type: actionTypes.ADD_TASK_TO_GOAL,
        payload: {
            id: task.id,
            goal: task.goal_id,
            title: task.title,
            start_at: task.start_at,
            deadline: task.deadline,
            importance: task.importance,
            day_of_week: task.day_of_week
        }
    }
}

export const deleteTaskToGoal = (goal, id) => {
    return {
        type: actionTypes.DELETE_TASK_TO_GOAL,
        payload : {
            id: id,
            goal: goal
        }
    }   
}

export const addTask = (formData, file) => async dispatch => {
    const res = await axios.post('/api/v1/tasks/', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }) 
    console.log("addTask res.data: ", res.data)
    dispatch(addTask_(res.data))
    // history.push('/main')
    dispatch(closeModal())
    dispatch(addTaskToGoal(res.data))
}

export const deleteTask_ = (id) => {
    return {
        type: actionTypes.DELETE_TASK,
        payload: {
            id: id
        }
    }
}

export const deleteTask = (goal, id) => async dispatch =>{
    const res = await axios.delete('/api/v1/tasks/'+ id + '/')
    dispatch(deleteTask_(id))
    dispatch(deleteTaskToGoal(goal, id))
}

// export const deleteTask = (goal, id) => {
//     return dispatch => {
//         return axios.delete('/api/v1/tasks/'+ id)
//         .then(res => 
//             dispatch(deleteTask_(id))
//             dispatch(addTaskToGoal(goal, id))
//         )   
//     }
// }
