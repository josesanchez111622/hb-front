import React, { useState } from "react";
import { Card, TextField, Button, Layout } from "@shopify/polaris";
import PropTypes from "prop-types";
import "./styles.scss";

export const ProAppLoginVerificationCard = ({
  code,
  codeErr,
  onChangeCode,
  onClickLogin,
  onClickResendCode,
  isLoading,
}) => {
  return (
    <Card title="Login" sectioned>
      <Layout>
        <Layout.Section>
          <TextField
            type="tel"
            label="Login code"
            value={code}
            onChange={onChangeCode}
            error={codeErr === "" ? false : codeErr}
          />
        </Layout.Section>
        <Layout.Section>
          <Button plain onClick={onClickResendCode}>
            Resend code
          </Button>
          <Button
            id="login-verify"
            loading={isLoading}
            primary
            onClick={onClickLogin}
          >
            Login
          </Button>
        </Layout.Section>
      </Layout>
    </Card>
  );
};

ProAppLoginVerificationCard.propTypes = {
  code: PropTypes.string.isRequired,
  codeErr: PropTypes.string.isRequired,
  onChangeCode: PropTypes.func.isRequired,
  onClickLogin: PropTypes.func.isRequired,
  onClickResendCode: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
