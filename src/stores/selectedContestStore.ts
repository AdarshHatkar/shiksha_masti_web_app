import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createZustandSelectors } from "../helpers/zustand/createZustandSelectors";

type TSelectedContest = {
    contestId: number;
    maxTeams: number;
    playersInTeam: number;
    entryPerPlayer: number;
};

type TSelectedContestStore = TSelectedContest & {
    selectContest: ({
        contestId,
        maxTeams,
        playersInTeam,
        entryPerPlayer,
    }: TSelectedContest) => void;
};

const selectedContestStoreBase = create<TSelectedContestStore>()(
    devtools((set) => ({
        contestId: 0,
        playersInTeam: 0,
        maxTeams: 0,
        entryPerPlayer: 0,

        selectContest: ({
            contestId,
            playersInTeam,
            maxTeams,
            entryPerPlayer,
        }) => set({ contestId, playersInTeam, maxTeams, entryPerPlayer }),
    }))
);

export const selectedContestStore = createZustandSelectors(
    selectedContestStoreBase
);
