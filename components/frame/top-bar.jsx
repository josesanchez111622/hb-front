import React, { useState, useCallback } from "react";
import { TopBar as PolarisTopBar } from "@shopify/polaris";
import { UserMenu } from "./user-menu";
import { useBooking } from "@src/core";
import { useAuth } from "@src/core";

export const BookingFlowTopBar = (breakpoint) => {
  const { tankType, urlToken, bathroomCaverage, powerType } = useBooking();
  const initiateRestart = React.useCallback(() => {
    const urlParams = `?bathroom_coverage=${bathroomCaverage}&power_type=${powerType}&url_token=${urlToken}`;
    if (tankType) {
      location.href = process.env.REACT_APP_TYPEFORM_URL_TANK + urlParams;
      return;
    }
    location.href = process.env.REACT_APP_TYPEFORM_URL_TANKLESS + urlParams;
  }, [urlToken, tankType, bathroomCaverage, powerType]);

  const buttonClassName =
    breakpoint == "S"
      ? "Polaris-Button"
      : "Polaris-Button Polaris-Button--sizeLarge";

  const secondaryMenuMarkup = (
    <PolarisTopBar.Menu
      activatorContent={
        <span className={buttonClassName}>
          <span className="Polaris-Button__Content">
            <span className="Polaris-Button__Text">Restart</span>
          </span>
        </span>
      }
      onOpen={initiateRestart}
    />
  );

  return <PolarisTopBar secondaryMenu={secondaryMenuMarkup}></PolarisTopBar>;
};

export const ProAppTopBar = (breakpoint, toggleMobileNavigationActive) => {
  const { proUser, isFrameLoading, userLogout } = useAuth();
  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );

  const userMenuActions = [
    {
      items: [
        {
          content: "Sign out",
          onAction: userLogout,
        },
      ],
    },
  ];

  const userMenuMarkup = proUser ? (
    <UserMenu
      name={proUser.name || ""}
      detail=""
      initials={proUser && proUser.name ? proUser.name[0].toUpperCase() : "U"}
      actions={userMenuActions}
      onToggle={toggleUserMenuActive}
      open={userMenuActive}
    />
  ) : (
    <></>
  );

  const topbar = isFrameLoading ? (
    <PolarisTopBar
      showNavigationToggle={false}
      onNavigationToggle={toggleMobileNavigationActive}
    ></PolarisTopBar>
  ) : (
    <PolarisTopBar
      showNavigationToggle={false}
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    ></PolarisTopBar>
  );

  return topbar;
};
