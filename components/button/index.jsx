import React from "react";

import { Button as PolarisButton } from "@shopify/polaris";

import "./styles.scss";

/**
 * @typedef {{className: string, type: "text"|"contained"|"outlined", size: "large"|"medium"|"default"|"small", disabled: boolean, onClick: Function}} ButtonProps
 * @param {ButtonProps} param0
 */
export function Button({
  className = "",
  type = "text",
  size = "default",
  label = "",
  disabled = false,
  onClick = (event) => {},
  children,
}) {
  return (
    <button
      className={`${className} btn-${type} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label || children}
    </button>
  );
}

export const PrimaryButton = (props) => (
  <PolarisButton primary={true} {...props}>{props.children}</PolarisButton>
)

export const SecondaryButton = (props) => (
  <PolarisButton {...props}>{props.children}</PolarisButton>
)

export const DisabledButton = (props) => (
  <PolarisButton disabled={true} {...props}>{props.children}</PolarisButton>
)

export const DestructiveButton = (props) => (
  <PolarisButton destructive={true} {...props}>{props.children}</PolarisButton>
)

