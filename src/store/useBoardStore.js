import { create } from "zustand";

export const useBoardStore = create((set) => ({
  selectedBoardId: null,
  setSelectedBoardId: (boardId) => set({ selectedBoardId: boardId }),
  selectedTaskId: null,
  setSelectedTaskId: (taskId) => set({ selectedTaskId: taskId }),
}));
