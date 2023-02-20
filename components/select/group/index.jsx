import React from 'react'

import './styles.scss'

export function SelectGroup({
  className = "",
  label = "",
  children,
}) {
  const containerRef = React.useRef()

  function focus() {
    if (!containerRef.current) return
    containerRef.current.focus()
  }

  function handleClick(event) {
    event.stopPropagation()

    focus()
  }

  return (
    <div
      ref={containerRef}
      className={`${className} select-group`}
      tabIndex={0}
      onClick={(event) => handleClick(event)}
      onMouseOver={(event) => handleClick(event)}>
      <div className="label">
        <span>{label}</span>
      </div>
      <div className="select-group-content">
        {children}
      </div>
    </div>
  )
}
