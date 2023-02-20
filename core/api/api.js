import axios from "axios";

import { API_BASE_URL } from "@src/config";
import { Storage } from "@src/utils";

export class Api {
  static get headers() {
    const accessToken = Storage.accessToken;
    if (!accessToken) return axios.defaults.headers;
    return {
      ...axios.defaults.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  static createConfiguration() {
    return { ...axios.defaults, headers: Api.headers };
  }

  static async get(path, params = undefined) {
    let query = ""
    if(params) {
      query = "?" + new URLSearchParams(params)
    }
    const requestPath = API_BASE_URL + path + query;
    return await axios.get(requestPath, Api.createConfiguration());
  }

  static async post(path, params = undefined) {
    return await axios.post(
      API_BASE_URL + path,
      params,
      Api.createConfiguration()
    );
  }

  static async uploadFiles(path, formData) {
    let config = Api.createConfiguration();
    config["headers"] = {
      ...config["headers"],
      "Content-Type": "multipart/form-data",
    };

    return await axios.post(API_BASE_URL + path, formData, config);
  }

  static async put(path, params = undefined) {
    return await axios.put(
      API_BASE_URL + path,
      params,
      Api.createConfiguration()
    );
  }

  static async delete(path, params = null) {
    return await axios.delete(API_BASE_URL + path, {
      headers: Api.headers,
      data: params,
    });
  }
}
