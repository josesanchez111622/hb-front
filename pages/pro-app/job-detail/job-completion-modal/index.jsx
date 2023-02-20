import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Layout, Modal } from "@shopify/polaris";

import { completeJob } from "@src/core/api";

export function JobCompletionModal({
  isOpen,
  onCancel,
  onSuccess,
  onFailure,
  jobId,
}) {
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);

  const onClickCompleteJob = useCallback(async () => {
    setIsProcessingRequest(true);

    try {
      await completeJob(jobId);
      onSuccess();
    } catch {
      onFailure();
      setIsProcessingRequest(false);
    }
  }, [jobId, onFailure, onSuccess]);

  const primaryAction = useMemo(
    () => ({
      content: "Complete job",
      onAction: onClickCompleteJob,
      primary: true,
      ...(isProcessingRequest ? { loading: true } : {}),
    }),
    [isProcessingRequest, onClickCompleteJob]
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
      title="Complete job"
    >
      <Modal.Section>
        <Layout>
          <Layout.Section>
            Mark jobs as complete after you have finalized work and reviewed
            with the customer. Jobs must be marked as complete for your company
            to receive payment.
          </Layout.Section>
        </Layout>
      </Modal.Section>
    </Modal>
  );
}
JobCompletionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  jobId: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
