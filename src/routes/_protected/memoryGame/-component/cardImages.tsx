export interface CardType {
    src: string;
    matched: boolean;
    id?: number;
}

import A from "@assets/images/attendance.png";
import B from "@assets/images/bus.png";
import C from "@assets/images/circular.png";
import D from "@assets/images/demoUserProfile.png";
import E from "@assets/images/coin3.png";
import F from "@assets/images/QRcode.png";

export const cardImages: CardType[] = [
    { src: A, matched: false },
    { src: B, matched: false },
    { src: C, matched: false },
    { src: D, matched: false },
    { src: E, matched: false },
    { src: F, matched: false },
];