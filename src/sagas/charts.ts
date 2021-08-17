import { put, take, fork } from 'redux-saga/effects'
import axios from 'axios'
import { COINS_GET } from '../constants/ActionTypes'
import { actions } from '../reducers'
import { ServerAnswer, Coin } from '../model'

export function* chartsSaga() {
  function* getCoins() {
    const data = yield axios({
      method: 'get',
      url: 'https://min-api.cryptocompare.com/data/blockchain/list',
      headers: { authorization: 'Apikey d6f297f59171cfface31f5d9207d5d68128fdf197a82379a86363038a5d5f92d' },
    }).then((response) => {
      const data: ServerAnswer.Coin = response.data
      const parsedData: Coin[] = []
      for (let coin in data.Data) {
        parsedData.push({
          id: data.Data[coin].id,
          availableFrom: data.Data[coin].data_available_from,
          partnerSymbol: data.Data[coin].partner_symbol,
          symbol: data.Data[coin].symbol
        })
      }
      return parsedData
    })

    yield put(actions.putCoinsInStore(data))
  }

  try {
    yield fork(getCoins)

    let outer = true
    while (outer) {
      try {
        // TODO: refactor to takeEvery
        const action = yield take([COINS_GET])
        yield fork(function* () {
          switch (action.type) {
            case COINS_GET: {
              yield fork(getCoins)
              break
            }
            default: {
            }
          }
        })
      } catch (e) {
        console.error('Critical error with charts', e)
      }
    }
  } finally {
    console.log('ChartsSaga saga was finished')
  }
}
