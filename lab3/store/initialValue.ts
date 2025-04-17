import {TaskType} from "@/store/types";

export const initialTasks: TaskType[] = [
  {
    id: 1,
    title: 'Make 10 clicks',
    description: 'Tap on the object 10 times',
    completed: false,
  },
  {
    id: 2,
    title: 'Make 5 double clicks',
    description: 'Double tap on the object 5 times',
    completed: false,
  },
  {
    id: 3,
    title: 'Hold for 3 seconds',
    description: 'Hold the object for 3 seconds',
    completed: false,
  },
  {
    id: 4,
    title: 'Drag the object',
    description: 'Drag the object around the screen',
    completed: false,
  },
  {
    id: 5,
    title: 'Swipe right',
    description: 'Perform a quick swipe to the right',
    completed: false,
  },
  {
    id: 6,
    title: 'Swipe left',
    description: 'Perform a quick swipe to the left',
    completed: false,
  },
  {
    id: 7,
    title: 'Resize the object',
    description: 'Pinch to resize the object',
    completed: false,
  },
  {
    id: 8,
    title: 'Get 100 points',
    description: 'Accumulate a total of 100 points',
    completed: false,
  },
];

