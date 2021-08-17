import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../model'
import { ChartData } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Greed } from '../../model'

const toChartData = (greedData: Greed[]): ChartData => {
  const labels = []
  const data = []
  for (let greed of greedData) {
    labels.push(greed.dateFormatted)
    data.push(greed.value)
  }
  return {
    labels,
    datasets: [
      {
        label: 'Индекс жадности и страха',
        data
      }
    ]
  }
}

export const GreedChart = () => {
  const greedList = useSelector((state: AppState) => state.greed.greedList)

  return (
    <div style={{ width: '1000px' }}>
      <Line
        data={toChartData(greedList)}
      />
    </div>
  )
}