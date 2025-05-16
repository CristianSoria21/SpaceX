import axios from "axios";

const axiosServices = axios.create({
  baseURL: "https://api.spacexdata.com/v4",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la solicitud:", error);
    return Promise.reject(error);
  }
);

export default axiosServices;
