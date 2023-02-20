import React from "react";
import { Button, Card, Stack } from "@shopify/polaris";
import "./styles.scss";

export function Job({
  isCompleted = false,
  jobId = 0,
  jobCreatedTime = "",
  jobType = "",
  jobSupplyHouse = "",
  jobAddress = "",
  completed = "",
}) {
  return (
    <Card title={"Job #" + jobId + ", " + jobCreatedTime}>
      <Card.Section title="JOB TYPE">
        <p>{jobType}</p>
      </Card.Section>

      {!isCompleted && (
        <>
          <Card.Section title="SUPPLY HOUSE ADDRESS">
            <p>{jobSupplyHouse}</p>
          </Card.Section>

          <Card.Section title="JOB ADDRESS">
            <Stack spacing="loose" vertical>
              <p>{jobAddress}</p>
              <Stack distribution="fill">
                <Button fullWidth url={"/site/pro/job-detail/" + jobId}>
                  View Details
                </Button>
              </Stack>
            </Stack>
          </Card.Section>
        </>
      )}
      {isCompleted && (
        <>
          <Card.Section title="COMPLETED">
            <Stack spacing="loose" vertical>
              <p>{completed}</p>
              <Stack distribution="fill">
                <Button fullWidth url={"/site/pro/job-detail/" + jobId}>
                  View Details
                </Button>
              </Stack>
            </Stack>
          </Card.Section>
        </>
      )}
    </Card>
  );
}
