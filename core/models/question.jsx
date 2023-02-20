import { BaseModel } from '@src/core/models/base'

export class Question extends BaseModel {
  title
  answers
  answer

  /** @returns {Question} */
  static fromJSON(json) { return super.fromJSON(json) }

  /** @returns {Array<Question>} */
  static fromJSONArray(arrJson) { return super.fromJSONArray(arrJson) }
}
