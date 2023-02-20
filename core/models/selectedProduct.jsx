import { BaseModel, BaseCaseModel } from "@src/core/models/base";
import { Type, Expose } from 'class-transformer';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';


class Product extends BaseCaseModel {
  id;
  bathroomCoverages;
  brand;
  description;
  homeCoverage;
  powerOutputBtu;
  powerType;
  productImage;
  tankType;
  title;
  unitType;
  waterFlowGpm;
}

export class ProductCatalog extends BaseCaseModel {
  id;
  basePrice;
  finalPrice;
  stairPrice;
  installationPrice;
  currentLocation;
  desiredLocation;
  federalTaxCredit;
  homeTypes;
  isPopular;
  socalGasRebates;
  totalRebates;
  warranty;
  product = new Product();
}

export class SelectedProduct extends BaseCaseModel {
  id;
  customerLeadId;
  productCatalog = new ProductCatalog();
}
