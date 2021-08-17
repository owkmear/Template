import React from 'react'
import { CryptoList } from './CryptoList'
import { useSelector } from 'react-redux'
import { AppState } from '../../model'

const MainPage = () => {
  const coinsList = useSelector((state: AppState) => state.stocks.stocksList.slice(0, 10))
  return (
    <div>
      <h1>Main page</h1>
      <CryptoList coins={coinsList} />
    </div>
  )
}

export default MainPage
