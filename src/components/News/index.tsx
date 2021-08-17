import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../reducers'
import { NewsCards } from './NewsCards'
import { AppState, News } from '../../model'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const NewsPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const newsList: News[] = useSelector((state: AppState) => state.news.newsList)

  useEffect(() => {
    dispatch(actions.getNews())
  }, [dispatch])

  return (
    <div className={classes.root}>
      <h1>Новости</h1>
      <NewsCards news={newsList} />
    </div>
  )
}

export default NewsPage
