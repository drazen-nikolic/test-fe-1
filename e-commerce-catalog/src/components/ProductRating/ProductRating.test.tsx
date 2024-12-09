import { render } from '@testing-library/react'
import ProductRating from './ProductRating'

describe('ProductRating', () => {
  it('renders the correct number of filled stars', () => {
    const { container } = render(<ProductRating value={3} />)
    const filledStars = container.querySelectorAll('.filled')
    expect(filledStars.length).toBe(3)
  })

  it('renders the correct number of empty stars', () => {
    const { container } = render(<ProductRating value={2} />)
    const emptyStars = container.querySelectorAll('.product-rating__container--star:not(.filled)')
    expect(emptyStars.length).toBe(3)
  })

  it('renders no filled stars when value is 0', () => {
    const { container } = render(<ProductRating value={0} />)
    const filledStars = container.querySelectorAll('.filled')
    expect(filledStars.length).toBe(0)
  })

  it('renders all filled stars when value is 5', () => {
    const { container } = render(<ProductRating value={5} />)
    const filledStars = container.querySelectorAll('.filled')
    expect(filledStars.length).toBe(5)
  })
})
