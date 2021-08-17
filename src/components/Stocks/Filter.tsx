import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { actions } from '../../reducers'
import { AppState, StocksFilter } from "../../model"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))

export const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state: AppState) => state.stocks.filter)
  const classes = useStyles()

  const setFilter = (filter: StocksFilter) => {
    dispatch(actions.setStocksFilter(filter))
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        label="Полное название"
        variant="outlined"
        value={filter.name}
        onChange={(e) => setFilter({ ...filter, name: e.target.value })}
      />
      <TextField
        label="Символ"
        variant="outlined"
        value={filter.symbol}
        onChange={(e) => setFilter({ ...filter, symbol: e.target.value })}
      />
      <TextField
        label="Цена"
        variant="outlined"
        value={filter.price}
        onChange={(e) => setFilter({ ...filter, price: e.target.value })}
      />
    </form>
  )
}