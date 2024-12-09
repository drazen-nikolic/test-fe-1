import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import './App.css'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'

const queryClient = new QueryClient()

export default function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const categoriesRef = useRef<HTMLDivElement | null>(null)

  /**
   * Handle category selection
   */
  const handleCategorySelection = (categoryId: string) => {
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter(id => id !== categoryId)
        : [...prevSelectedCategories, categoryId]
    )
  }

  /**
   * Handle categories section toggle on mobile devices
   */
  const handleCategoriesToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!categoriesRef.current) return
    categoriesRef.current.classList.toggle('active')
  }

  return (
    <QueryClientProvider client={queryClient}>
      <section className='app-container'>
        <Categories
          ref={categoriesRef}
          selectedCategories={selectedCategories}
          handleCategorySelection={handleCategorySelection}
          handleCategoriesToggle={handleCategoriesToggle}
        />
        <Products
          handleCategoriesToggle={handleCategoriesToggle}
          selectedCategories={selectedCategories}
        />
      </section>
    </QueryClientProvider>
  )
}
