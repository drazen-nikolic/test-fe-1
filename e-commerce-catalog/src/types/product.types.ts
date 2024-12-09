export interface IProduct {
  productId: string
  name: string
  description: string
  price: number
  currency: string
  category: string
  brand: string
  rating: number
  reviewsCount: number
  availability: 'In Stock' | 'Out of Stock'
  images: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}
