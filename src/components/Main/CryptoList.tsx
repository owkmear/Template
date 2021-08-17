import React, { FC } from 'react'
import { Stock } from '../../model'
import { CryptoCoin } from './CryptoCoin'

type Props = {
  coins: Stock[]
}

const CryptoList: FC<Props> = ({ coins }) => {
  return (
    <div className="cryptocoins">
      {coins.map((coin) => (
        <CryptoCoin key={coin.symbol} {...coin} />
      ))}
    </div>
  )
}

export { CryptoList }
