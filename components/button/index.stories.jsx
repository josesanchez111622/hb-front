import React from "react";

import {
  Button as ButtonEl,
  PrimaryButton,
  SecondaryButton,
  DisabledButton,
} from "@src/components";

export default {
  title: "Components/Buttons",
  component: ButtonEl,
};

const Template = (args) => {
  return <ButtonEl {...args} />;
};

export const Text = Template.bind({});
Text.args = {
  type: "text",
  size: "default",
  disabled: false,
  label: "Select product",
};

export const Contained = Template.bind({});
Contained.args = {
  type: "contained",
  size: "default",
  disabled: false,
  label: "Select product",
};

export const Primary = () => <PrimaryButton>Primary Button</PrimaryButton>;
export const Secondary = () => (
  <SecondaryButton>Secondary Button</SecondaryButton>
);
export const Disabled = () => <DisabledButton>Disabled Button</DisabledButton>;
export const ContainedLarge = Template.bind({});
ContainedLarge.args = {
  type: "contained",
  size: "large",
  disabled: false,
  label: "Select product",
};

export const Outlined = Template.bind({});
Outlined.args = {
  type: "outlined",
  size: "default",
  disabled: false,
  label: "Select product",
};
