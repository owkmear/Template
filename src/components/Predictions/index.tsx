import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { PredictionsCards } from './PredictionsCards'
import { PredictionModal } from './PredictionModal'
import { Filter } from './Filter'
import { useDispatch } from 'react-redux'
import { actions } from '../../reducers'
import { Prediction } from '../../model'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

export const PredictionsPage = () => {
  const dispatch = useDispatch()
  const [ currentPrediction, setCurrentPrediction ] = useState(null)
  const classes = useStyles()

  const removePrediction = (predictionId: number) => {
    dispatch(actions.removePrediction(predictionId))
  }

  const editPrediction = (prediction: Prediction) => {
    // @ts-ignore
    setCurrentPrediction(prediction)
  }

  return (
    <div className={classes.root}>
      <Filter />
      <PredictionsCards
        remove={removePrediction}
        edit={editPrediction}
      />
      <PredictionModal
        prediction={currentPrediction}
      />
    </div>
  )
}