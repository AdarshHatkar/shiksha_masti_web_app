import "@fontsource/bai-jamjuree/200.css";
import "@fontsource/bai-jamjuree/300.css";
import "@fontsource/bai-jamjuree/400.css";
import "@fontsource/bai-jamjuree/500.css";
import "@fontsource/bai-jamjuree/600.css";
import "@fontsource/bai-jamjuree/700.css";
import "./global.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { NextUIProvider } from "@nextui-org/react";
import { routeTree } from "./routeTree.gen";
import { TrpcProvider } from "@helpers/trpc/trpcProvider";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

function App() {
    return (
        <>
            <NextUIProvider>
                <TrpcProvider>
                    <RouterProvider router={router} />
                </TrpcProvider>
            </NextUIProvider>
        </>
    );
}

export default App;
