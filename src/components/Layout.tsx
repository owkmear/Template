import React from "react"
import { Helmet } from "react-helmet"
import { Header } from "./Header"
import { RouteProps } from 'react-router'

export const Layout = (props: RouteProps) => {
	const { children } = props
	return (
		<div>
			<Helmet>
				<title>Template</title>
			</Helmet>
			<Header />
			{children}
		</div>
	)
}