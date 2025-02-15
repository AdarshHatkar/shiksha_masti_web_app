import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { cardImages, CardType } from "./-component/cardImages";
import Card from "./-component/card";

export const Route = createFileRoute("/_protected/memoryGame/")({
  component: MemoryGamePage
});

function MemoryGamePage() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstChoice, setFirstChoice] = useState<CardType | null>(null);
  const [secondChoice, setSecondChoice] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  // Shuffle Cards
  function shuffleCards() {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setCards(shuffledCards);
    setFirstChoice(null);
    setSecondChoice(null);
  }

  // Handle Card Selection
  function handleChoice(card: CardType) {
    if (!disabled) {
      firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    }
  }

  // Check for a Match
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === firstChoice.src ? { ...card, matched: true } : card
          )
        );
      }
      setTimeout(() => {
        setFirstChoice(null);
        setSecondChoice(null);
        setDisabled(false);
      }, 1000);
    }
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen text-white bg-gray-900">
      <h1 className="my-4 text-3xl font-bold">Memory Game</h1>
      <button
        className="px-4 py-2 mb-4 bg-blue-500 rounded-lg"
        onClick={shuffleCards}
      >
        Restart Game
      </button>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleChoice(card)}
            flipped={card.matched || firstChoice?.id === card.id || secondChoice?.id === card.id}
          />
        ))}
      </div>
    </div>
  );
}

export default MemoryGamePage;
