import React from "react";
import { Job } from "@src/components";
import "./styles.scss";
import { useAuth } from "@src/core";

export function JobList({ isCompleted = false, isLoading = false, jobs = [] }) {
  const { isFrameLoading } = useAuth();
  return (
    <div className="job-list-container">
      {(isLoading || isFrameLoading) && (
        <div className="no-job">
          <div className="no-job--title">Loading Job Data...</div>
        </div>
      )}
      {!isLoading && !isFrameLoading && jobs.length == 0 && (
        <div className="no-job">
          <div className="no-job--title">
            You currently don&#39;t have any {isCompleted && "completed"}{" "}
            {!isCompleted && "open"} jobs
          </div>
          <div className="no-job--description">
            When there are {isCompleted && "completed"} {!isCompleted && "open"}{" "}
            jobs they will be listed here
          </div>
        </div>
      )}
      {!isLoading &&
        !isFrameLoading &&
        jobs.length > 0 &&
        jobs.map((job, index) => (
          <Job
            key={index}
            isCompleted={isCompleted}
            jobId={job.jobId}
            jobCreatedTime={job.jobCreatedTime}
            jobType={job.jobType}
            jobSupplyHouse={job.jobSupplyHouse}
            jobAddress={job.jobAddress}
            completed={job.completed}
          />
        ))}
    </div>
  );
}
