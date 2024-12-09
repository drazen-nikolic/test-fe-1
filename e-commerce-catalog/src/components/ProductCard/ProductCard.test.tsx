import { fireEvent, render, screen } from '@testing-library/react'
import { IProduct } from '../../types/product.types'
import ProductCard from './ProductCard'

const mockProduct: IProduct = {
  productId: '1',
  name: 'Test Product',
  description: 'This is a test product',
  price: 100,
  currency: 'USD',
  category: 'Electronics',
  brand: 'Test Brand',
  images: ['test-image-url'],
  rating: 4.5,
  reviewsCount: 10,
  availability: 'In Stock',
  tags: ['test', 'product'],
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('ProductCard Component', () => {
  test('renders product details correctly', () => {
    render(<ProductCard {...mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('This is a test product')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Test Brand')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('#test')).toBeInTheDocument()
    expect(screen.getByText('#product')).toBeInTheDocument()
  })

  test('displays image correctly', () => {
    render(<ProductCard {...mockProduct} />)
    const image = screen.getByAltText('product-image-1') as HTMLImageElement
    expect(image.src).toContain('test-image-url')
  })

  test('handles image load error', () => {
    render(<ProductCard {...mockProduct} />)
    const image = screen.getByAltText('product-image-1') as HTMLImageElement
    fireEvent.error(image)
    expect(screen.getByText("Can't load image")).toBeInTheDocument()
  })
})
