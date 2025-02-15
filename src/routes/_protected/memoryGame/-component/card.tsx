import { Image } from "@nextui-org/react";

interface CardProps {
    card: { src: string; matched: boolean };
    onClick: () => void;
    flipped: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, flipped }) => {
    return (
        <div className="relative w-24 h-32 cursor-pointer" onClick={onClick}>
            <div
                className={`absolute bg-white w-20 h-20 transition-transform duration-300 ${flipped ? "rotate-y-0" : "rotate-y-180"
                    }`}
            >
                <Image
                    src={flipped ? card.src : "/images/back.png"}
                    className="object-cover w-20 h-20 bg-white rounded-lg"
                />
            </div>
        </div>
    );
};

export default Card;