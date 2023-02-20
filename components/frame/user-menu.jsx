import React from "react";

import {
  Avatar as PolarisAvatar,
  TopBar as PolarisTopBar,
} from "@shopify/polaris";

export function UserMenu({
  name,
  detail,
  initials,
  actions,
  onToggle,
  open,
  message=false,
}) {
  const activatorContentMarkup = (
    <>
      <PolarisAvatar
        size="small"
        initials={initials && initials.replace(" ", "")}
        customer={true}
      />
      <span className={"Polaris-TopBar-UserMenu__Details"}>
        <p className={"Polaris-TopBar-UserMenu__Name"}>{name}</p>
        <p className={"Polaris-TopBar-UserMenu__Detail"}>{detail}</p>
      </span>
    </>
  );

  return (
    <PolarisTopBar.UserMenu
      actions={actions}
      name={name}
      detail={detail}
      initials={initials}
      open={open}
      onToggle={onToggle}
    />
  );
}
