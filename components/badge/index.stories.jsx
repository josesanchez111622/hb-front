import React from 'react'

import {
  Badge as BadgeEl,
} from '@src/components'


export default {
  title: 'Components/Badge',
  component: BadgeEl
}

const Template = (args) => {
  return (
    <BadgeEl>
      {args.children}
    </BadgeEl>
  )
}

export const Badge = Template.bind({})
Badge.args = {
  children: 'Popular Choice',
}
