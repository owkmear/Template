import React, { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { AppState, Prediction, PredictionsFilter } from '../../model'

type Props = {
  remove: (predictionId: number) => void
  edit: (prediction: Prediction) => void
}

export const PredictionsCards: FC<Props> = ({ remove, edit }) => {
  const predictionsList: Prediction[] = useSelector((state: AppState) => state.predictions.predictionsList)
  const filter: PredictionsFilter = useSelector((state: AppState) => state.predictions.filter)
  const [ filteredPredictionsList, setFilteredPredictionsList ] = useState(predictionsList)

  const removePrediction = (event: any, predictionId: number) => {
    event.stopPropagation()
    remove(predictionId)
  }

  const editPrediction = (event: any, prediction: Prediction) => {
    event.stopPropagation()
    edit(prediction)
  }

  useEffect(() => {
    const setFilter = () => {
      setFilteredPredictionsList(
        predictionsList
          .filter(prediction => prediction.title.includes(filter.title))
          .filter(prediction => prediction.message.includes(filter.message))
          .filter(prediction => prediction.author.includes(filter.author))
      )
    }
    const debounceFilter = _.debounce(setFilter, 300)
    debounceFilter()
  }, [predictionsList, filter.title, filter.message, filter.author])

  return (
    <div>
      {filteredPredictionsList && filteredPredictionsList.map(prediction => (
        <div>
          <span onClick={(event: any) => { editPrediction(event, prediction) }}>Редактировать</span>
          <h5>{prediction.title}</h5>
          <p>{prediction.message}</p>
          <p>{(new Date(prediction.date)).toLocaleString()}</p>
          <p>{prediction.author}</p>
          <span onClick={(event: any) => { removePrediction(event, prediction.id) }}>Удалить</span>
        </div>
      ))}
    </div>
  )
}