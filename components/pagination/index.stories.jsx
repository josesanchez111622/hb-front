import React from "react";

import { CustomPagination } from "./index";

export default {
  component: CustomPagination,
  title: "Components/Pagination",
};

const Template = (args) => <CustomPagination {...args} />;

export const Pagination = Template.bind({});
