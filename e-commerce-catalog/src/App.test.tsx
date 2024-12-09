import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
  test('renders Categories and Products components', () => {
    render(<App />)
    expect(screen.getByText(/Categories/i)).toBeInTheDocument()
    expect(screen.getByText(/Products/i)).toBeInTheDocument()
  })
})
