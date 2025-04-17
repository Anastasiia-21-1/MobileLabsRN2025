import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {GameContextType, TaskType} from "@/store/types";
import {initialTasks} from "@/store/initialValue";

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);
  const [clickCount, setClickCount] = useState(0);
  const [doubleClickCount, setDoubleClickCount] = useState(0);
  const [hasCompletedDrag, setHasCompletedDrag] = useState(false);
  const [hasCompletedHold, setHasCompletedHold] = useState(false);
  const [hasCompletedSwipeRight, setHasCompletedSwipeRight] = useState(false);
  const [hasCompletedSwipeLeft, setHasCompletedSwipeLeft] = useState(false);
  const [hasCompletedPinch, setHasCompletedPinch] = useState(false);

  const addScore = (points: number) => {
    setScore((prevScore) => prevScore + points);
  };

  const completeTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? {...task, completed: true} : task
      )
    );
  };

  const resetGame = () => {
    setScore(0);
    setTasks(initialTasks);
    setClickCount(0);
    setDoubleClickCount(0);
    setHasCompletedDrag(false);
    setHasCompletedHold(false);
    setHasCompletedSwipeRight(false);
    setHasCompletedSwipeLeft(false);
    setHasCompletedPinch(false);
  };

  const incrementClickCount = () => {
    setClickCount((prev) => prev + 1);
  };

  const incrementDoubleClickCount = () => {
    setDoubleClickCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (clickCount >= 10 && !tasks.find((t) => t.id === 1)?.completed) {
      completeTask(1);
    }

    if (doubleClickCount >= 5 && !tasks.find((t) => t.id === 2)?.completed) {
      completeTask(2);
    }

    if (hasCompletedHold && !tasks.find((t) => t.id === 3)?.completed) {
      completeTask(3);
    }

    if (hasCompletedDrag && !tasks.find((t) => t.id === 4)?.completed) {
      completeTask(4);
    }

    if (hasCompletedSwipeRight && !tasks.find((t) => t.id === 5)?.completed) {
      completeTask(5);
    }

    if (hasCompletedSwipeLeft && !tasks.find((t) => t.id === 6)?.completed) {
      completeTask(6);
    }

    if (hasCompletedPinch && !tasks.find((t) => t.id === 7)?.completed) {
      completeTask(7);
    }

    if (score >= 100 && !tasks.find((t) => t.id === 8)?.completed) {
      completeTask(8);
    }
  }, [
    clickCount,
    doubleClickCount,
    hasCompletedDrag,
    hasCompletedHold,
    hasCompletedSwipeRight,
    hasCompletedSwipeLeft,
    hasCompletedPinch,
    score,
    tasks,
  ]);

  return (
    <GameContext.Provider
      value={{
        score,
        addScore,
        tasks,
        completeTask,
        resetGame,
        clickCount,
        doubleClickCount,
        incrementClickCount,
        incrementDoubleClickCount,
        hasCompletedDrag,
        setHasCompletedDrag,
        hasCompletedHold,
        setHasCompletedHold,
        hasCompletedSwipeRight,
        setHasCompletedSwipeRight,
        hasCompletedSwipeLeft,
        setHasCompletedSwipeLeft,
        hasCompletedPinch,
        setHasCompletedPinch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};