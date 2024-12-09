import { useQuery } from '@tanstack/react-query'
import { forwardRef, useEffect } from 'react'
import { getCategories } from '../../services/categories.service'
import { ICategory } from '../../types/category.types'
import CategoriesList from '../CategoriesList/CategoriesList'
import CloseIcon from '../icons/CloseIcon'
import './Categories.css'

interface ICategoriesProps {
  selectedCategories: string[]
  handleCategorySelection: (categoryId: string) => void
  handleCategoriesToggle: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const fakeCategories = Array.from(Array(10).keys())

const Categories = forwardRef<HTMLDivElement, ICategoriesProps>((props, ref) => {
  const { selectedCategories, handleCategorySelection, handleCategoriesToggle } = props
  const storedProducts = localStorage.getItem('categories')
  const initialData = storedProducts ? JSON.parse(storedProducts) : undefined

  /**
   * Categories Query
   * @returns {ICategory[]}
   */
  const { data, isLoading, isFetching, isError, isSuccess } = useQuery<ICategory[]>({
    queryKey: ['categories'],
    initialData,
    queryFn: getCategories,
    retry: 5,
    staleTime: 5 * 60 * 1000, // 5 minutes cache time
    refetchOnReconnect: true, // Refetch when network is back
    placeholderData: initialData || undefined
  })

  /**
   * Save categories to local storage when data is updated. This helps offline support
   */
  useEffect(() => {
    if (data && data.length) {
      localStorage.setItem('categories', JSON.stringify(data))
    }
  }, [data])

  if (isError) return <p>Error: {isError}</p>

  return (
    <aside
      className='categories-container'
      ref={ref}
    >
      <header className='categories-container__header'>
        <h2>Categories</h2>
        <button
          aria-label='close'
          onClick={handleCategoriesToggle}
          className='categories-container__header--filter'
        >
          <CloseIcon />
        </button>
      </header>
      <ul className='categories-container__list'>
        {(isLoading || isFetching) && !isSuccess ? (
          fakeCategories.map(i => (
            <p
              key={`skeleton-category-${i}`}
              className='skeleton categories-container__list--skeleton'
            ></p>
          ))
        ) : (
          <CategoriesList
            data={data}
            selectedCategories={selectedCategories}
            handleCategorySelection={handleCategorySelection}
          />
        )}
      </ul>
    </aside>
  )
})

Categories.displayName = 'Categories'

export default Categories
