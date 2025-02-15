import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/mathGame/")({
  component: MatchGamePage
});

import { useEffect } from "react";
import { create } from "zustand";
import { motion } from "framer-motion";

type Question = {
  question: string;
  answer: string;
};

type Difficulty = "easy" | "medium" | "hard";

type GameState = {
  shuffledQuestions: Question[];
  shuffledAnswers: string[];
  selected: { question?: string; answer?: string };
  points: number;
  attempts: number;
  streak: number;
  message: string;
  timeLeft: number;
  gameOver: boolean;
  difficulty: Difficulty | null;
  setDifficulty: (difficulty: Difficulty) => void;
  initializeGame: () => void;
  decrementTime: () => void;
  endGame: () => void;
  select: (type: "question" | "answer", value: string) => void;
};

const generateQuestions = (difficulty: Difficulty): Question[] => {
  let operations: string[];
  switch (difficulty) {
    case "easy":
      operations = ["+", "-"];
      break;
    case "medium":
      operations = ["+", "-", "*"];
      break;
    case "hard":
      operations = ["+", "-", "*", "/"];
      break;
    default:
      operations = ["+", "-"];
  }

  const generated: Question[] = [];

  for (let i = 0; i < 12; i++) {
    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let question = `${num1} ${operation} ${num2}`;
    let answer: number;

    switch (operation) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "*":
        answer = num1 * num2;
        break;
      case "/":
        num2 = num2 === 0 ? 1 : num2; // Avoid division by zero
        num1 = num2 * Math.floor(Math.random() * 10) + 1; // Ensure integer result
        question = `${num1} / ${num2}`;
        answer = num1 / num2;
        break;
      default:
        answer = 0;
    }

    generated.push({ question, answer: answer.toString() });
  }

  return generated;
};

const useGameStore = create<GameState>(set => ({
  shuffledQuestions: [],
  shuffledAnswers: [],
  selected: {},
  points: 0,
  attempts: 0,
  streak: 0,
  message: "",
  timeLeft: 60,
  gameOver: false,
  difficulty: null,
  setDifficulty: (difficulty) => set({ difficulty }),
  initializeGame: () => {
    set(state => {
      if (!state.difficulty) return state;
      const questions = generateQuestions(state.difficulty);
      return {
        shuffledQuestions: [...questions].sort(() => Math.random() - 0.5),
        shuffledAnswers: [...questions.map(q => q.answer)].sort(() => Math.random() - 0.5),
        selected: {},
        points: 0,
        attempts: 0,
        streak: 0,
        message: "",
        timeLeft: 60,
        gameOver: false,
      };
    });
  },
  decrementTime: () => set(state => ({ timeLeft: state.timeLeft - 1 })),
  endGame: () => set({ gameOver: true, message: "Time's up! Game Over!" }),
  select: (type, value) => set(state => {
    if (state.gameOver) return state;

    const newSelection = { ...state.selected, [type]: value };
    if (newSelection.question && newSelection.answer) {
      const correctPair = state.shuffledQuestions.find(q => q.question === newSelection.question && q.answer === newSelection.answer);
      if (correctPair) {
        return {
          selected: {},
          points: state.points + 10,
          streak: state.streak + 1,
          message: "✅ Correct! Keep going!",
          shuffledQuestions: state.shuffledQuestions.filter(q => q.question !== newSelection.question),
          shuffledAnswers: state.shuffledAnswers.filter(a => a !== newSelection.answer),
          attempts: state.attempts + 1,
        };
      } else {
        return {
          selected: {},
          streak: 0,
          message: "❌ Wrong match! Try again.",
          attempts: state.attempts + 1,
        };
      }
    }
    return { selected: newSelection };
  })
}));

export default function MatchGamePage() {
  const {
    shuffledQuestions,
    shuffledAnswers,
    selected,
    points,
    attempts,
    streak,
    message,
    timeLeft,
    gameOver,
    difficulty,
    setDifficulty,
    initializeGame,
    decrementTime,
    endGame,
    select
  } = useGameStore();

  useEffect(() => {
    if (difficulty) {
      initializeGame();
    }
  }, [difficulty]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => decrementTime(), 1000);
      return () => clearTimeout(timer);
    } else {
      endGame();
    }
  }, [timeLeft]);

  if (!difficulty) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-gradient-to-b from-blue-300 to-green-200">
        <motion.h1 className="mb-4 text-2xl font-bold">Select Difficulty</motion.h1>
        <div className="flex space-x-4">
          {["easy", "medium", "hard"].map(level => (
            <button
              key={level}
              className="px-4 py-2 text-white bg-blue-500 rounded-md"
              onClick={() => setDifficulty(level as Difficulty)}
            >
              {level.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gradient-to-b from-blue-300 to-green-200">

      <motion.h1 className="mt-8 mb-4 text-2xl font-bold" animate={{ scale: 1.1 }} transition={{ yoyo: Infinity, duration: 0.5 }}>
        Match the Answers! 🎮
      </motion.h1>
      <p className="mb-2 text-lg">Points: {points}</p>
      <p className="mb-2 text-lg">Attempts: {attempts}</p>
      <p className="mb-2 text-lg">Streak: {streak}</p>
      <p className="mb-2 text-lg font-bold text-red-500">⏳ Time Left: {timeLeft}s</p>
      <motion.p className="mb-4 text-lg font-semibold text-red-600" animate={{ opacity: [0, 1], transition: { duration: 0.5 } }}>{message}</motion.p>

      {!gameOver ? (
        <div className="grid w-full max-w-md grid-cols-2 gap-4">
          {shuffledQuestions.map(({ question }) => (
            <motion.button key={question} className="p-2 text-white bg-blue-500 rounded-md" onClick={() => select("question", question)}>
              {question}
            </motion.button>
          ))}
          {shuffledAnswers.map(answer => (
            <motion.button key={answer} className="p-2 text-white bg-green-500 rounded-md" onClick={() => select("answer", answer)}>
              {answer}
            </motion.button>
          ))}
        </div>
      ) : (
        <button className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md" onClick={() => setDifficulty(null)}>Restart</button>
      )}
    </div>
  );
}
