import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { actions } from '../../reducers'
import { GreedChart } from './GreedChart'
import { FearChart } from './FearChart'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const GreedPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const loadGreed = () => {
    dispatch(actions.getGreed())
  }

  return (
    <div className={classes.root}>
      <h1>Индекс жадности и страха</h1>
      <p>Индикатор страха и жадности показывает настроение инвесторов. В периоды большого страха рынки могут необоснованно сильно упасть. А в периоды большой жадности, активы часто растут выше справедливой цены</p>
      <p>Индикатор помогает выбрать лучшие периоды для покупки и продажи акций. Например, при экстремальной жадности на рынках (значение индекса выше 80 пунктов) лучше продавать активы, а не покупать их.</p>
      <Button onClick={() => loadGreed()} variant="contained" color="primary">Обновить</Button>
      <GreedChart />
      <FearChart />
    </div>
  )
}

export default GreedPage