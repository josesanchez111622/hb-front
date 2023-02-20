import React, { useState, useEffect, useCallback } from "react";
import {
  ProAppFrame,
  ProAppPage,
  CustomTabs,
  JobList,
  CustomPagination,
} from "@src/components";
import { Toast } from "@shopify/polaris";
import { formatJobDate } from "../../../utils";
import { getCompletedJobs, getOpenJobs } from "@src/core";

import "./styles.scss";

export function JobListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openJobList, setOpenJobList] = useState([]);
  const [completedJobList, setCompletedJobList] = useState([]);
  const step = 5;
  const [toast, setToast] = useState({
    isActive: false,
    message: "",
    isError: false,
  });
  const toggleToastActive = useCallback(
    () => setToast({ ...toast, isActive: !toast.isActive }),
    [toast]
  );

  const tabs = [
    {
      id: "proappjoblisttab-open",
      content: "Open",
      panelID: "pro-app-job-list-tab-open",
    },
    {
      id: "proappjoblisttab-completed",
      content: "Completed",
      panelID: "pro-app-job-list-tab-completed",
    },
  ];

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      var openJobResponse;
      try {
        openJobResponse = await getOpenJobs();
      } catch {
        setToast({
          isActive: true,
          message: "There was an issue loading the job list",
          isError: true,
        });
        return;
      }
      setOpenJobList(
        openJobResponse.data.map((job) => {
          return {
            isCompleted: false,
            jobId: job.id,
            jobCreatedTime: formatJobDate(job.appointment.date),
            jobType: job.type,
            jobSupplyHouse: job?.material_list[0]?.supply_house?.address,
            jobAddress: job.address,
            completed: "",
          };
        })
      );

      var completedJobResponse;
      try {
        completedJobResponse = await getCompletedJobs();
      } catch {
        setToast({
          isActive: true,
          message: "There was an issue loading the job list",
          isError: true,
        });
        return;
      }
      setCompletedJobList(
        completedJobResponse.data.map((job) => {
          return {
            isCompleted: true,
            jobId: job.id,
            jobCreatedTime: formatJobDate(job.appointment.date),
            jobType: job.type,
            jobSupplyHouse: "",
            jobAddress: "",
            completed: formatJobDate(job.completed_at),
          };
        })
      );
      setTotalAmount(openJobResponse.data.length);
      setIsLoading(false);
    })();
  }, []);

  const onChangePagination = (index) => {
    setCurrentIndex(index);
  };

  const onChangeTab = (selectedTabIndex) => {
    setSelected(selectedTabIndex);
    setCurrentIndex(0);
    if (selectedTabIndex) {
      setTotalAmount(completedJobList.length);
    } else {
      setTotalAmount(openJobList.length);
    }
  };

  const toastMarkup = toast.isActive ? (
    <Toast
      content={toast.message}
      error={toast.isError}
      onDismiss={toggleToastActive}
    />
  ) : null;

  const jobListContent = (
    <CustomTabs selected={selected} setSelected={onChangeTab} tabs={tabs}>
      {selected === 0 && (
        <>
          <JobList
            isCompleted={false}
            isLoading={isLoading}
            jobs={openJobList.slice(currentIndex, currentIndex + step)}
          />
          <div className="pagination-wrapper">
            <CustomPagination
              totalAmount={totalAmount}
              currentIndex={currentIndex}
              onChangePagination={onChangePagination}
              step={step}
            />
          </div>
        </>
      )}
      {selected === 1 && (
        <>
          <JobList
            isCompleted={true}
            isLoading={isLoading}
            jobs={completedJobList.slice(currentIndex, currentIndex + step)}
          />
          <div className="pagination-wrapper">
            <CustomPagination
              totalAmount={totalAmount}
              currentIndex={currentIndex}
              onChangePagination={onChangePagination}
              step={step}
            />
          </div>
        </>
      )}
    </CustomTabs>
  );

  const jobListPage = (
    <ProAppPage title="Job">
      {jobListContent}
      {toastMarkup}
    </ProAppPage>
  );
  return <ProAppFrame>{jobListPage}</ProAppFrame>;
}
