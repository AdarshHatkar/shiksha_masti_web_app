// fetcher.ts

import {} from "@trpc/client";

import { trpcVanillaClientForAuth } from "./trpc";

import { authStore } from "../../stores/authStore";

export const fetcher = async (
    info: RequestInfo | URL,
    options: RequestInit | undefined
) => {
    const response = await fetch(info, options);

    // console.log("fetcher",options);

    // Handle the Unauthorized error
    if (response.status === 401) {
        const refreshToken = authStore.getState().refreshToken;

        // console.log(refreshToken);
        // console.log(reduxStore?.getState().appData.appUsername);

        if (!refreshToken) {
            // navigate to login
            return response;
        }

        try {
            const refreshResponse =
                await trpcVanillaClientForAuth().auth.refreshToken.mutate({
                    refreshToken,
                });
            console.log("refreshResponse", refreshResponse);

            const accessToken = refreshResponse.result.accessToken;

            // reduxStore.dispatch(setUserAuthState({ accessToken, refreshToken }))
            authStore.getState().setAuthData({ accessToken, refreshToken });
            return await fetch(info, {
                ...options,
                headers: {
                    ...options?.headers,
                    authorization: `Bearer ${accessToken}`,
                },
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // Handle the Unauthorized error

            if (error?.data?.httpStatus === 401) {
                // navigate to login
            } else {
                console.log("fetcher error", { ...error.data });
            }
            // reduxStore.dispatch(logoutUser())
            authStore.getState().clearTokens();
            // navigate to login

            return response;
        }
    }

    // show tost on error
    // console.log("data", response);

    return response;
};
