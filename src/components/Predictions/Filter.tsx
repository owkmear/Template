import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../reducers'
import { AppState, PredictionsFilter } from "../../model"

export const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state: AppState) => state.predictions.filter)

  const setFilter = (filter: PredictionsFilter) => {
    dispatch(actions.setPredictionsFilter(filter))
  }

  return (
    <div>
      <input
        type="text"
        placeholder={'Заголовок'}
        value={filter.title}
        onChange={(e) => setFilter({ ...filter, title: e.target.value })}
      />
      <input
        type="text"
        placeholder={'Предсказание'}
        value={filter.message}
        onChange={(e) => setFilter({ ...filter, message: e.target.value })}
      />
      <input
        type="text"
        placeholder={'Автор'}
        value={filter.author}
        onChange={(e) => setFilter({ ...filter, author: e.target.value })}
      />
    </div>
  )
}