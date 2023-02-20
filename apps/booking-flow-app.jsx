import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { routes } from "@src/routes";
import { BookingProvider, segmentClient } from "@src/core";

import {
  HomePage,
  ChooseProductPage,
  SchedulePage,
  SuccessPage,
  SummaryPage,
} from "../pages";

export function BookingFlowApp() {
  const location = useLocation();
  const routeName = Object.keys(routes).find(
    (key) => routes[key] === location.pathname
  );

  React.useEffect(() => {
    segmentClient.page(
      `Booking Flow${routeName ? `: ${routeName}` : ""}`,
      {},
      {
        Intercom: { hideDefaultLauncher: false },
      }
    );
  }, []);

  return (
    <BookingProvider>
      <Helmet>
        <title>HomeBreeze — Schedule Water Heater Installation</title>
        <meta
          name="description"
          content="Book online. No waiting for call-backs - just upfront, fixed prices that save you $500+."
        />
        <meta
          property="og:title"
          content="HomeBreeze — Schedule Water Heater Installation"
        />
        <meta
          property="og:description"
          content="Book online. No waiting for call-backs - just upfront, fixed prices that save you $500+."
        />
        <meta
          property="twitter:title"
          content="HomeBreeze — Schedule Water Heater Installation"
        />
        <meta
          property="twitter:description"
          content="Book online. No waiting for call-backs - just upfront, fixed prices that save you $500+."
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<Navigate to={routes.ChooseProduct} />} />
        <Route path={routes.ChooseProduct} element={<ChooseProductPage />} />
        <Route path={routes.Summary} element={<SummaryPage />} />
        <Route
          path={routes.ScheduleTank}
          element={
            <SchedulePage
              calendlyUrl={process.env.REACT_APP_CALENDLY_URL_TANK}
            />
          }
        />
        <Route
          path={routes.ScheduleTankless}
          element={
            <SchedulePage
              calendlyUrl={process.env.REACT_APP_CALENDLY_URL_TANKLESS}
            />
          }
        />
        <Route path={routes.Success} element={<SuccessPage />} />
      </Routes>
    </BookingProvider>
  );
}
