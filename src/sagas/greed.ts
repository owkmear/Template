import { put, take, fork } from 'redux-saga/effects'
import axios from 'axios'
import { GREED_GET } from '../constants/ActionTypes'
import { actions } from '../reducers'
import { ServerAnswer, Greed } from '../model'
import { parseDate } from '../common/util'

export function* greedSaga() {

	function* getGreeds() {
		const data = yield axios({
			method: 'get',
			url: 'https://api.alternative.me/fng/?limit=50',
		}).then(response => {
			const data: ServerAnswer.Greed = response.data
			const parsedData = data.data.map((g): Greed => {
				const timestamp = Number(g.timestamp + '000')
				return {
					value: Number(g.value),
					classification: g.value_classification,
					timestamp,
					dateFormatted: parseDate(timestamp),
					timeUntilUpdate: g.time_until_update ? Number(g.time_until_update) : undefined
				}
			})
			return parsedData
		})

		yield put(actions.putGreedInStore(data))
	}

	try {
		yield fork(getGreeds)

		let outer = true
		while (outer) {
			try {
				// TODO: refactor to takeEvery
				const action = yield take([GREED_GET])
				yield fork(function* () {
					switch (action.type) {
						case GREED_GET: {
							yield fork(getGreeds)
							break
						}
						default: { }
					}
				})
			} catch (e) {
				console.error('Critical error with greeds', e)
			}
		}
	} finally {
		console.log('greedsSaga saga was finished')
	}
}