import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';                                           
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import history from '../history'
import {middlewares} from '../store/store'

const getMockAuthReducer = jest.fn(
  initialState => (state = initialState.auth || null, action) => {
    switch (action.type) {
      default:
        break;
    }
    console.log("[DEBUG] mock auth state", state)
    return state;
  }
)

const getMockGoalReducer = jest.fn(
    initialState => (state = initialState.goal || {}, action) => {
        switch (action.type) {
            default:
              break;
        }
        return state
    }
)

const getMockModalReducer = jest.fn(
    initialState => (state = initialState.modal || {}, action) => {
        switch (action.type) {
            default:
              break;
        }
        console.log("[DEBUG] mock modal state", state)
        return state
    }
)
const getMockTaskReducer = jest.fn(
    initialState => (state = initialState.task || {}, action) => {
        switch (action.type) {
            default:
              break;
        }
        return state
    }
)

const getMockAchReducer = jest.fn(
  initialState => (state = initialState || {}, action) => {
      switch (action.type) {
          default:
            break;
      }
      return state
  }
)


const getMockExploreReducer = jest.fn(
  initialState => (state = initialState || {}, action) => {
      switch (action.type) {
          default:
            break;
      }
      return state
  }
)

export const getMockStore = (initialState) => {
  const mockAuthReducer = getMockAuthReducer(initialState);
  const mockGoalReducer = getMockGoalReducer(initialState)
  const mockModalReducer = getMockModalReducer(initialState)
  const mockTaskReducer = getMockTaskReducer(initialState)
  const mockAchReducer = getMockAchReducer(initialState)
  const mockExploreReducer = getMockExploreReducer(initialState)

  const rootReducer = combineReducers({
    auth: mockAuthReducer,
    goal: mockGoalReducer,
    task: mockTaskReducer,
    modal: mockModalReducer,
    explore: mockExploreReducer,
    achievement: mockAchReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
}

