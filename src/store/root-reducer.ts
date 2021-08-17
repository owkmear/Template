import { combineReducers } from 'redux'
import { stocks } from '../reducers'
import { greed } from '../reducers'
import { predictions } from '../reducers'
import { news } from '../reducers'
import { charts } from '../reducers'

const rootReducer = combineReducers({
  stocks,
  greed,
  predictions,
  news,
  charts
})

export default rootReducer
