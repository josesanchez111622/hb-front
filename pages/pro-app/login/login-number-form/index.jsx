import React, { useState } from "react";
import { Card, TextField, Button, TextStyle, Layout } from "@shopify/polaris";
import PropTypes from "prop-types";
import "./styles.scss";

export const ProAppLoginPhoneNumberCard = ({
  phoneNumber,
  phoneNumerErr,
  onChangePhoneNumber,
  onClickNext,
  isLoading,
}) => {
  return (
    <Card title="Login" sectioned>
      <Layout>
        <Layout.Section>
          <div id="login-text">
            <TextField
              type="tel"
              label="Phone number"
              value={phoneNumber}
              onChange={onChangePhoneNumber}
              error={phoneNumerErr === "" ? false : phoneNumerErr}
            />
          </div>
          <TextStyle variation="subdued">
            A login code will be sent your phone via text message
          </TextStyle>
        </Layout.Section>
        <Layout.Section>
          <Button
            id="login-next"
            loading={isLoading}
            primary
            onClick={onClickNext}
          >
            Next
          </Button>
        </Layout.Section>
      </Layout>
    </Card>
  );
};

ProAppLoginPhoneNumberCard.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  phoneNumerErr: PropTypes.string.isRequired,
  onChangePhoneNumber: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
