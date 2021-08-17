import React, { FC } from 'react'
import { parseFiat, parsePercentage } from '../../common/util'

type Props = {
  symbol: string
  name: string
  price: number
  change: number
}

const CryptoCoin: FC<Props> = ({ symbol, name, price, change }) => {

  const parseCoinChange = (price: number): JSX.Element => {
    const cls = ['cryptocoins__change']
    if (price >= 0) cls.push('positive')
    else cls.push('negative')
    return <div className={cls.join(' ')}>{parsePercentage(price)}</div>
  }

  return (
    <div className="cryptocoins__item">
      <div className="cryptocoins__symbol">{symbol}</div>
      <div className="cryptocoins__name">{name}</div>
      <div className="cryptocoins__price">{parseFiat(price)}</div>
      {parseCoinChange(change)}
    </div>)
}

export { CryptoCoin }
