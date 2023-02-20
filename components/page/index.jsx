import React from "react";
import "./styles.scss";
import { Page as PolarisPage } from "@shopify/polaris";
import { ChevronLeftMinor } from "@shopify/polaris-icons";
import { SecondaryButton } from "@src/components";
import { createBreakpoint } from "react-use";
import { SmallScreenSize } from "@src/config";
import { useNavigate } from 'react-router-dom';

const useBreakpoint = createBreakpoint({
  M: SmallScreenSize + 1,
  S: SmallScreenSize,
});

export const BookingFlowPage = ({
  titleOnly = false,
  noHeader = false,
  handleBack,
  ...props
}) => {
  const breakpoint = useBreakpoint();
  const navigate = useNavigate();

  const headerClassNames =
    breakpoint == "S"
      ? "Polaris-Page-Header small-screen-header"
      : "Polaris-Page-Header";

  let pageHeader = titleOnly ? (
    <div className={headerClassNames}>
      <div className={"Polaris-Page-Header__TitleWrapper"}>
        <h1 className={"Polaris-Header-Title"}>{props.title}</h1>
      </div>
    </div>
  ) : (
    <div className={headerClassNames}>
      <div className={"Polaris-Page-Header__Row"}>
          <div className={"Polaris-Page-Header__BreadcrumbWrapper"}>
            {!handleBack && (
              <SecondaryButton icon={ChevronLeftMinor} onClick={() => { navigate(-1) }}>Back</SecondaryButton>
            )}
            {handleBack && (
              <SecondaryButton icon={ChevronLeftMinor} onClick={handleBack}>Back</SecondaryButton>
            )}
        </div>
        <div
          className={
            "Polaris-Page-Header__TitleWrapper title-plus not-small-screen"
          }
        >
          <h1 className={"Polaris-Header-Title"}>{props.title}</h1>
        </div>
      </div>
      <div className={"Polaris-Page-Header__TitleWrapper small-screen"}>
        <h1 className={"Polaris-Header-Title"}>{props.title}</h1>
      </div>
    </div>
  );

  if (noHeader) pageHeader = null;

  return (
    <PolarisPage fullWidth {...props} title={""}>
      {pageHeader}
      {props.children}
    </PolarisPage>
  );
};

export const ProAppPage = ({ title, ...props }) => {
  return (
    <PolarisPage
      title={title}
      {...props}
    >
      {props.children}
    </PolarisPage>
  );
};
