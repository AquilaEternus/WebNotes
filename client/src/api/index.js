import axios from 'axios';

const instance = axios.create();

/* Refreshes token for backend calls requiring authorization if necessary. */
instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      let refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        instance.interceptors.response.eject(this);
        const res = await axios.post(`/v1/api/auth/refresh-token`, { refreshToken: refreshToken });
        // instance.defaults.headers.common['x-auth-token'] = res.data.token;
        localStorage.setItem("token", res.data.token);
        // console.log("Old: " + originalRequest.headers['x-auth-token'])
        // console.log("Access token refreshed!");
        originalRequest.headers['x-auth-token'] = res.data.token;
        return await instance(originalRequest);
      }
      return Promise.reject(error);
    }
  );

export default instance;