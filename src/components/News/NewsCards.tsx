import React, { FC } from 'react'
import { News } from '../../model'
import { NewsCard } from './NewsCard'

type Props = {
  news: News[]
}

export const NewsCards: FC<Props> = ({ news }) => {
  return (
    <div>
      {news.map((record) => (
        <NewsCard key={record.url} record={record} />
      ))}
    </div>
  )
}
