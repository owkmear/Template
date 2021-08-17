import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { actions } from '../../reducers'
import { StocksTable } from './StocksTable'
import { Filter } from './Filter'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const StocksPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const loadStocks = () => {
    dispatch(actions.getStocks())
  }

  return (
    <div className={classes.root}>
      <h1>Акции</h1>
      <Filter />
      <Button onClick={() => loadStocks()} variant="contained" color="primary">Обновить</Button>
      <StocksTable />
    </div>
  )
}

export default StocksPage