import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { getCategories } from '../../services/categories.service'
import { ICategory } from '../../types/category.types'
import Categories from './Categories'

jest.mock('../../services/categories.service')

const queryClient = new QueryClient()

const mockCategories: ICategory[] = ['Category 1', 'Category 2']

describe('Categories Component', () => {
  const handleCategorySelection = jest.fn((categoryId: string) => categoryId)
  const handleCategoriesToggle = jest.fn()

  beforeEach(() => {
    ;(getCategories as jest.Mock).mockResolvedValue(mockCategories)
  })

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <Categories
          selectedCategories={[]}
          handleCategorySelection={handleCategorySelection}
          handleCategoriesToggle={handleCategoriesToggle}
        />
      </QueryClientProvider>
    )

  it('should render loading skeletons initially', () => {
    renderComponent()
    const skeletons = screen.getAllByText('', { selector: '.skeleton' })
    expect(skeletons.length).toBe(10)
  })

  it('should render categories after loading', async () => {
    renderComponent()
    const categoryItems = await screen.findAllByRole('listitem')
    expect(categoryItems.length).toBe(mockCategories.length)
  })

  it('should call handleCategoriesToggle when close button is clicked', () => {
    renderComponent()
    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)
    expect(handleCategoriesToggle).toHaveBeenCalled()
  })
})
