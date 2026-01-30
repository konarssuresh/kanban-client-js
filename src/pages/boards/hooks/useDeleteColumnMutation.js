import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "../../../constants/apis";

export const useDeleteColumnMutation = ({ boardId, columnId }) => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${API_BASE}/board/${boardId}/column/${columnId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update subtask");
      }

      return response.json();
    },

    onError: (err) => {
      console.error("Error updating subtask:", err);
    },
    enabled: Boolean(boardId && columnId),
  });
};
