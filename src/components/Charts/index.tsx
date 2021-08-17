import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CurrencySelect } from './CurrencySelect'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const ChartPage = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1>Графики криптовалют</h1>
      <CurrencySelect />
    </div>
  )
}

export default ChartPage
