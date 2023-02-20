import { BaseModel, BaseCaseModel } from "@src/core/models/base";
import { ProductItem } from "./item";
import { Price } from "./price";
import { formatCurrency } from "@src/utils/index";

export class Product extends BaseModel {
  name;
  description;
  avatar;
  isPopular;
  items = [];
  tags = [];
  price = new Price();

  /** @returns {Product} */
  static fromJSON(json) {
    const result = super.fromJSON(json);

    if (result) {
      result.isPopular = json?.is_popular,
      result.price = Price.fromJSON({
        basePrice: json?.base_price,
        finalPrice: json?.final_price,
        stairPrice: json?.stair_price,
        installationPrice: json?.installation_price,
        description: `after rebates and credits of ${formatCurrency(
          json?.total_rebates
        )}`,
        learnMore: "https://www.homebreeze.com/rebates",
      });

      let productDisplayItems = [
        {
          name: "Home Coverage",
          description: json?.product?.home_coverage,
        },
        { name: "Warranty", description: `${json?.warranty} years` },
      ];

      if (json?.product?.water_flow_gpm !== "null") {
        productDisplayItems.push({
          name: "Hot Water Flow",
          description: `Up to ${json?.product?.water_flow_gpm} gallons/min`,
        });
      }
      result.items = ProductItem.fromJSONArray(productDisplayItems ?? []);

      result.tags = [
        "Water heater",
        "Delivery",
        "Installation",
        "Parts",
        "Disposal",
      ];
    }
    return result;
  }
}

export class Criteria extends BaseCaseModel {
  id;
  homeType;
  powerType;
  coverageType;
  stairAccess;
  relocation;

  /** @returns {Criteria} */
  static fromJSON(json) {
    const result = super.fromJSON(json);
    result.stairAccess = json?.stair_access ? "stairs" : "no-stairs";
    return result;
  }

  /** @returns {object} */
  static toJSON(criteria) {
    const result = super.toJSON(criteria);
    result.stair_access = criteria.stairAccess == "stairs";
    return result;
  }
}

export * from "./item";
