import { clsx } from "clsx";
import { useQueryClient } from "@tanstack/react-query";
import { ModalDialog } from "../../../../../common-components/dialog";

import { useDeleteTaskMutation } from "../../../hooks/useDeleteTaskMutation";

import { removeTaskFromState } from "../../../../../store/boardEntities";

const DeleteTaskDialog = ({ onClose, taskData }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useDeleteTaskMutation({
    boardId: taskData.board,
    columnId: taskData.column,
    taskId: taskData._id,
  });

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(["boards"], (oldData) =>
          removeTaskFromState(oldData, taskData.column, taskData._id),
        );
        onClose();
      },
    });
  };

  const dialogContentClasses = clsx({
    "flex flex-col gap-6": true,
  });

  return (
    <ModalDialog
      open
      title="Delete this task?"
      onClose={onClose}
      actions={[
        {
          text: "Delete",
          variant: "danger",
          onClick: handleDelete,
          isLoading: isLoading,
          disabled: isLoading,
        },
        {
          text: "Cancel",
          variant: "secondary",
          onClick: onClose,
          isLoading: isLoading,
          disabled: isLoading,
        },
      ]}
    >
      <div className={dialogContentClasses}>
        Are you sure you want to delete the '{taskData.title}' task and its
        subtasks? This action cannot be reversed.
      </div>
    </ModalDialog>
  );
};
export default DeleteTaskDialog;
