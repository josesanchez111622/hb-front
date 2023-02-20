import React, { useState, useCallback } from "react";
import "./styles.scss";
import logoPath from "@src/assets/images/booking/logo.svg";
import { Frame as PolarisFrame, Navigation } from "@shopify/polaris";
import { HomeMinor, OrdersMinor, ProductsMinor } from "@shopify/polaris-icons";
import { createBreakpoint } from "react-use";
import { BookingFlowTopBar, ProAppTopBar } from "./top-bar";
import { SmallScreenSize } from "@src/config";
import { AppBaseUrl } from "@src/config";

const useBreakpoint = createBreakpoint({
  M: SmallScreenSize + 1,
  S: SmallScreenSize,
});

export const BookingFlowFrame = (props) => {
  const breakpoint = useBreakpoint();

  const customPropertyOverrideClasses =
    "CustomFrameOverrides CustomColorOverrides CustomTypographyOverrides";

  const logoWidth = breakpoint == "S" ? 140 : 200;

  const logo = {
    width: logoWidth,
    topBarSource: logoPath,
    contextualSaveBarSource: logoPath,
    url: AppBaseUrl,
    accessibilityLabel: "HomeBreeze",
  };

  return (
    <div className={customPropertyOverrideClasses}>
      <PolarisFrame
        topBar={BookingFlowTopBar(breakpoint)}
        logo={logo}
        {...props}
      >
        {props.children}
      </PolarisFrame>
    </div>
  );
};

export const ProAppFrame = ({
  hideTopBar = false,
  hideNavigation = true,
  ...props
}) => {
  const breakpoint = useBreakpoint();
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const logo = {
    width: 175,
    topBarSource: logoPath,
    contextualSaveBarSource: logoPath,
    url: "/site/pro/job-list/",
    accessibilityLabel: "HomeBreeze",
  };

  const customPropertyOverrideClasses =
    "CustomProAppFrameOverrides CustomColorOverrides CustomTypographyOverrides";

  const navigationMarkup = hideNavigation ? (
    false
  ) : (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: "/",
            label: "Jobs",
            icon: HomeMinor,
          },
          {
            url: "/path/to/place",
            label: "Payments",
            icon: OrdersMinor,
            badge: "15",
          },
          {
            url: "/path/to/place",
            label: "Messages",
            icon: ProductsMinor,
          },
        ]}
      />
    </Navigation>
  );

  const topBarMarkup = hideTopBar
    ? false
    : ProAppTopBar(breakpoint, toggleMobileNavigationActive);

  return (
    <div className={customPropertyOverrideClasses}>
      <PolarisFrame
        topBar={topBarMarkup}
        navigation={navigationMarkup}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
        logo={logo}
        {...props}
      >
        {props.children}
      </PolarisFrame>
    </div>
  );
};

export * from "./top-bar";
