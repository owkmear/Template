import React from "react"
import { Route } from 'react-router-dom'
import { Layout } from './Layout'

export const AuthRoute = (props: any) => {
  const { component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={props =>
        <Layout>
          <Component {...props} />
        </Layout>
      }
    />
  )
}