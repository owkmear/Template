import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className="header_link">
            <Link to="/">
              Главная
            </Link>
          </Typography>
          <Typography variant="h6" className="header_link">
            <Link to="articles">
              Статьи
            </Link>
          </Typography>
          <Typography variant="h6" className="header_link">
            <Link to="stocks">
              Акции
            </Link>
          </Typography>
          <Typography variant="h6" className="header_link">
            <Link to="greed">
              Индекс жадности и страха
            </Link>
          </Typography>
          <Typography variant="h6" className="header_link">
            <Link to="news">
              Новости
            </Link>
          </Typography>
          <Typography variant="h6" className="header_link">
            <Link to="chart">
              Графики
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}