import React from 'react'

import './styles.scss'

import { RadioGroupItem } from './item'

export function RadioGroup({
  className = '',
  label = '',
  value,
  onChange = (value) => { },
  children,
}) {
  return (
    <div className={`${className} radio-group`}>
      <div className="label">{label}</div>
      <div className="radio-group-wrapper">
        {children && React.Children.map(children, (child, index) => {
          if (child && child.type === RadioGroupItem) {
            const selected = child.props.selected || (value !== undefined && value === child.props.value)
            const onClick = child.props.onClick ? child.props.onClick : (value) => onChange(value)
            const props = { ...child.props, selected, onClick, }
            return (<RadioGroupItem key={index} {...props} />)
          }
          return (<React.Fragment key={index}>{child}</React.Fragment>)
        })}
      </div>
    </div>
  )
}

export * from './item'
