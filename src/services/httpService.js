import Axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

Axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.reponse &&
    (error.reponse.status >= 400) & (error.reponse.status < 500);
  if (!expectedError) {
    logger.log(error);
    toast.error("Something wrong");
  }
  return Promise.reject(error);
});

export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete,
};
