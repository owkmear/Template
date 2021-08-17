import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders main page link', () => {
  render(<App />)
  const linkElement = screen.getByText(/Главная/i)
  expect(linkElement).toBeInTheDocument()
})