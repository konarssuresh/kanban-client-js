import { create } from "zustand";

export const useBoardStore = create((set) => ({
  selectedBoard: null,
  setSelectedBoard: (board) => set({ selectedBoard: board }),
}));
