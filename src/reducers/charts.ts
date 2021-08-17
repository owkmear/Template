import { createAction, createReducer, PayloadAction } from 'typesafe-actions'
import { COINS_GET, COINS_RECEIVED } from '../constants/ActionTypes'
import { Coin } from '../model'

export type ChartsState = {
  coinsList: Coin[]
}

const defaultState: ChartsState = {
  coinsList: []
}

export const actions = {
  getCoins: createAction(COINS_GET)<void>(),
  putCoinsInStore: createAction(COINS_RECEIVED)<Coin[]>()
}

const reducer = createReducer(defaultState).handleAction(actions.putCoinsInStore, (state: ChartsState, action: PayloadAction<string, Coin[]>) => {
  return {
    ...state,
    coinsList: action.payload
  }
})

export default reducer
