import { fireEvent, render, screen } from '@testing-library/react'
import { ICategory } from '../../types/category.types'
import CategoriesList from './CategoriesList'

const mockCategories: ICategory[] = ['Electronics', 'Books', 'Clothing']
const mockSelectedCategories: string[] = ['Books']
const mockHandleCategorySelection = jest.fn()

describe('CategoriesList', () => {
  it('renders without crashing', () => {
    render(
      <CategoriesList
        data={mockCategories}
        selectedCategories={mockSelectedCategories}
        handleCategorySelection={mockHandleCategorySelection}
      />
    )
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('Books')).toBeInTheDocument()
    expect(screen.getByText('Clothing')).toBeInTheDocument()
  })

  it('checks the correct categories', () => {
    render(
      <CategoriesList
        data={mockCategories}
        selectedCategories={mockSelectedCategories}
        handleCategorySelection={mockHandleCategorySelection}
      />
    )
    const booksCheckbox = screen.getByLabelText('Books') as HTMLInputElement
    expect(booksCheckbox.checked).toBe(true)

    const electronicsCheckbox = screen.getByLabelText('Electronics') as HTMLInputElement
    expect(electronicsCheckbox.checked).toBe(false)
  })

  it('calls handleCategorySelection when a category is clicked', () => {
    render(
      <CategoriesList
        data={mockCategories}
        selectedCategories={mockSelectedCategories}
        handleCategorySelection={mockHandleCategorySelection}
      />
    )
    const electronicsCheckbox = screen.getByLabelText('Electronics')
    fireEvent.click(electronicsCheckbox)
    expect(mockHandleCategorySelection).toHaveBeenCalledWith('Electronics')
  })
})
