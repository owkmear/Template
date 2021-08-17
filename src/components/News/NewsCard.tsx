import React, { FC } from 'react'
import { News } from '../../model'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    display: 'grid',
    margin: '5px',
  },
  title: {
    fontSize: 14,
  }
})

type Props = {
  record: News,
}

const NewsCard: FC<Props> = ({ record }) => {
  const classes = useStyles()

  const time = new Date(record.published * 1000).toLocaleString()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <b>{record.author}</b> {time}
        </Typography>
        <Typography variant="h5" component="h2">
          {record.title}
        </Typography>
        <Typography color="textSecondary">
          {record.body}
        </Typography>
        <Typography variant="body2" component="p">
          {record.categories}
        </Typography>
      </CardContent>
    </Card>
  )
}

export { NewsCard }
