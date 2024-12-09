import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { getProducts } from '../../services/products.service'
import { IProduct } from '../../types/product.types'
import Products from './Products'

jest.mock('../../services/products.service')

const queryClient = new QueryClient()

const mockProducts: IProduct[] = [
  {
    productId: '1',
    name: 'Product 1',
    category: 'Category 1',
    description: 'Description 1',
    price: 100,
    currency: 'USD',
    brand: 'Brand 1',
    rating: 4.5,
    images: ['http://example.com/product1.jpg'],
    createdAt: new Date(),
    updatedAt: new Date(),
    reviewsCount: 0,
    availability: 'In Stock',
    tags: []
  },
  {
    productId: '2',
    name: 'Product 2',
    category: 'Category 2',
    description: 'Description 2',
    price: 200,
    currency: 'USD',
    brand: 'Brand 2',
    rating: 4.0,
    images: ['http://example.com/product1.jpg'],
    createdAt: new Date(),
    updatedAt: new Date(),
    reviewsCount: 0,
    availability: 'In Stock',
    tags: []
  }
]

describe('Products Component', () => {
  beforeEach(() => {
    ;(getProducts as jest.Mock).mockResolvedValue(mockProducts)
    localStorage.setItem('products', JSON.stringify(mockProducts))
  })

  afterEach(() => {
    localStorage.clear()
  })

  const renderComponent = (selectedCategories: string[] = []) => {
    const handleCategoriesToggle = jest.fn()
    return render(
      <QueryClientProvider client={queryClient}>
        <Products
          selectedCategories={selectedCategories}
          handleCategoriesToggle={handleCategoriesToggle}
        />
      </QueryClientProvider>
    )
  }

  it('should render products', async () => {
    renderComponent()
    expect(await screen.findByText('Product 1')).toBeInTheDocument()
    expect(await screen.findByText('Product 2')).toBeInTheDocument()
  })

  it('should filter products based on selected categories', async () => {
    renderComponent(['Category 1'])
    expect(await screen.findByText('Product 1')).toBeInTheDocument()
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument()
  })

  it('should display "No products found" when no products match the selected categories', async () => {
    renderComponent(['Category 3'])
    expect(await screen.findByText('No products found')).toBeInTheDocument()
  })

  it('should call handleCategoriesToggle when filter button is clicked', async () => {
    const handleCategoriesToggle = jest.fn()
    render(
      <QueryClientProvider client={queryClient}>
        <Products
          selectedCategories={[]}
          handleCategoriesToggle={handleCategoriesToggle}
        />
      </QueryClientProvider>
    )
    fireEvent.click(screen.getByRole('button'))
    expect(handleCategoriesToggle).toHaveBeenCalled()
  })
})
