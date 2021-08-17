import {
	createAction,
	createReducer,
	PayloadAction
} from "typesafe-actions"
import {
	PREDICTIONS_GET,
	PREDICTIONS_RECEIVED,
	PREDICTION_CREATE,
	PREDICTION_UPDATE,
	PREDICTION_REMOVE,
	PREDICTION_SET_POPUP,
	PREDICTIONS_SET_FILTER
} from '../constants/ActionTypes'
import { Payload, Prediction, PredictionsFilter } from '../model'
import {StocksState} from "./stocks";

export type PredictionsState = {
	predictionsList: Prediction[]
	isPredictionEditorOpen: boolean
	filter: PredictionsFilter
}

const defaultState: PredictionsState = {
	predictionsList: [],
	isPredictionEditorOpen: false,
	filter: {
		title: '',
		message: '',
		author: ''
	}
}

export const actions = {
	getPredictions: createAction(PREDICTIONS_GET)<void>(),
	putPredictionsInStore: createAction(PREDICTIONS_RECEIVED)<Prediction[]>(),
	createPrediction: createAction(PREDICTION_CREATE)<Prediction>(),
	updatePrediction: createAction(PREDICTION_UPDATE)<Payload.UpdatePrediction>(),
	removePrediction: createAction(PREDICTION_REMOVE)<number>(),
	setPredictionEditorOpen: createAction(PREDICTION_SET_POPUP)<boolean>(),
	setPredictionsFilter: createAction(PREDICTIONS_SET_FILTER)<PredictionsFilter>()
}

const reducer = createReducer(defaultState)
	.handleAction(
		actions.putPredictionsInStore,
		(state: PredictionsState, action: PayloadAction<string, Prediction[]>) => {
			return {
				...state,
				predictionsList: action.payload
			}
		}
	)
	.handleAction(
		actions.setPredictionEditorOpen,
		(state: PredictionsState, action: PayloadAction<string, boolean>) => {
			return {
				...state,
				isPredictionEditorOpen: !!action.payload
			}
		}
	)
	.handleAction(
		actions.setPredictionsFilter,
		(state: StocksState, action: PayloadAction<string, PredictionsFilter>) => {
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