import axios from "axios";
import Swal from "sweetalert2";
import { authStore } from "../stores/authStore";
import { gamingAppStore } from "../stores/gamingAppStore";
import { restBaseUrl } from "./config";
import { myToast } from "./utilityHelper";

export function axiosErrorHandler({ error, navigate, dispatch }) {
    setupAxiosInstance();
    if (error === undefined) {
        myToast.fire({
            icon: "error",
            title: "error in axiosErrorHandler Call",
        });
    }
    navigate = navigate || null;
    console.log({ error });
    // local error handlers
    if (error?.name == "ZodError") {
        myToast.fire({
            icon: "error",
            title: `${error?.issues[0]?.message}`,
        });
    }

    // api error handlers
    if (error?.data?.status === 401) {
        // dispatch(validateUserAuth(navigate, true))
    }
    if (error?.code === "ERR_NETWORK") {
        myToast.fire({
            icon: "error",
            title: error?.message,
        });
    }
    if (error?.data?.status === 422) {
        const data = error.data.result;
        if (data?.errors) {
            Swal.fire({
                icon: "error",
                title: "Input Error",
                text: `${JSON.stringify(data.errors)}`,
            });
        }

        if (data?.name == "ZodError") {
            Swal.fire({
                icon: "error",
                title: "Input Error",
                text: `${data?.issues[0]?.message}`,
            });
        }
    }
}

export function axiosResponseHandler(response) {
    setupAxiosInstance();
    const res = response.data;
    if (res.status === "error") {
        myToast.fire({
            icon: "error",
            title: res.msg,
        });

        return false;
    }
    if (res.status === "invalidAppUsername") {
        Swal.fire({
            icon: "error",
            title: "Invalid link",
            text: "Invalid App Username",
            showConfirmButton: false,

            allowOutsideClick: false,
        });

        return false;
    }
}

//  export const callTheWebAppServerGet  =  axios.create({
//     method: 'get',
//     baseURL: apiBaseUrl + `/${getMtaWebAppData().appUsername}`,
//     timeout: 60*1000,
//     headers: { Authorization: `Bearer ${getMtaUserAuthData().accessToken}` }
//   });

// export const callTheWebAppServerPost  = axios.create({
//   method: 'post',
//   baseURL: apiBaseUrl + `/${getMtaWebAppData().appUsername}`,
//   timeout: 60*1000,
//   headers: { Authorization: `Bearer ${getMtaUserAuthData().accessToken}` }
// });

// this from main

export let callTheGamingAppServerGet = null;
export let callTheGamingAppServerPost = null;

export const setupAxiosInstance = () => {
    callTheGamingAppServerGet = axios.create({
        method: "get",
        baseURL: restBaseUrl,
        timeout: 60 * 1000,
        headers: {
            Authorization: `Bearer ${authStore.getState().accessToken}`,
        },
        params: { appId: gamingAppStore.getState().appId },
    });

    callTheGamingAppServerPost = axios.create({
        method: "post",
        baseURL: restBaseUrl,
        timeout: 60 * 1000,
        headers: {
            Authorization: `Bearer ${authStore.getState().accessToken}`,
        },
    });
};
