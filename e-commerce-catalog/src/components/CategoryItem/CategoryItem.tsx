import React from 'react'
import './CategoryItem.css' // Import the CSS for styling

interface CategoryItemProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}

const CategoryItem: React.FC<CategoryItemProps> = ({ checked, onChange, label }) => {
  /**
   * Handle checkbox checked state
   */
  const handleCheckboxChange = () => {
    onChange(!checked)
  }

  return (
    <label className='category-item'>
      <input
        type='checkbox'
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className='category-item--mark' />
      {label && <span className='category-item__label'>{label}</span>}
    </label>
  )
}

export default CategoryItem
