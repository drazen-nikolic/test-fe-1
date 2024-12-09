import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { getProducts } from '../../services/products.service'
import { IProduct } from '../../types/product.types'
import ProductCard from '../ProductCard/ProductCard'

import FilterIcon from '../icons/FilterIcon'
import './Products.css'

interface IProductsProps {
  selectedCategories: string[]
  handleCategoriesToggle: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const skeletonList = Array.from(Array(12).keys())

const Products: React.FC<IProductsProps> = props => {
  const { selectedCategories, handleCategoriesToggle } = props
  const storedProducts = localStorage.getItem('products')
  const initialData = storedProducts ? JSON.parse(storedProducts) : undefined

  /**
   * Products query
   * @returns {IProduct[]}
   */
  const { data, isLoading, isFetching, isError, isSuccess } = useQuery<IProduct[]>({
    queryKey: ['products'],
    initialData,
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes cache time
    retry: 5,
    refetchOnReconnect: true, // Refetch when network is back
    placeholderData: initialData || undefined
  })

  /**
   * Save products to local storage when data is updated. This helps offline support
   */
  useEffect(() => {
    if (data && data.length) {
      localStorage.setItem('products', JSON.stringify(data))
    }
  }, [data])

  /**
   * Optimized Filter products based on selected categories
   * @returns {IProduct[]}
   */
  const filteredData = useMemo(() => {
    if (!data) return []
    if (!selectedCategories.length) return data
    return data.filter(product => selectedCategories.includes(product.category))
  }, [data, selectedCategories])

  if (!isFetching && !isLoading && !filteredData.length) return <p>No products found</p>
  if (isError) return <p>Error: {isError}</p>

  return (
    <section className='products-container'>
      <header className='products-container__header'>
        <button
          onClick={handleCategoriesToggle}
          className='products-container__header--filter'
        >
          <FilterIcon />
        </button>
        <h2>Products</h2>
      </header>
      <section className='product-container__grid'>
        {(isLoading || isFetching) && !isSuccess
          ? skeletonList.map(index => <ProductCard.Skeleton key={`${index}-skeleton`} />)
          : filteredData.map((product, index) => (
              <ProductCard
                key={`${index}-product-${product.productId}`}
                {...product}
              />
            ))}
      </section>
    </section>
  )
}

export default Products
