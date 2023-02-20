import React, { useState, useCallback } from "react";
import { Card, Tabs } from "@shopify/polaris";
import "./styles.scss";

export function CustomTabs({
  selected = 0,
  setSelected = () => {},
  tabs = [],
  ...props
}) {
  const handleTabChange = (selectedTabIndex) => {
    setSelected(selectedTabIndex);
  };

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <Card.Section>{props.children}</Card.Section>
      </Tabs>
    </Card>
  );
}
