import {
  createStore,
  applyMiddleware,
  compose,
  // combineReducers,
} from 'redux'
import thunk from 'redux-thunk'
import { contactReducer } from './reducers/contactReducer'
// import { userReducer } from './reducers/userReducer'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  contactReducer,
  composeEnhancers(applyMiddleware(thunk))
)

window.myStore = store
