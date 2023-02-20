import React, { useEffect } from "react";

import "./styles.scss";
import iconFilter from "@src/assets/images/booking/filter.svg";

import { Select, SelectOption } from "@src/components/select";
import { RadioGroup, RadioGroupItem } from "@src/components/radio-group";

import {
  HomeTypes,
  PowerType,
  BathroomCoverage,
  StairType,
  RelocationType,
} from "@src/config/constants";

export function ProductCategorySelect({
  className = "",
  criteria,
  onChange = (criteria) => {},
}) {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  function handleChange(index, value) {
    document.activeElement?.blur();

    let newValues = criteria;
    newValues[index] = value;
    onChange({ ...newValues });
    setMobileMenuOpen(false)
  }

  function handleMobileMenu() {
    setMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <div className={`${className} product-category-select`}>
      <div className="product-category-select-wrapper desktop">
        <Select
          className="home-type"
          placeholder="Home Type"
          value={criteria["homeType"]}
          onChange={(value) => handleChange("homeType", value)}
        >
          {HomeTypes.map((x, index) => (
            <SelectOption key={index} value={x.value}>
              {x.label}
            </SelectOption>
          ))}
        </Select>
        <div className="divider"></div>
        <Select
          className="power-type"
          placeholder="Power Type"
          value={criteria["powerType"]}
          onChange={(value) => handleChange("powerType", value)}
        >
          {PowerType.map((x, index) => (
            <SelectOption key={index} value={x.value}>
              {x.label}
            </SelectOption>
          ))}
        </Select>
        <div className="divider"></div>
        <Select
          className="bathroom-coverage"
          placeholder="Coverage"
          value={criteria["bathroomCoverage"]}
          onChange={(value) => handleChange("bathroomCoverage", value)}
        >
          {BathroomCoverage.map((x, index) => (
            <SelectOption key={index} value={x.value}>
              {x.label}
            </SelectOption>
          ))}
        </Select>
        <div className="divider"></div>
        {criteria["tankType"] == "tankless" && (
          <Select
            className="relocation"
            placeholder="Relocation"
            value={criteria["relocation"]}
            onChange={(value) => handleChange("relocation", value)}
          >
            {RelocationType.map((x, index) => (
              <SelectOption key={index} value={x.value}>
                {x.label}
              </SelectOption>
            ))}
          </Select>
        )}
        <div className="divider"></div>
        <Select
          className="stair-access"
          placeholder="Stair access"
          value={criteria["stairAccess"]}
          onChange={(value) => handleChange("stairAccess", value)}
        >
          {StairType.map((x, index) => (
            <SelectOption
              key={index}
              value={x.value}
              description={x.description}
            >
              {x.label}
            </SelectOption>
          ))}
        </Select>
      </div>
      <div
        className="product-category-select-wrapper mobile"
        onClick={() => handleMobileMenu()}
      >
        <img src={iconFilter} alt="" />
        <span>Filters</span>
        {isMobileMenuOpen && (
          <div className="product-category-select-mobile-menu">
            <RadioGroup
              className="home-type"
              label="Home Type"
              value={criteria["homeType"]}
              onChange={(value) => handleChange("homeType", value)}
            >
              {HomeTypes.map((x, index) => (
                <RadioGroupItem key={index} value={x.value}>
                  {x.label}
                </RadioGroupItem>
              ))}
            </RadioGroup>
            <RadioGroup
              className="power-type"
              label="Power Type"
              value={criteria["powerType"]}
              onChange={(value) => handleChange("powerType", value)}
            >
              {PowerType.map((x, index) => (
                <RadioGroupItem key={index} value={x.value}>
                  {x.label}
                </RadioGroupItem>
              ))}
            </RadioGroup>
            <div className="divider"></div>
            <RadioGroup
              className="coverage-type"
              label="Coverage"
              value={criteria["bathroomCoverage"]}
              onChange={(value) => handleChange("bathroomCoverage", value)}
            >
              {BathroomCoverage.map((x, index) => (
                <RadioGroupItem key={index} value={x.value}>
                  {x.label}
                </RadioGroupItem>
              ))}
            </RadioGroup>
            <RadioGroup
              className="stair-access"
              label="Stair access"
              value={criteria["stairAccess"]}
              onChange={(value) => handleChange("stairAccess", value)}
            >
              {StairType.map((x, index) => (
                <RadioGroupItem key={index} value={x.value}>
                  {x.label} (
                  <span className="description">{x.description}</span>)
                </RadioGroupItem>
              ))}
            </RadioGroup>
            {criteria["tankType"] == "tankless" && (
              <RadioGroup
                className="relocation"
                label="Relocation"
                value={criteria["relocation"]}
                onChange={(value) => handleChange("relocation", value)}
              >
                {RelocationType.map((x, index) => (
                  <RadioGroupItem key={index} value={x.value}>
                    {x.label}
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
