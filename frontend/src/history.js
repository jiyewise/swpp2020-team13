import { createBrowserHistory } from 'history';
export const history = createBrowserHistory()

// const logger = store => {
//     return next => {
//         return action => {
//             console.log("[Middleware] Dispatching", action)
//             const result = next(action)
//             console.log("[Middleware] Next State", store.getState())
//             return result
//         }
//     }
// }

// export const middlewares = [logger, thunk, routerMiddleware(history)]

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, 
//     composeEnhancers(applyMiddleware(...middlewares)))

// export default store