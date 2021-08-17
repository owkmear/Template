import {
	createAction,
	createReducer,
	PayloadAction
} from "typesafe-actions"
import {
	STOCKS_GET,
	STOCKS_RECEIVED,
	STOCKS_SET_FILTER
} from '../constants/ActionTypes'
import { Stock, StocksFilter } from '../model'

export type StocksState = {
	stocksList: Stock[]
	filter: StocksFilter
}

const defaultState: StocksState = {
	stocksList: [],
	filter: {
		name: '',
		symbol: '',
		price: ''
	}
}

export const actions = {
	getStocks: createAction(STOCKS_GET)<void>(),
	putStocksInStore: createAction(STOCKS_RECEIVED)<Stock[]>(),
	setStocksFilter: createAction(STOCKS_SET_FILTER)<StocksFilter>()
}

const reducer = createReducer(defaultState)
	.handleAction(
		actions.putStocksInStore,
		(state: StocksState, action: PayloadAction<string, Stock[]>) => {
			return {
				...state,
				stocksList: action.payload
			}
		}
	)
	.handleAction(
		actions.setStocksFilter,
		(state: StocksState, action: PayloadAction<string, StocksFilter>) => {
			return {
				...state,
				filter: {
					...state.filter,
					...action.payload
				}
			}
		}
	)

export default reducer