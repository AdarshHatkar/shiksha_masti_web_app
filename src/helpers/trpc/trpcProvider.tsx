import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useCallback, useEffect, useState } from "react";
import superjson from "superjson";

import { authStore } from "../../stores/authStore";
import { gamingAppStore } from "../../stores/gamingAppStore";
import { trpcBaseUrl } from "../config";
import { fetcher } from "./fetcher";
import { backendV1 } from "./trpc";

export function TrpcProvider(props: { children: React.ReactNode }) {
    const appSlug = gamingAppStore.use.appSlug();

    // The function which needed to be called in every request
    const headerFn = () => {
        //  console.log("headerFn: " + accessToken.current);
        return {
            Authorization: `Bearer ${authStore.getState().accessToken}`,
        };
    };

    // testing app username
    const [queryClient] = useState(() => new QueryClient());

    const createTrpcClientFunction = useCallback(() => {
        return backendV1.createClient({
            links: [
                httpBatchLink({
                    url: `${trpcBaseUrl}`,
                    headers: headerFn,
                    fetch: fetcher,
                }),
            ],

            transformer: superjson,
        });
    }, []);
    const [trpcClient, setTrpcClient] = useState(createTrpcClientFunction);
    useEffect(() => {
        //  console.log("new appUsername: " + appData?.appUsername);
        setTrpcClient(createTrpcClientFunction);
    }, [createTrpcClientFunction]);

    return (
        <backendV1.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {props.children}
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </backendV1.Provider>
    );
}
