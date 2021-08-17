import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { AppState, Option } from '../../model'

const CurrencySelect = () => {
  const coinsList = useSelector((state: AppState) => state.charts.coinsList)
  const [selectedOption, setSelectedOption] = useState(null)
  const options: Option[] = coinsList.map((coin) => {
    return {
      label: coin.symbol,
      value: coin.symbol
    }
  })

  const onChangeOption = (item: any) => {
    setSelectedOption(item)
  }

  return <Select value={selectedOption} options={options} onChange={onChangeOption} />
}

export { CurrencySelect }
