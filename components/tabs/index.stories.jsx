import React, { useState, useCallback } from "react";

import { CustomTabs } from "./index";

export default {
  component: CustomTabs,
  title: "Components/CustomTabs",
};

export const ProAppJobListTab = () => {
  const [selected, setSelected] = useState(0);
  const tabs = [
    {
      id: 'proappjoblisttab-open',
      content: 'Open',
      panelID: 'pro-app-job-list-tab-open',
    },
    {
      id: 'proappjoblisttab-completed',
      content: 'Completed',
      panelID: 'pro-app-job-list-tab-completed',
    },
  ];
  return (
    <CustomTabs
      selected={selected}
      setSelected={(selectedTabIndex) => {setSelected(selectedTabIndex)}}
      tabs={tabs}
    >
    </CustomTabs>
  )
};