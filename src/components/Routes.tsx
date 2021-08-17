import React from 'react'
import { Switch } from 'react-router-dom'
import { AuthRoute } from "./AuthRoute"
import MainPage from "./Main"
import ArticlesPage from "./Articles"
import StocksPage from "./Stocks"
import GreedPage from "./Greed"
import NewsPage from "./News"
import ChartPage from "./Charts"
import { PredictionsPage } from "./Predictions"

export const Routes = () => {
  return (
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/articles" component={ArticlesPage} />
      <AuthRoute exact path="/stocks" component={StocksPage} />
      <AuthRoute exact path="/greed" component={GreedPage} />
      <AuthRoute exact path="/news" component={NewsPage} />
      <AuthRoute exact path="/chart" component={ChartPage} />
      <AuthRoute exact path="/predictions" component={PredictionsPage} />
    </Switch>
  )
}