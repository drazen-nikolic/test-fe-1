import { fireEvent, render } from '@testing-library/react'
import CategoryItem from './CategoryItem'

describe('CategoryItem', () => {
  it('renders without crashing', () => {
    const { getByLabelText } = render(
      <CategoryItem
        label='category-item'
        checked={false}
        onChange={() => {}}
      />
    )
    expect(getByLabelText(/category-item/i)).toBeInTheDocument()
  })

  it('displays the label when provided', () => {
    const label = 'Test Label'
    const { getByText } = render(
      <CategoryItem
        checked={false}
        onChange={() => {}}
        label={label}
      />
    )
    expect(getByText(label)).toBeInTheDocument()
  })

  it('calls onChange with the correct value when clicked', () => {
    const onChangeMock = jest.fn()
    const { getByLabelText } = render(
      <CategoryItem
        checked={false}
        label='category-item'
        onChange={onChangeMock}
      />
    )
    const checkbox = getByLabelText(/category-item/i)
    fireEvent.click(checkbox)
    expect(onChangeMock).toHaveBeenCalledWith(true)
  })

  it('reflects the checked state correctly', () => {
    const { getByLabelText, rerender } = render(
      <CategoryItem
        checked={false}
        label='category-item'
        onChange={() => {}}
      />
    )
    const checkbox = getByLabelText(/category-item/i) as HTMLInputElement
    expect(checkbox.checked).toBe(false)

    rerender(
      <CategoryItem
        checked={true}
        onChange={() => {}}
      />
    )
    expect(checkbox.checked).toBe(true)
  })
})
