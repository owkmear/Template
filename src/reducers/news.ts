import {
	createAction,
	createReducer,
	PayloadAction
} from "typesafe-actions"
import {
	NEWS_GET,
	NEWS_RECEIVED
} from '../constants/ActionTypes'
import { News } from '../model'

export type NewsState = {
	newsList: News[]
}

const defaultState: NewsState = {
	newsList: []
}

export const actions = {
	getNews: createAction(NEWS_GET)<void>(),
	putNewsInStore: createAction(NEWS_RECEIVED)<News[]>()
}

const reducer = createReducer(defaultState)
	.handleAction(
		actions.putNewsInStore,
		(state: NewsState, action: PayloadAction<string, News[]>) => {
			return {
				...state,
				newsList: action.payload
			}
		}
	)

export default reducer