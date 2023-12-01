import { toast } from "react-hot-toast";

export const successMessageToast = (msg) => {
  toast.success(msg);
};

export const errorMessageToast = (msg) => {
  toast.error(msg);
};
