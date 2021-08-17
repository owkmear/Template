import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from './root-reducer'
import { rootSaga } from '../sagas/root'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	rootReducer,
	applyMiddleware(logger, sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

export default store