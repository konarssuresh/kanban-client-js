import { create } from "zustand";

export const useBoardStore = create((set) => ({
  selectedBoard: null,
  setSelectedBoard: (board) => set({ selectedBoard: board }),
  selectedTask: null,
  setSelectedTask: (task) => set({ selectedTask: task }),
}));
