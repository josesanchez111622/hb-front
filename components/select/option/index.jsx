import React from 'react'

import './styles.scss'

export class SelectOption extends React.Component {
  constructor(props) {
    super(props)

    this.containerRef = React.createRef()
  }

  get classNameList() {
    const { className = "", selectable = true, selected = false, disabled = false, description } = this.props

    const results = [className, 'select-option']

    if (selectable) results.push('selectable')
    if (selected) results.push('selected')
    if (disabled) results.push('disabled')
    if (description) results.push('has-description')

    return results
  }

  handleHover = (event) => {
    // event.stopPropagation()

    // this.containerRef.current?.focus()
  }

  handleClick = (event) => {
    event?.stopPropagation()

    const { disabled, alwaysShow, value, onClick = (value) => { } } = this.props
    if (disabled) return
    if (value !== undefined) onClick(value)
    else onClick()

    if (!alwaysShow) document.activeElement?.blur()
  }

  render() {
    const {
      description,
      children,
    } = this.props

    return (
      <div
        ref={this.containerRef}
        className={this.classNameList.join(' ')}
        tabIndex={0}
        onMouseOver={this.handleHover}
        onClick={this.handleClick}
        onFocus={this.handleClick}>
        {(typeof children === 'string') ?
          <React.Fragment>
            <span className="label">{children}</span>
            {description && <div className="description">{description}</div>}
          </React.Fragment>
          :
          children
        }
      </div>
    )
  }
}
