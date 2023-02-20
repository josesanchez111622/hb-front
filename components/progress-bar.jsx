import React from 'react'

export function ProgressBar({
  className = "",
  color = "#F9D806",
  progress = 1,
}) {
  return (
    <div className={`progress-bar ${className}`}>
      <div className="h-1" style={{ background: color, width: `${progress * 100}%` }}></div>
    </div>
  )
}
