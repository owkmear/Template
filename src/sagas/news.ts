import { put, take, fork } from 'redux-saga/effects'
import axios from 'axios'
import { NEWS_GET } from '../constants/ActionTypes'
import { actions } from '../reducers'
import { ServerAnswer, News } from '../model'

export function* newsSaga() {

	function* getNews() {
		const data = yield axios({
			method: 'get',
			url: 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN',
		}).then(response => {
			const data: ServerAnswer.News = response.data
			const parsedData = data.Data.map((n): News => {
				return {
					imageurl: n.imageurl,
					title: n.title,
					body: n.body,
					author: n.source_info.name,
					published: n.published_on,
					categories: n.categories,
					url: n.url
				}
			})
			return parsedData
		})

		yield put(actions.putNewsInStore(data))
	}

	try {
		let outer = true
		while (outer) {
			try {
				// TODO: refactor to takeEvery
				const action = yield take([NEWS_GET])
				yield fork(function* () {
					switch (action.type) {
						case NEWS_GET: {
							yield fork(getNews)
							break
						}
						default: { }
					}
				})
			} catch (e) {
				console.error('Critical error with news', e)
			}
		}
	} finally {
		console.log('newsSaga saga was finished')
	}
}