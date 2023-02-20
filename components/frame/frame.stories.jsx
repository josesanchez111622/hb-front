import React from "react";

import { Frame as PolarisFrame, SkeletonBodyText } from "@shopify/polaris";

import {
  BookingFlowFrame as BookingFlowFrameEl,
  BookingFlowPage,
  ProAppFrame as ProAppFrameEl,
  ProAppPage
} from "@src/components";

export default {
  title: "Components/Frame",
  component: PolarisFrame,
};

export const BookingFlowFrame = () => {
  return <BookingFlowFrameEl />
};

export const BookingFlowFrameWithPage = () => {
  return <BookingFlowFrameEl>
    <BookingFlowPage title="Booking Flow Page title">
      <SkeletonBodyText />
    </BookingFlowPage>
  </BookingFlowFrameEl>
};

export const ProAppFrame = () => {
  return <ProAppFrameEl />
}

export const ProAppFrameWithPage = () => {
  return <ProAppFrameEl>
    <ProAppPage title="Pro App Page title">
      <SkeletonBodyText />
    </ProAppPage>
  </ProAppFrameEl>
};
