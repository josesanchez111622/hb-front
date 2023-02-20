import React from 'react'

export function RadioGroupItem({
  label,
  selected = false,
  value,
  onClick = () => { },
  children,
}) {
  /** @param {MouseEvent} event */
  function handleClick(event) {
    event.stopPropagation()
    onClick(value)
  }

  return (
    <div className={`radio-group-item ${selected && 'selected'}`} onClick={handleClick}>
      <div className="checkmark"><div></div></div>
      <div className="label">{label || children}</div>
    </div>
  )
}
