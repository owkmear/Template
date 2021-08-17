import { put, call, take, fork } from 'redux-saga/effects'
import axios from 'axios'
import {
	PREDICTIONS_GET,
	PREDICTIONS_RECEIVED,
	PREDICTION_CREATE,
	PREDICTION_UPDATE,
	PREDICTION_REMOVE,
	PREDICTION_SET_POPUP
} from '../constants/ActionTypes'
import { actions } from '../reducers'
import { showErrorToast, compareData } from '../common/util'
import { Payload, Prediction } from '../model'

const {
	setPredictionEditorOpen
} = actions

export function* predictionsSaga() {

	function* getPredictions() {
		const data = yield axios({
			method: 'get',
			url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
			headers: { 'X-CMC_PRO_API_KEY': '12facc29-fada-4c42-b5e2-deb75a95e3f1' },
		}).then(response => {
			return response.data.map((p: any): Prediction => {
				return {
					id: p.id,
					title: p.title,
					message: p.message,
					date: p.date,
					author: p.author
				}
			})
		})

		yield put(actions.putPredictionsInStore(data))
	}

	function* createPrediction(prediction: Prediction) {
		try {
			yield axios({
				method: 'post',
				url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings',
				headers: { 'X-CMC_PRO_API_KEY': '12facc29-fada-4c42-b5e2-deb75a95e3f1' },
				data: prediction
			})

			yield put(setPredictionEditorOpen(false))
			yield fork(getPredictions)
		} catch(e) {
			showErrorToast(e)
		}
	}

	function* updatePrediction(newData: Prediction, oldData: Prediction) {
		const fields = ["title", "message"]
		const { needUpdate, params } = compareData(fields, newData, oldData)
		if (needUpdate) {
			try {
				yield axios({
					method: 'put',
					url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings',
					headers: { 'X-CMC_PRO_API_KEY': '12facc29-fada-4c42-b5e2-deb75a95e3f1' },
					data: params
				})

				yield put(setPredictionEditorOpen(false))
				yield fork(getPredictions)
			} catch (e) {
				showErrorToast(e)
			}
		} else {
			yield put(setPredictionEditorOpen(false))
		}
	}

	function* removePrediction(predictionId: number) {
		try {
			yield axios({
				method: 'put',
				url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/${predictionId}`,
				headers: { 'X-CMC_PRO_API_KEY': '12facc29-fada-4c42-b5e2-deb75a95e3f1' }
			})

			yield fork(getPredictions)
		} catch (e) {
			showErrorToast(e)
		}
	}

	try {

		let outer = true
		while (outer) {
			try {
				// TODO: refactor to takeEvery
				const action = yield take([
					PREDICTIONS_GET,
					PREDICTIONS_RECEIVED,
					PREDICTION_CREATE,
					PREDICTION_UPDATE,
					PREDICTION_REMOVE,
					PREDICTION_SET_POPUP
				])
				yield fork(function* () {
					switch (action.type) {
						case PREDICTIONS_GET: {
							yield fork(getPredictions)
							break
						}
						case PREDICTION_CREATE: {
							const prediction = action.payload as Prediction
							yield call(createPrediction, prediction)
							break
						}
						case PREDICTION_UPDATE: {
							const { oldData, newData } = action.payload as Payload.UpdatePrediction
							yield call(updatePrediction, newData, oldData)
							break
						}
						case PREDICTION_REMOVE: {
							const predictionId = action.payload as number
							yield call(removePrediction, predictionId)
							break
						}
						default: { }
					}
				})
			} catch (e) {
				console.error('Critical error with predictions', e)
			}
		}
	} finally {
		console.log('predictionsSaga saga was finished')
	}
}