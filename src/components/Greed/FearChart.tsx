import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../model'
import { Chart } from 'react-google-charts'

const toChartData = (greedData: any[]) => {
  const res = greedData.map((greed) => [new Date(greed.timestamp), greed.value])
  res.unshift([{ type: 'date', label: 'Day' }, 'Индекс'])
  return res
}

export const FearChart = () => {
  const greedList = useSelector((state: AppState) => state.greed.greedList)
  return (
    <div style={{ width: '1000px' }}>
      <Chart
        chartType="LineChart"
        loader={<div>Загрузка...</div>}
        data={toChartData(greedList)}
        options={{
          title: 'Индекс жадности и страха',
          hAxis: {
            title: 'Дата',
          },
          vAxis: {
            title: 'Индекс',
          },
          legend: 'none',
        }}
        width={'100%'}
        height={'400px'}
      />
    </div>
  )
}
