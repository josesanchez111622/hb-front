export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const ProductType = Object.freeze({
  Tank: "tank",
  Tankless: "tankless",
});

export const HomeTypes = [
  { label: "Single Family", value: "single_family" },
  { label: "Townhome", value: "townhome" },
  { label: "Condo/Apartment", value: "condo" },
  { label: "Manufactured home", value: "manufactured" },
];

export const PowerType = [
  { label: "Gas", value: "gas" },
  { label: "Electric", value: "electric" },
  { label: "Propane", value: "propane" },
];

export const BathroomCoverage = [
  { label: "1 bathroom", value: 1 },
  { label: "2 bathrooms", value: 2 },
  { label: "3 bathrooms", value: 3 },
  { label: "4+ bathrooms", value: 4 },
];

export const StairType = [
  { label: "No stairs", value: "no-stairs", description: "+$0" },
  { label: "Stairs", value: "stairs", description: "+$100" },
];

export const RelocationType = [
  { label: "Current location", value: "current" },
  {
    label: "Outdoor within 10 feet of gas mainline",
    value: "outdoor_within_10_feet",
  },
  {
    label: "Outdoor over 10 feet from gas mainline",
    value: "outdoor_over_10_feet",
  },
  { label: "Basement", value: "basement" },
  { label: "Garage", value: "garage" },
  { label: "Indoor closet", value: "indoor_closet" },
];

export const SmallScreenSize = 640;

export const GoogleMapKey = process.env.REACT_APP_GOOGLE_MAP_KEY;
export const AppBaseUrl = process.env.REACT_APP_HOMEPAGE_URL;
export const GCS_BASE_URL = process.env.REACT_APP_GCS_BASE_URL;