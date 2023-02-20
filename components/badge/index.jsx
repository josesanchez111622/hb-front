import React from 'react'

import './styles.scss'

export function Badge({
  className = "",
  children,
}) {
  return (
    <div className={`${className} badge`}>
      {children}
    </div>
  )
}
