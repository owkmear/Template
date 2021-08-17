import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppState, Stock, StocksFilter } from '../../model'
import useDebounce from '../../hooks/useDebounce'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

export const StocksTable = () => {
  const stocksList: Stock[] = useSelector((state: AppState) => state.stocks.stocksList)
  const filter: StocksFilter = useSelector((state: AppState) => state.stocks.filter)
  const [ filteredStocksList, setFilteredStocksList ] = useState(stocksList)

  const setFilter = () => {
    setFilteredStocksList(
      stocksList
        .filter(stock => stock.name.toLowerCase().includes(filter.name.trim().toLowerCase()))
        .filter(stock => stock.symbol.toLowerCase().includes(filter.symbol.trim().toLowerCase()))
        .filter(stock => stock.price.toString().toLowerCase().includes(filter.price.trim().toLowerCase()))
    )
  }

  const debounceFilter = useDebounce(setFilter, 500)

  useEffect(() => {
    debounceFilter()
  }, [debounceFilter, stocksList, filter.name, filter.symbol, filter.price])

  const classes = useStyles()

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell><b>Наименование</b></TableCell>
              <TableCell align="right"><b>Рыночная капитализация</b></TableCell>
              <TableCell align="right"><b>Цена</b></TableCell>
              <TableCell align="right"><b>Объем (за 24ч)</b></TableCell>
              <TableCell align="right"><b>Циркулирующее предложение</b></TableCell>
              <TableCell align="right"><b>Изменение (за 24ч)</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStocksList.map((stock: Stock) => (
              <TableRow key={stock.id}>
                <TableCell component="th" scope="row">{stock.name} ({stock.symbol})</TableCell>
                <TableCell align="right">${stock.marketCap}</TableCell>
                <TableCell align="right">${stock.price}</TableCell>
                <TableCell align="right">${stock.volume}</TableCell>
                <TableCell align="right">{`${stock.supply} ${stock.symbol}`}</TableCell>
                <TableCell align="right">{stock.change}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}