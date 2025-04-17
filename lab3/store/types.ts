export type TaskType = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export type GameContextType = {
  score: number;
  addScore: (points: number) => void;
  tasks: TaskType[];
  completeTask: (taskId: number) => void;
  resetGame: () => void;
  clickCount: number;
  doubleClickCount: number;
  incrementClickCount: () => void;
  incrementDoubleClickCount: () => void;
  hasCompletedDrag: boolean;
  setHasCompletedDrag: (value: boolean) => void;
  hasCompletedHold: boolean;
  setHasCompletedHold: (value: boolean) => void;
  hasCompletedSwipeRight: boolean;
  setHasCompletedSwipeRight: (value: boolean) => void;
  hasCompletedSwipeLeft: boolean;
  setHasCompletedSwipeLeft: (value: boolean) => void;
  hasCompletedPinch: boolean;
  setHasCompletedPinch: (value: boolean) => void;
};