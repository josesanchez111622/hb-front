import { Api } from "../api";

export const confirmValidToken = async (accessToken) => {
    return await Api.post("pro/auth/valid-token/", {
        token: accessToken,
    });
};

export const getRegenerateToken = async (refreshToken) => {
    await Api.post("pro/auth/refresh-token/", {
        refresh: refreshToken,
    });
};
