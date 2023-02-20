import React from 'react'
import { useWindowSize } from 'react-use'

import './styles.scss'

import { SelectOption } from '../option'
import { DOMHelper } from '@src/utils'

// type: ('vertical'|'horizontal')
export function SelectDropDown({
  test,
  className = "",
  alwaysShow = false,
  type = "vertical",
  focusable = true,
  value,
  responsive = { breakpoint: 992 },
  mobileTitle,
  onChange = (value) => { },

  children,

  onCancel = () => { },
  onReset,
}) {
  const containerRef = React.useRef()
  const inputRef = React.useRef()

  const { width: windowWidth } = useWindowSize()
  const { breakpoint } = responsive

  React.useEffect(() => {
    initParent()
    focus()
    return () => {
      deinitParent()
    }
  }, [])

  function isMobile() { return windowWidth < breakpoint }

  /**
   * @returns {HTMLElement}
   */
  function calcParent() { return containerRef.current?.parentElement }

  function initParent() {
    const parentEl = calcParent()
    if (!parentEl) return

    parentEl.classList.add('select-dropdown-parent')
    if (focusable) {
      parentEl.tabIndex = 0
      parentEl.addEventListener('mousedown', (event) => handleParentClick(event, parentEl))
    }

    const input = parentEl.querySelector('input')
    input?.addEventListener('focus', handleInputFocus)
  }

  function deinitParent() {
    const parentEl = calcParent()
    if (!parentEl) return

    if (focusable) {
      parentEl.tabIndex = null
      parentEl.removeEventListener('mousedown', handleParentClick)
    }

    const input = parentEl.querySelector('input')
    input?.addEventListener('focus', handleInputFocus)
  }

  function focus() {
    if (!isMobile()) return

    inputRef.current?.focus()
  }

  function close() {
    document.activeElement?.blur()
    onCancel()
  }

  /**
   * @param {Event} event
   */
  function handleParentClick(event) {
    const parentEl = calcParent()
    if (!parentEl) return

    if (windowWidth >= breakpoint) { // Desktop
      const input = parentEl.querySelector('input')
      if (!input) event?.preventDefault()

      if (!DOMHelper.closest(event.target, '.select-option')) {
        event.stopPropagation()

        if (!DOMHelper.closest(document.activeElement, '.select-dropdown-parent')) {
          parentEl.focus()
        } else if (document.activeElement.id !== parentEl?.id) {
          parentEl.focus()
        } else {
          parentEl.blur()
        }
      }
    } else { // Mobile
    }
  }

  /**
   * @param {Event} event
   */
  function handleInputFocus(event) {
    const parentEl = calcParent()
    if (!parentEl) return

    focus()
  }

  function handleContainerClick(event) {
    event.stopPropagation()
    close()
  }

  function handleWrapperClick(event) {
    event.stopPropagation()
  }

  function handleChange(value) {
    onChange(value)
  }

  function handleReset() {
    if (onReset) onReset()
  }

  return (
    <div
      ref={containerRef}
      className={`${test && 'test'} select-dropdown ${isMobile() ? 'mobile' : 'desktop'} ${type} ${className}`}
      onClick={(event) => handleContainerClick(event)}>
      {mobileTitle &&
        <div className="mobile-title">
          {mobileTitle}
          {onReset && <button className="reset" onClick={() => handleReset()}>Reset</button>}
        </div>
      }
      <div className="wrapper" onClick={(event) => handleWrapperClick(event)}>
        {children && React.Children.map(children, (child, index) => {
          if (child && child.type === SelectOption) {
            const selected = child.props.selected || (value !== undefined && value === child.props.value)
            const onClick = child.props.onClick ? child.props.onClick : (value) => handleChange(value)
            const props = { ...child.props, alwaysShow, selected, onClick, }
            return (<SelectOption key={index} {...props} />)
          }
          return (<React.Fragment key={index}>{child}</React.Fragment>)
        })}
      </div>
      {onReset &&
        <div className="reset-container">
          <button className="reset" onClick={() => handleReset()}>Reset</button>
        </div>
      }
    </div>
  )
}
