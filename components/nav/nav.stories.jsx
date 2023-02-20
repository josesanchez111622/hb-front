import React from 'react'

import { AppNavigation as AppNavigationEl } from '@src/components'

export default {
  title: 'Components/Navigation',
  component: AppNavigationEl
}

const Template = (args) => <AppNavigationEl {...args} />

export const AppNavigation = Template.bind({})
AppNavigation.args = {
  highlighted: false
}
