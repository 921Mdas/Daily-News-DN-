import { toast } from "react-toastify";
import cookie from "react-cookies";

export const NOTIFTYPE = {
  success: "SUCCESS",
  error: "ERROR",
  warning: "WARNING",
};

export const showToast = (type, msg) => {
  switch (type) {
    case NOTIFTYPE.success:
      toast.success(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: "customId2",
      });
      break;
    case NOTIFTYPE.error:
      toast.error(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: "customIdx5",
      });
      break;
    case NOTIFTYPE.warning:
      toast.warning(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
        toastId: "customIfg9",
      });

      break;
    default:
      return false;
  }
};

// get token from localstorage
const getTokenCookie = () => {
  const savedBrowserToken = localStorage.getItem("tokenAuth");
  return savedBrowserToken;
};

// remove token from localstorage on signout
// export const removeTokenCookie = cookie.remove("");

// set the header with info for axios
export const getAuthHeader = {
  headers: { tokenAuth: getTokenCookie() },
};
