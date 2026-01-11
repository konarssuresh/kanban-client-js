import { useMutation } from "@tanstack/react-query";
import { API_BASE } from "../../../constants/apis";

const useAddColumnMutation = ({ boardId }) => {
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${API_BASE}/board/${boardId}/column`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add new column");
      }

      return response.json();
    },
  });

  return mutation;
};

export { useAddColumnMutation };
