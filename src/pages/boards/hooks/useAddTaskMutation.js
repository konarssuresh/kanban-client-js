import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "../../../constants/apis";

export const useAddTaskMutation = ({ boardId }) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      const req = { ...data };
      const columnId = req?.status;
      delete req?.status;
      const response = await fetch(
        `${API_BASE}/board/${boardId}/column/${columnId}/task`,
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
        throw new Error("Failed to add new board");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate or refetch queries if needed
    },
    onError: (error) => {
      console.error("Error adding new board:", error);
    },
  });

  return mutation;
};
