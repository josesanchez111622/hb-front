import React from "react";
import { useNavigate } from "react-router-dom";
import { Storage } from "@src/utils";
import {
  confirmValidToken,
  getRegenerateToken,
  segmentClient,
  ProUser,
} from "@src/core";

const AuthContext = React.createContext({});

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isFrameLoading, setIsFrameLoading] = React.useState(true);
  const [proUser, setProUser] = React.useState(ProUser.fromJSON({}));

  React.useEffect(() => {
    (async () => {
      if (!Storage.accessToken) {
        navigate("/");
        setIsFrameLoading(false);
        return;
      }

      function setAuth() {
        setIsAuthenticated(true);
        setProUser(ProUser.fromJSON(JSON.parse(Storage.proUser)));
        setIsFrameLoading(false);
        return;
      }

      if (await validToken()) {
        return setAuth();
      } else if (await regenerateToken()) {
        setAuth();
      } else {
        navigate("/");
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!proUser || proUser.id == null) return;

    segmentClient.identify(proUser.id, ProUser.identityJSON(proUser));
  }, [proUser]);

  async function validToken() {
    try {
      await confirmValidToken(Storage.accessToken);
      return true;
    } catch {
      return false;
    }
  }

  async function regenerateToken() {
    if (!Storage.refreshToken) return false;
    try {
      const res = await getRegenerateToken(Storage.refreshToken);
      Storage.accessToken = res.access;
      return true;
    } catch {
      return false;
    }
  }

  function userLogin(userData) {
    const { access: accessToken, refresh: refreshToken } = userData;

    Storage.accessToken = accessToken;
    Storage.refreshToken = refreshToken;
    Storage.proUser = JSON.stringify(ProUser.fromJSON(userData));
    setProUser(ProUser.fromJSON(userData));
    setIsAuthenticated(true);
  }

  function userLogout() {
    Storage.accessToken = null;
    Storage.refreshToken = null;
    Storage.proUser = JSON.stringify(ProUser.fromJSON({}));
    setProUser(ProUser.fromJSON({}));
    setIsAuthenticated(false);
    navigate("/");
  }

  const memoedValue = React.useMemo(
    () => ({
      userLogout,
      userLogin,
      isAuthenticated,
      proUser,
      isFrameLoading,
    }),
    [userLogout, userLogin, isAuthenticated, proUser, isFrameLoading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}
