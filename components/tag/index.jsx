import React from 'react'

import './styles.scss'
import iconCheckmark from '@src/assets/images/booking/checkmark-6px-5C5F62.svg'

export function Tag({
  className = "",
  label,
  children,
}) {
  return (
    <div className={`${className} tag`}>
      <span className="checkmark"><img src={iconCheckmark} alt="" /></span>
      <span>{label || children}</span>
    </div>
  )
}
