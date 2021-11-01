import axios from "axios";
import { environment } from "../environment";
import TokenService from "../services/TokenService";

const instance = axios.create({
  baseURL: environment.API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

let retry = false;

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers!["Authorization"] = "Bearer " + token; // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== "auth/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !retry) {
        retry = true;

        try {
          const rs = await instance.get("auth/refresh-token");

          const { accessToken } = rs.data;

          console.log(rs);

          TokenService.setAccessToken(accessToken);

          retry = false;
          return instance(originalConfig);
        } catch (_error) {
          retry = false;
          return Promise.reject(_error);
        }
      }
    }

    retry = false;
    return Promise.reject(err);
  }
);

export default instance;
