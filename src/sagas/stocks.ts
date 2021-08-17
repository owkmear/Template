import { put, take, fork } from 'redux-saga/effects'
import axios from 'axios'
import { STOCKS_GET } from '../constants/ActionTypes'
import { actions } from '../reducers'
import { ServerAnswer, Stock } from '../model'

export function* stocksSaga() {

	function* getStocks() {
		const data = yield axios({
			method: 'get',
			url:
				'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
			headers: { 'X-CMC_PRO_API_KEY': '12facc29-fada-4c42-b5e2-deb75a95e3f1' },
		}).then(response => {
			const data: ServerAnswer.Stock = response.data
			const parsedData = data.data.map((s): Stock => {
				return {
					id: s.id,
					name: s.name,
					symbol: s.symbol,
					marketCap: s.quote.USD.market_cap,
					price: s.quote.USD.price,
					volume: s.quote.USD.volume_24h,
					supply: s.circulating_supply,
					change: s.quote.USD.percent_change_24h
				}
			})
			return parsedData
		})

		yield put(actions.putStocksInStore(data))
	}

	try {
		yield fork(getStocks)

		let outer = true
		while (outer) {
			try {
				// TODO: refactor to takeEvery
				const action = yield take([STOCKS_GET])
				yield fork(function* () {
					switch (action.type) {
						case STOCKS_GET: {
							yield fork(getStocks)
							break
						}
						default: { }
					}
				})
			} catch (e) {
				console.error('Critical error with stocks', e)
			}
		}
	} finally {
		console.log('StocksSaga saga was finished')
	}
}