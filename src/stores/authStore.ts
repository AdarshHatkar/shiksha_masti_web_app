import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createZustandSelectors } from "../helpers/zustand/createZustandSelectors";
import { unixTimeStampInSeconds } from "../helpers/utilityHelper";
import { storeBaseName } from "./common";

type TTokens = {
    accessToken: string;
    refreshToken: string;
};

type TAuthStore = {
    accessToken: string;
    refreshToken: string;
    updatedAt: number;

    clearTokens: () => void;
    setAuthData: ({ accessToken, refreshToken }: TTokens) => void;
    updateAccessToken: (accessToken: string) => void;
};

const authStoreBase = create<TAuthStore>()(
    devtools(
        persist(
            (set) => ({
                accessToken: "",
                refreshToken: "",
                updatedAt: 0,
                setAuthData: ({ accessToken, refreshToken }) =>
                    set({
                        accessToken,
                        refreshToken,
                        updatedAt: unixTimeStampInSeconds(),
                    }),
                updateAccessToken: (accessToken: string) =>
                    set({ accessToken, updatedAt: unixTimeStampInSeconds() }),

                clearTokens: () =>
                    set({
                        accessToken: "",
                        refreshToken: "",
                        updatedAt: unixTimeStampInSeconds(),
                    }),
            }),
            {
                name: `${storeBaseName}-authStore`,
            }
        )
    )
);

export const authStore = createZustandSelectors(authStoreBase);
