import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "../../../constants/apis";

export const useDeleteBoardMutation = ({ boardId }) => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE}/boards/${boardId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete board");
      }

      return response.json();
    },
    enabled: Boolean(boardId),
  });
};
