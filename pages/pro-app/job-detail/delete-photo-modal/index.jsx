import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Layout, Modal } from "@shopify/polaris";
import { GCS_BASE_URL } from "@src/config";
import { deletePhoto } from "@src/core/api";

export function DeletePhotoModal({
  isOpen,
  photo,
  photoIndex,
  onCancel,
  onSuccess,
  onFailure,
}) {
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const onClickDeletePhoto = useCallback(async () => {
    setIsProcessingRequest(true);
    try {
      await deletePhoto(photo.id);
      onSuccess(photoIndex);
      setIsProcessingRequest(false);
    } catch (error) {
      onFailure();
      setIsProcessingRequest(false);
    }
  }, [photo, onFailure, onSuccess, photoIndex]);

  const primaryAction = useMemo(
    () => ({
      content: "Delete photo",
      outline: true,
      id: "delete-photo-modal-primary",
      onAction: onClickDeletePhoto,
      ...(isProcessingRequest ? { loading: true } : {}),
    }),
    [isProcessingRequest, onClickDeletePhoto]
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
      open={isOpen}
      title={photoIndex != -1 ? photo.name : ""}
      onClose={onCancel}
      primaryAction={primaryAction}
      secondaryActions={secondaryAction}
    >
      <Modal.Section>
        {photoIndex != -1 && (
          <img
            src={GCS_BASE_URL + photo.uri}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        )}
      </Modal.Section>
    </Modal>
  );
}
DeletePhotoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  photo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    uri: PropTypes.string.isRequired,
  }),
  photoIndex: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
