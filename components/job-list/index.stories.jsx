import React from "react";

import {JobList} from "./index";

export default {
  component: JobList,
  title: "Components/JobList",
};

const Template = (args) => <JobList {...args} />;

export const OpenJobList = Template.bind({});

const openJobList = [{
    isCompleted: false,
    jobId: 1005,
    jobCreatedTime: "Monday, April 25 at 9:00 AM",
    jobType: "Tankless install",
    jobSupplyPickUp: "Mathews, Catherinetown, CA",
    jobAddress: "3891 Ranchview Dr. Richardson, 62639",
    completed: "",
  },{
    isCompleted: false,
    jobId: 1005,
    jobCreatedTime: "Monday, April 25 at 9:00 AM",
    jobType: "Tankless install",
    jobSupplyPickUp: "Mathews, Catherinetown, CA",
    jobAddress: "3891 Ranchview Dr. Richardson, 62639",
    completed: "",
  }]
OpenJobList.args = {
  isCompleted: false,
  jobs: openJobList
}

export const OpenEmptyJobList = Template.bind({});
OpenEmptyJobList.args = {
  isCompleted: false,
  jobs: []
}

export const CompleteJobList = Template.bind({});
const completeJobList = [{
  isCompleted: true,
  jobId: 1005,
  jobCreatedTime: "Monday, April 25 at 9:00 AM",
  jobType: "Tankless install",
  jobSupplyPickUp: "",
  jobAddress: "",
  completed: "Monday, April 25 at 1:00 PM",
},{
  isCompleted: true,
  jobId: 1005,
  jobCreatedTime: "Monday, April 25 at 9:00 AM",
  jobType: "Tankless install",
  jobSupplyPickUp: "",
  jobAddress: "",
  completed: "Monday, April 25 at 1:00 PM",
}]
CompleteJobList.args = {
  isCompleted: true,
  jobs: completeJobList
}

export const CompleteEmptyJobList = Template.bind({});
CompleteEmptyJobList.args = {
  isCompleted: true,
  jobs: []
}
