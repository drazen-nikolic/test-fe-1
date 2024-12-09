import StarIcon from '../icons/StarIcon'
import './ProductRating.css'

type TRatingProps = {
  value: number
}
const stars = Array.from(Array(5).keys())

const ProductRating: React.FC<TRatingProps> = props => {
  const { value } = props

  return (
    <div className='product-rating__container'>
      {stars.map((star, index) => (
        <StarIcon
          key={star}
          className={`product-rating__container--star ${index < value ? 'filled' : ''}`}
        />
      ))}
    </div>
  )
}

export default ProductRating
