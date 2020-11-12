import { combineReducers } from 'redux'
import authReducer from './authReducer'
import goalReducer from './goalReducer'
import taskReducer from './taskReducer'
import { connectRouter } from 'connected-react-router'
import history from '../../history'
import modalReducer from './modalReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  goal: goalReducer,
  task: taskReducer,
  modal: modalReducer,
  router: connectRouter(history)
})

export default rootReducer
