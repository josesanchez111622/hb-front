import { Api } from "../api";

export const getJob = async (job) => {
  return await Api.get(`pro/job/${job}/`);
};

export const getOpenJobs = async () => {
  return await Api.get(`pro/job/open/`);
};

export const getCompletedJobs = async () => {
  return await Api.get(`pro/job/completed/`);
};

export const completeJob = async (jobId) => {
  return await Api.post(`pro/job/${jobId}/complete/`);
};

export const deletePhoto = async (photoId) => {
  return await Api.delete(`pro/job/photo/${photoId}/`);
};

export const reportJobIssue = async (jobId, { issueType, issueText }) => {
  return await Api.post(`pro/job/${jobId}/report_issue/`, {
    type: issueType,
    text: issueText,
  });
};
