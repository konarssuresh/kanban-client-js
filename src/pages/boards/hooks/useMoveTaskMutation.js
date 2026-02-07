import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../../../constants/apis";
import { moveTaskInState } from "../../../store/boardEntities";

export const useMoveTaskMutation = ({ boardId }) => {
  const queryClient = useQueryClient();
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
    onMutate: async (vars) => {
      const previous = queryClient.getQueryData(["boards"]);
      queryClient.setQueryData(["boards"], (oldData) =>
        moveTaskInState(oldData, vars.fromColumnId, vars.toColumnId, vars.task),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["boards"], context.previous);
      }
    },
    onSuccess: (data, vars) => {
      queryClient.setQueryData(["boards"], (oldData) =>
        moveTaskInState(oldData, vars.fromColumnId, vars.toColumnId, data),
      );
    },
  });

  return mutation;
};
