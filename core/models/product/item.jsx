import { BaseModel } from '@src/core/models/base'

export class ProductItem extends BaseModel {
  name
  description

  /** @returns {ProductItem} */
  static fromJSON(json) { return super.fromJSON(json) }
}
