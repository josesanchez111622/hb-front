import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Layout, Modal, Select, TextField } from "@shopify/polaris";

import { reportJobIssue } from "@src/core/api";

const issueOptions = [
  { label: "Parts list", value: 3, key: 3 },
  { label: "Job scope", value: 2, key: 2 },
  { label: "Delay (arrival time)", value: 4, key: 4 },
  { label: "On-Site Damage", value: 5, key: 5 },
  { label: "Other", value: 1, key: 1 },
];

export function JobReportModal({
  isOpen,
  onCancel,
  onSuccess,
  onFailure,
  jobId,
}) {
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(issueOptions[0].value);
  const handleIssueSelectChange = useCallback(
    (newValue) =>
      setSelectedIssue(
        issueOptions.find((option) => option.value == newValue).value
      ),
    []
  );
  const [issueContent, setIssueContent] = useState("");
  const handleChangeIssueContent = useCallback(
    (newValue) => setIssueContent(newValue),
    []
  );

  const onClickReportIssue = useCallback(async () => {
    setIsProcessingRequest(true);
    if(issueContent == "") {
      onFailure("Issue description is required.")
      setIsProcessingRequest(false);
      return;
    }

    try {
      await reportJobIssue(jobId, {
        issueText: issueContent,
        issueType: selectedIssue,
      });

      setSelectedIssue(issueOptions[0].value);
      setIssueContent("");

      onSuccess();
    } catch {
      onFailure();
    }

    setIsProcessingRequest(false);
  }, [jobId, issueContent, selectedIssue, onFailure, onSuccess]);

  const primaryAction = useMemo(
    () => ({
      content: "Submit issue",
      onAction: onClickReportIssue,
      primary: true,
      ...(isProcessingRequest ? { loading: true } : {}),
    }),
    [isProcessingRequest, onClickReportIssue]
  );

  const secondaryAction = useMemo(
    () => ({
      content: "Cancel",
      onAction: onCancel,
      ...(isProcessingRequest ? { disabled: true } : {}),
    }),
    [isProcessingRequest, onCancel]
  );

  return (
    <Modal
      onClose={onCancel}
      open={isOpen}
      primaryAction={primaryAction}
      secondaryActions={secondaryAction}
      title="Report issue"
    >
      <Modal.Section>
        <Layout>
          <Layout.Section>
            <Select
              label="Issue type"
              onChange={handleIssueSelectChange}
              options={issueOptions}
              value={selectedIssue}
            />
          </Layout.Section>

          <Layout.Section>
            <TextField
              autoComplete="off"
              label="Issue description"
              multiline={3}
              onChange={handleChangeIssueContent}
              value={issueContent}
            />
          </Layout.Section>
        </Layout>
      </Modal.Section>
    </Modal>
  );
}
JobReportModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  jobId: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
