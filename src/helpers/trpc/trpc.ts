// utils/trpc.ts
import type { webAppTrpcRouterTypes } from "@b2fPortal/dist/dummyx/webApp/trpcApi/trpcRouter";
import { createTRPCProxyClient, createTRPCReact, httpBatchLink } from "@trpc/react-query";

import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import { authStore } from "../../stores/authStore";
import { gamingAppStore } from "../../stores/gamingAppStore";
import { trpcBaseUrl } from "../config";
import { fetcher } from "./fetcher";

export const backendV1 = createTRPCReact<webAppTrpcRouterTypes>();
// export type TrpcReactQueryOptionsInfer = inferReactQueryProcedureOptions<webAppTrpcRouterTypes>;
export type TBackedV1Input = inferRouterInputs<webAppTrpcRouterTypes>;
export type TBackedV1Output = inferRouterOutputs<webAppTrpcRouterTypes>;

// vanilla client code below
const appSlug = gamingAppStore.getState().appSlug;
console.log("appSlug from trpc.ts " + appSlug);

// The function which needed to be called in every request
const headerFn = () => {
    //  console.log("headerFn: " + accessToken.current);
    return {
        Authorization: `Bearer ${authStore.getState().accessToken}`,
    };
};

export const trpcVanillaClientForAuth = () => {
    return createTRPCProxyClient<webAppTrpcRouterTypes>({
        links: [
            httpBatchLink({
                url: `${trpcBaseUrl}/${appSlug}`,
                headers: headerFn,
            }),
        ],

        transformer: superjson,
    });
};

type TTrpcVanillaClientForSlugVerification = {
    appSlug: string;
};
export const trpcVanillaClientForSlugVerification = ({ appSlug }: TTrpcVanillaClientForSlugVerification) => {
    return createTRPCProxyClient<webAppTrpcRouterTypes>({
        links: [
            httpBatchLink({
                url: `${trpcBaseUrl}/${appSlug}`,
                headers: headerFn,
            }),
        ],

        transformer: superjson,
    });
};
export const trpcVanillaClient = () => {
    return createTRPCProxyClient<webAppTrpcRouterTypes>({
        links: [
            httpBatchLink({
                url: `${trpcBaseUrl}/${appSlug}`,
                headers: headerFn,
                fetch: fetcher,
            }),
        ],

        transformer: superjson,
    });
};
