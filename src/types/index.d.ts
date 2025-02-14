/* eslint-disable @typescript-eslint/no-explicit-any */

export {};
declare global {
    interface Window {
        Android: any; // this will be your variable name
        updateTrpcClient: any;
    }
    namespace Express {
        export interface Request {
            appData?: appDataType;
        }
    }
}
declare namespace JSX {
    interface IntrinsicElements {
        "dotlottie-player": any;
    }
}
