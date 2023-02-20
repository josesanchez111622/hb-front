import { plainToClass, instanceToPlain } from "class-transformer";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export class BaseModel {
  createdAt;
  updatedAt;

  static fromJSON(json) {
    return plainToClass(this, json);
  }

  static fromJSONArray(arrJson) {
    if (!arrJson) return [];
    return arrJson.map((json) => this.fromJSON(json));
  }
}

export class BaseCaseModel extends BaseModel {
  static fromJSON(json) {
    const result = super.fromJSON(json);
    return camelcaseKeys(result, { deep: true });
  }

  static toJSON(model) {
    const result = instanceToPlain(model);
    return snakecaseKeys(result, { deep: true });
  }
}
