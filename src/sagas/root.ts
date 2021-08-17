import { spawn } from 'redux-saga/effects'
import { mainSaga } from './main'
import { chartsSaga } from './charts'
import { stocksSaga } from './stocks'
import { greedSaga } from './greed'
import { predictionsSaga } from './predictions'
import { newsSaga } from './news'

const sagas: { [index: string]: any } = {
  main: mainSaga,
  charts: chartsSaga,
  stocks: stocksSaga,
  greed: greedSaga,
  predictions: predictionsSaga,
  news: newsSaga
}

export function* rootSaga() {
  for (const name in sagas) {
    yield spawn(sagas[name])
  }
}
