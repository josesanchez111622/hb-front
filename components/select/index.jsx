import React from 'react'

import './styles.scss'
import iconArrow from '@src/assets/images/booking/caret-down.svg'

import { SelectDropDown } from './drop-down'

import { randomUUID, ArrayHelper } from '@src/utils'

export const SelectType = Object.freeze({
  Vertical: "vertical",
  Horizontal: "horizontal"
})

export const Select = React.forwardRef(({
  id = randomUUID(),
  className = "",
  type = SelectType.Vertical, // vertical|horizontal
  minimized = false,
  responsive = { breakpoint: 992 },
  keepLabel = false,
  label = "",
  placeholder = "",
  mobileTitle,
  value,
  onChange = (value) => { },
  children,

  filterApplied,

  test = false,

  onReset,
}, ref) => {
  function classList() {
    const results = [className, 'select', 'select-dropdown-parent']
    if (minimized) results.push('minimized')
    if (filterApplied) results.push('filter-applied')
    return results.join(' ')
  }

  function calcLabel() {
    if (keepLabel || !ArrayHelper.isValid(children)) return label

    for (let child of children || []) {
      const { value: childValue, label: childLabel, children: childChildren } = child.props
      if (value !== undefined && childValue === value)
        return (childLabel || childChildren)
    }

    return label
  }

  return (
    <div
      ref={ref}
      id={id}
      className={classList()}>
      {calcLabel() ?
        <div className="label">{calcLabel()}</div>
        :
        <div className="placeholder">{placeholder}</div>
      }
      <img className="arrow" src={iconArrow} alt="" />
      <SelectDropDown
        test={test}
        type={type}
        value={value}
        onChange={(value) => onChange(value)}
        responsive={responsive}
        mobileTitle={mobileTitle}
        onReset={onReset}>
        {children && children}
      </SelectDropDown>
    </div>
  )
})

export * from './drop-down'
export * from './group'
export * from './option'
