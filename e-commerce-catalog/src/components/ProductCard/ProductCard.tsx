import React, { SyntheticEvent, useState } from 'react'
import { IProduct } from '../../types/product.types'
import ProductRating from '../ProductRating/ProductRating'
import './ProductCard.css'

interface ProductCardComponent extends React.FC<IProduct> {
  Skeleton: React.FC
}

const ProductCard: ProductCardComponent = props => {
  const {
    productId,
    name,
    description,
    price,
    currency,
    category,
    brand,
    images,
    rating,
    reviewsCount,
    availability,
    tags
  } = props

  const [hasError, setHasError] = useState<boolean>(false)

  /**
   * After image is loaded perform a fade in effect
   * @param event SyntheticEvent<HTMLImageElement>
   */
  const onLoadHandler = (event: SyntheticEvent<HTMLImageElement>): void => {
    event.currentTarget.style.opacity = '1'
  }

  /**
   * Triggers when image fails to load, setting placeholder to be rendered
   * @param _ SyntheticEvent<HTMLImageElement>
   */
  const onErrorHandler = (): void => {
    setHasError(true)
  }

  return (
    <article className='product-card'>
      <p className='product-card__availability'>
        <span
          className={`${availability === 'In Stock' ? 'available' : ''} product-card__availability--indicator`}
        ></span>
        {availability}
      </p>
      {hasError && (
        <div className='product-card__image--error'>
          <svg
            fill='red'
            viewBox='0 0 400 400'
          />
          <span className='product-card__image--error--message'>Can&apos;t load image</span>
        </div>
      )}
      <img
        className='product-card__image'
        width={400}
        height={400}
        loading='lazy'
        src={images[0]}
        onLoad={onLoadHandler}
        onError={onErrorHandler}
        alt={`product-image-${productId}`}
      />
      <h3 className='product-card__name'>{name}</h3>
      <ProductRating value={Math.ceil(rating)} />
      <p className='product-card__description'>{description}</p>
      <p className='product-card__category'>
        <strong>Category: </strong>
        {category}
      </p>
      <p className='product-card__brand'>
        <strong>Brand: </strong>
        {brand}
      </p>
      <p className='product-card__brand'>
        <strong>Reviews: </strong>
        {reviewsCount}
      </p>
      <p className='product-card__tags'>
        {tags.map(tag => (
          <span key={tag}>#{tag}</span>
        ))}
      </p>
      <p className='product-card__price'>
        <strong>{price}</strong> {currency}
      </p>
    </article>
  )
}

const Skeleton: React.FC = () => {
  return (
    <article className='product-card--skeleton'>
      <p className='skeleton small'></p>
      <svg
        className='skeleton image'
        viewBox='0 0 400 400'
      />
      <p className='skeleton medium'></p>
      <p className='skeleton small'></p>
      <p className='skeleton large'></p>
      <p className='skeleton small'></p>
      <p className='skeleton small'></p>
      <p className='skeleton small'></p>
      <p className='skeleton small'></p>
      <p className='skeleton large'></p>
    </article>
  )
}

ProductCard.Skeleton = Skeleton

export default ProductCard
