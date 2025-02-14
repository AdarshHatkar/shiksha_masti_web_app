import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { unixTimeStampInSeconds } from "../helpers/utilityHelper";
import { createZustandSelectors } from "../helpers/zustand/createZustandSelectors";
import { storeBaseName } from "./common";

type TAppData = {
    appName: string;

    appId: number;
    appLogo: string;
};

type TGamingAppStore = TAppData & {
    appSlug: string;
    isAppSlugVerified: boolean;
    updatedAt: number;

    setGamingAppData: ({ appId, appName, appLogo }: TAppData) => void;
    setGamingAppSlug: (appSlug: string) => void;
};

const gamingAppStoreVersion = 1;

const gamingAppStoreBase = create<TGamingAppStore>()(
    devtools(
        persist(
            (set) => ({
                appName: "",
                appSlug: "",
                appId: 0,
                appLogo: "",
                updatedAt: unixTimeStampInSeconds(),
                isAppSlugVerified: false,
                setGamingAppData: ({ appId, appName, appLogo }) => {
                    set({
                        appId,
                        appName,
                        appLogo,
                        isAppSlugVerified: true,
                        updatedAt: unixTimeStampInSeconds(),
                    });
                },
                setGamingAppSlug: (appSlug) =>
                    set({ appSlug, isAppSlugVerified: false }),
            }),
            {
                name: `${storeBaseName}-gamingAppStore-v${gamingAppStoreVersion}`,
            }
        )
    )
);

export const gamingAppStore = createZustandSelectors(gamingAppStoreBase);
