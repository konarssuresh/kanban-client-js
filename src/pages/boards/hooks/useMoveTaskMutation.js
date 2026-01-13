import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "../../../constants/apis";

export const useMoveTaskMutation = ({ boardId }) => {
  const mutation = useMutation({
    mutationFn: async (body) => {
      const { fromColumnId, toColumnId, taskId } = body;
      const data = { toColumnId };
      const response = await fetch(
        `${API_BASE}/board/${boardId}/column/${fromColumnId}/task/${taskId}/move`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add new column");
      }

      return response.json();
    },
  });

  return mutation;
};
