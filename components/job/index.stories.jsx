import React from "react";

import { Job } from "./index";

export default {
  component: Job,
  title: "Components/Job",
};

const Template = (args) => <Job {...args} />;

export const OpenJobs = Template.bind({});
OpenJobs.args = {
  isCompleted: false,
  jobId: 1005,
  jobCreatedTime: "Monday, April 25 at 9:00 AM",
  jobType: "Tankless install",
  jobSupplyPickUp: "Mathews, Catherinetown, CA",
  jobAddress: "3891 Ranchview Dr. Richardson, 62639",
  completed: "",
};

export const CompletedJobs = Template.bind({});
OpenJobs.args = {
  isCompleted: true,
  jobId: 1005,
  jobCreatedTime: "Monday, April 25 at 9:00 AM",
  jobType: "Tankless install",
  jobSupplyPickUp: "",
  jobAddress: "",
  completed: "Monday, April 25 at 1:00 PM",
};
