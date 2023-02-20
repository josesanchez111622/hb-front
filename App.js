import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { BookingFlowApp, ProApp } from "@src/apps";
import { ErrorBoundary } from "@src/core/provider/error-boundary";

import { fontLazyLoader } from "@src/utils";

import "./assets/styles/app.scss";

function App() {
  React.useEffect(() => {
    fontLazyLoader.load(
      "https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900"
    );
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter basename="/site/booking">
          <BookingFlowApp />
        </BrowserRouter>
        <BrowserRouter basename="/site/pro">
          <ProApp />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
