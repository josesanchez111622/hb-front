import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { GCS_BASE_URL } from "@src/config";
import {
  Layout,
  Card,
  Stack,
  Button,
  Modal,
  Thumbnail,
  Badge,
  Link,
  Toast,
  Spinner,
} from "@shopify/polaris";
import FormData from "form-data";

import { ProAppFrame, ProAppPage } from "@src/components";
import { formatJobDate, isSafari } from "@src/utils";
import { getJob } from "@src/core/api";
import { Api } from "@src/core";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { JobCompletionModal } from "./job-completion-modal";
import { JobReportModal } from "./job-report-modal";
import { DeletePhotoModal } from "./delete-photo-modal";
import { MaterialListPdfViewer } from "./material-list";
import { useAuth } from "@src/core";
import "./styles.scss";

function getBase() {
  if (isSafari) {
    return "https://maps.apple.com/maps?q=";
  }

  return "https://maps.google.com/?q=";
}

export function JobDetailPage() {
  const pageParams = useParams();

  const { isFrameLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState({
    isActive: false,
    message: "",
    isError: false,
  });

  const toggleToastActive = useCallback(
    () => setToast({ ...toast, isActive: !toast.isActive }),
    [toast]
  );

  const toastMarkup = toast.isActive ? (
    <Toast
      content={toast.message}
      error={toast.isError}
      onDismiss={toggleToastActive}
    />
  ) : null;
  //Job Details
  const [jobId, setJobId] = useState(0);
  const [jobAddress, setJobAddress] = useState("");
  const [jobType, setJobType] = useState("");
  const [isCompletedJob, setIsCompletedJob] = useState(false);
  const [jobDate, setJobDate] = useState("");
  const [jobScope, setJobScope] = useState(null);
  const [jobNote, setJobNote] = useState([]);
  const [supplyHouseOrderNumber, setSupplyHouseOrderNumber] = useState("");
  const [supplyHouseAddress, setSupplyHouseAddress] = useState("");
  const [jobPhotoList, setJobPhotoList] = useState([]);
  const [jobMaterialReceipt, setJobMaterialReceipt] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      var res;
      try {
        res = await getJob(pageParams.id);
      } catch {
        setToast({
          isActive: true,
          message: "There was an issue loading the job information",
          isError: true,
        });
      }

      setJobId(res.data.id);
      if (!res.data.is_pro_finished) {
        setJobAddress(res.data.address);
      }
      setJobType(res.data.type + ", " + res.data.product_title);
      setIsCompletedJob(res.data.is_pro_finished);
      setJobDate(formatJobDate(res.data.appointment.date));
      setSupplyHouseOrderNumber(res.data.material_list[0].order_number);
      setSupplyHouseAddress(res.data.material_list[0].supply_house.address);
      setJobMaterialReceipt(res.data.material_list[0].receipt_url);
      setJobPhotoList(res.data.photos);
      setJobNote(res.data.notes);
      setJobScope(res.data.scope);
      setIsLoading(false);
    })();
  }, [pageParams.id]);

  //Material List Modal
  const [isMaterialListModalActive, setIsMaterialListModalActive] =
    useState(false);

  //Complete Job Modal
  const [isCompleteJobModalActive, setIsCompleteJobModalActive] =
    useState(false);
  const onSuccessfullyCompleteJob = useCallback(() => {
    setIsCompleteJobModalActive(false);
    setIsCompletedJob(true);

    setToast({
      isActive: true,
      message: "Job completed",
      isError: false,
    });
  }, []);

  const onCancelCompleteJob = useCallback(() => {
    setIsCompleteJobModalActive(false);
  }, []);

  const onFailedCompleteJob = useCallback(() => {
    setToast({
      isActive: true,
      message: "There was an issue completing the job",
      isError: true,
    });
  }, []);

  //Report issue Modal
  const [isReportIssueModalActive, setIsReportIssueModalActive] =
    useState(false);
  const onSuccessfullyReportIssue = useCallback(() => {
    setIsReportIssueModalActive(false);

    setToast({ isActive: true, message: "Issue submitted", isError: false });
  }, []);

  const onFailedReportIssue = useCallback((err = "") => {
    if (err != "") {
      setToast({ isActive: true, message: err, isError: true });
      return;
    }
    setToast({ isActive: true, message: "Unexpected error", isError: true });
  }, []);

  const onCancelReportIssue = useCallback(() => {
    setIsReportIssueModalActive(false);
  }, []);

  //File upload for photos
  const uploadPhotoRef = useRef();
  const [isUploadingSpinner, setIsUploadLoadingSpinner] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(-1);
  const onChangePhotoUpoad = async (e) => {
    setIsUploadLoadingSpinner(true);
    let photoFormData = new FormData();
    for (let i = 0; i < uploadPhotoRef.current.files.length; i++) {
      photoFormData.append(
        uploadPhotoRef.current.files[i].name,
        uploadPhotoRef.current.files[i]
      );
    }
    try {
      const res = await Api.uploadFiles(
        "pro/job/" + pageParams.id + "/photo/",
        photoFormData
      );
      setIsUploadLoadingSpinner(false);
      setJobPhotoList(jobPhotoList.concat(res.data));
      setToast({
        isActive: true,
        message: "Photo upload completed",
        isError: false,
      });
    } catch (error) {
      setIsUploadLoadingSpinner(false);
      setToast({
        isActive: true,
        message: "There was an issue uploading photos",
        isError: true,
      });
    }
  };

  const onClickPhoto = (photoIndex) => {
    setIsDeletePhotoModalActive(true);
    setSelectedPhoto(photoIndex);
  };

  // Delete Photo Modal
  const [isDeletePhotoModalActive, setIsDeletePhotoModalActive] =
    useState(false);
  const onCancelDeletePhoto = useCallback(() => {
    setIsDeletePhotoModalActive(false);
  }, []);
  const onFailedDeletePhoto = useCallback(() => {
    setIsDeletePhotoModalActive(false);
    setSelectedPhoto(-1);
    setToast({
      isActive: true,
      message: "There was an issue removing the photo",
      isError: false,
    });
  }, []);
  const onSuccessfullyDeletePhoto = useCallback(
    (photoIndex) => {
      setSelectedPhoto(-1);
      jobPhotoList.splice(photoIndex, 1);
      setJobPhotoList(jobPhotoList);
      setIsDeletePhotoModalActive(false);
      setToast({
        isActive: true,
        message: "Photo successfully removed",
        isError: false,
      });
    },
    [jobPhotoList]
  );

  const MaterialListModal = (
    <Modal
      open={isMaterialListModalActive}
      title="Materials"
      onClose={() => setIsMaterialListModalActive(false)}
      secondaryActions={{
        content: "Close",
        onAction: () => setIsMaterialListModalActive(false),
      }}
    >
      <Modal.Section>
        <MaterialListPdfViewer fileUrl={GCS_BASE_URL + jobMaterialReceipt} />
      </Modal.Section>
    </Modal>
  );

  const jobDetailContent = (
    <>
      <Layout>
        <Layout.Section>
          <Card title="Details">
            <Card.Section>
              <p>{jobType}</p>
            </Card.Section>

            <Card.Section title="time">
              <p>{jobDate}</p>
            </Card.Section>

            {!isCompletedJob && (
              <Card.Section title="Job address">
                <Link url={getBase() + jobAddress} removeUnderline={true}>
                  {jobAddress}
                </Link>
              </Card.Section>
            )}

            {jobNote != null && jobNote.length != 0 && (
              <Card.Section title="notes">
                {jobNote.map((note, key) => {
                  return (
                    <div
                      className="job-note-text"
                      key={key}
                      dangerouslySetInnerHTML={{ __html: note }}
                    />
                  );
                })}
              </Card.Section>
            )}

            <Card.Section
              title="Photos"
              actions={[
                {
                  content: "Upload photos",
                  onAction: () => uploadPhotoRef.current.click(),
                },
              ]}
            >
              <input
                type="file"
                multiple
                ref={uploadPhotoRef}
                style={{ display: "none" }}
                onChange={onChangePhotoUpoad}
              />
              <Stack>
                {jobPhotoList &&
                  jobPhotoList.length &&
                  jobPhotoList.map((jobPhoto, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => onClickPhoto(index)}
                        className="job-scope-photo"
                      >
                        <Thumbnail
                          source={GCS_BASE_URL + jobPhoto.uri}
                          size="large"
                          alt={jobPhoto.name}
                        />
                      </div>
                    );
                  })}
                {isUploadingSpinner && (
                  <div className="job-scope-photo-spinner">
                    <Spinner
                      accessibilityLabel="Spinner example"
                      size="large"
                    />
                  </div>
                )}
              </Stack>
            </Card.Section>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title="Materials">
            <Card.Section title="Supply House Address">
              <Link url={getBase() + supplyHouseAddress} removeUnderline={true}>
                {supplyHouseAddress}
              </Link>
            </Card.Section>

            <Card.Section
              title={supplyHouseOrderNumber != "" ? "Order number" : ""}
            >
              {supplyHouseOrderNumber != "" && (
                <p> {supplyHouseOrderNumber} </p>
              )}
            </Card.Section>
            {jobMaterialReceipt != null && (
              <Card.Section title="order receipt">
                <div
                  className="pdf-viewer-wrapper"
                  onClick={() => {
                    setIsMaterialListModalActive(true);
                  }}
                >
                  <Document file={GCS_BASE_URL + jobMaterialReceipt}>
                    <Page pageNumber={1} />
                  </Document>
                </div>
              </Card.Section>
            )}
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title={jobScope != null ? "Job scope" : ""}>
            {jobScope != null && (
              <Card.Section>
                <div
                  className="job-scope-text"
                  dangerouslySetInnerHTML={{ __html: jobScope }}
                />
              </Card.Section>
            )}
          </Card>
        </Layout.Section>
      </Layout>

      <JobCompletionModal
        isOpen={isCompleteJobModalActive}
        jobId={jobId}
        onCancel={onCancelCompleteJob}
        onFailure={onFailedCompleteJob}
        onSuccess={onSuccessfullyCompleteJob}
      />
      {selectedPhoto != -1 && (
        <DeletePhotoModal
          isOpen={isDeletePhotoModalActive}
          photo={jobPhotoList[selectedPhoto]}
          photoIndex={selectedPhoto}
          onCancel={onCancelDeletePhoto}
          onFailure={onFailedDeletePhoto}
          onSuccess={onSuccessfullyDeletePhoto}
        />
      )}

      {MaterialListModal}

      <JobReportModal
        isOpen={isReportIssueModalActive}
        jobId={jobId}
        onCancel={onCancelReportIssue}
        onFailure={onFailedReportIssue}
        onSuccess={onSuccessfullyReportIssue}
      />

      {toastMarkup}
    </>
  );

  const jobDetailPage = (
    <>
      {(isLoading || isFrameLoading) && (
        <div className="job-loading">Loading Job Data...</div>
      )}
      {!isLoading && !isFrameLoading && !isCompletedJob && (
        <ProAppPage
          breadcrumbs={[{ content: "Job Detail", url: "/site/pro/job-list/" }]}
          title={"Job #" + jobId}
          titleMetadata={
            <Badge status="attention" progress="incomplete">
              Open
            </Badge>
          }
          compactTitle
          primaryAction={{
            content: "Complete Job",
            disabled: false,
            onAction: () => setIsCompleteJobModalActive(true),
          }}
          secondaryActions={[
            {
              content: "Report issues",
              accessibilityLabel: "Report issues action",
              onAction: () => setIsReportIssueModalActive(true),
            },
          ]}
        >
          {jobDetailContent}
        </ProAppPage>
      )}
      {!isLoading && !isFrameLoading && isCompletedJob && (
        <ProAppPage
          breadcrumbs={[{ content: "Job Detail", url: "/site/pro/job-list/" }]}
          title={"Job #" + jobId}
          titleMetadata={<Badge progress="complete">Complete</Badge>}
          compactTitle
          secondaryActions={[
            {
              content: "Report issues",
              accessibilityLabel: "Report issues action",
              onAction: () => setIsReportIssueModalActive(true),
            },
          ]}
        >
          {jobDetailContent}
        </ProAppPage>
      )}
    </>
  );

  return <ProAppFrame>{jobDetailPage}</ProAppFrame>;
}
