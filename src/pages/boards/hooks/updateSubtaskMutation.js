import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "../../../constants/apis";

export const useUpdateSubtaskMutation = ({
  boardId,
  columnId,
  taskId,
  subtaskId,
}) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        `${API_BASE}/board/${boardId}/column/${columnId}/task/${taskId}/subtask/${subtaskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
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
    enabled: Boolean(boardId && columnId && taskId && subtaskId),
  });
};
