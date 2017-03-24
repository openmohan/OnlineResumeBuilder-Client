import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/reducers.js'
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()


export default function configureStore(preloadedstate){
	return createStore(
		rootReducer,
		preloadedstate,
		applyMiddleware(
				thunkMiddleware,
				loggerMiddleware
			)
		)
}
export const store= applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)(createStore)(rootReducer);
