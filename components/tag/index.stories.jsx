import React from 'react'

import {
  Tag as TagEl,
} from '@src/components'


export default {
  title: 'Components/Tag',
  component: TagEl
}

const Template = (args) => {
  return (
    <TagEl {...args} />
  )
}

export const Tag = Template.bind({})
Tag.args = {
  label: 'Water heater'
}
