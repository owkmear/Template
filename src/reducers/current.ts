import { createAction, createReducer, PayloadAction } from 'typesafe-actions'
import { CURRENT_SELECT_COIN } from '../constants/ActionTypes'

export type ChartsState = {
  coin: string
}

const defaultState: ChartsState = {
  coin: ''
}

export const actions = {
  selectCoin: createAction(CURRENT_SELECT_COIN)<string>()
}

const reducer = createReducer(defaultState)
  .handleAction(
    actions.selectCoin,
    (state: ChartsState, action: PayloadAction<string, string>) => {
      return {
        ...state,
        coin: action.payload
      }
    }
  )

export default reducer
