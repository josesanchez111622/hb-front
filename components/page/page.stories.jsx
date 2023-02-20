import React from "react";

import {
  BookingFlowPage as BookingFlowPageEl,
  ProAppPage as ProAppPageEl,
} from "@src/components";

import { Badge } from "@shopify/polaris";

export default {
  title: "Components/Page",
  component: BookingFlowPageEl,
};

export const BookingFlowPage = () => {
  return <BookingFlowPageEl title="Test Title" />;
};

export const BookingFlowPageTitleOnly = () => {
  return <BookingFlowPageEl title="Test Title" titleOnly />;
};

export const BookingFlowPageTitleNoHeader = () => {
  return <BookingFlowPageEl title="Test Title" noHeader />;
};

export const ProAppPageListView = () => {
  return <ProAppPageEl title="Pro App: List View" />;
};

export const ProAppDetailPage = () => {
  return (
    <ProAppPageEl
      title="Pro App: Test Title"
      titleMetadata={<Badge status="new">Open</Badge>}
      subtitle="Monday, July 25th at 8:00 AM"
      breadcrumbs={[{content: 'Products', url: '/products'}]}
    />
  );
};
