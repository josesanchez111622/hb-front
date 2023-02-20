import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, segmentClient } from "@src/core";
import { Helmet } from "react-helmet-async";

import { LoginPage, JobListPage, JobDetailPage } from "../pages";


export function ProApp() {
  React.useEffect(() => {
    segmentClient.page(
      "Pro App",
      {},
      {
        Intercom: { hideDefaultLauncher: true },
      }
    );
  }, [])

  return (
    <AuthProvider>
      <Helmet>
        <title>HomeBreeze — Pro App</title>
        <meta
          name="description"
          content="Get and complete jobs in the HomeBreeze pro app."
        />
        <meta property="og:title" content="HomeBreeze — Pro App" />
        <meta
          property="og:description"
          content="Get and complete jobs in the HomeBreeze pro app."
        />
        <meta property="twitter:title" content="HomeBreeze — Pro App" />
        <meta
          property="twitter:description"
          content="Get and complete jobs in the HomeBreeze pro app."
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/job-list" element={<JobListPage />} />
        <Route path="/job-detail/:id" element={<JobDetailPage />} />
      </Routes>
    </AuthProvider>
  );
}
