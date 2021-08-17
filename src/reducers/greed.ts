import {
	createAction,
	createReducer,
	PayloadAction
} from "typesafe-actions"
import {
	GREED_GET,
	GREED_RECEIVED
} from '../constants/ActionTypes'
import { Greed } from '../model'

export type GreedState = {
	greedList: Greed[]
}

const defaultState: GreedState = {
	greedList: []
}

export const actions = {
	getGreed: createAction(GREED_GET)<void>(),
	putGreedInStore: createAction(GREED_RECEIVED)<Greed[]>()
}

const reducer = createReducer(defaultState)
	.handleAction(
		actions.putGreedInStore,
		(state: GreedState, action: PayloadAction<string, Greed[]>) => {
			return {
				...state,
				greedList: action.payload
			}
		}
	)

export default reducer