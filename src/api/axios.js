import Axios from "axios"
const axiosInstance = Axios.create({
    baseURL: "https://car-carry.onrender.com/",
    headers: {
      "Content-Type": "application/json",
    },
  });
export default axiosInstance;
