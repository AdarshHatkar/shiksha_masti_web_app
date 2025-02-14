import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createZustandSelectors } from "../helpers/zustand/createZustandSelectors";
import { storeBaseName } from "./common";

type TAppUiStore = {
    isSidebarVisible: boolean;
    togglePanelSidebar: () => void;
    setPanelSidebarState: ({ newState }: { newState: boolean }) => void;
};

const appUiStoreBase = create<TAppUiStore>()(
    devtools(
        persist(
            (set) => ({
                isSidebarVisible: false,

                togglePanelSidebar: () =>
                    set((state) => {
                        if (state.isSidebarVisible) {
                            return { isSidebarVisible: false };
                        } else {
                            return { isSidebarVisible: true };
                        }
                    }),
                setPanelSidebarState: ({ newState }) =>
                    set(() => {
                        return { isSidebarVisible: newState };
                    }),
            }),
            {
                name: `${storeBaseName}-gamingAppStore`,
            }
        )
    )
);

export const appUiStore = createZustandSelectors(appUiStoreBase);
