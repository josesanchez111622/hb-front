import React from 'react'

import {
  ProductCategorySelect as ProductCategorySelectEl,
} from '@src/components'


export default {
  title: 'Pages/Product Selection/Product Category Select',
  component: ProductCategorySelectEl
}

const Template = (args) => {
  const [values, setValues] = React.useState(["", "", "", "", "", ""])

  return (
    <ProductCategorySelectEl
      values={values}
      onChange={(values) => setValues(values)} />
  )
}

export const ProductCategorySelect = Template.bind({})
