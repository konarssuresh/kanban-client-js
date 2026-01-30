import { clsx } from "clsx";
import { map } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { ModalDialog } from "../../../../../common-components/dialog";

import { useDeleteTaskMutation } from "../../../hooks/useDeleteTaskMutation";

import { useBoardStore } from "../../../../../store/useBoardStore";

const DeleteTaskDialog = ({ onClose, taskData }) => {
  const queryClient = useQueryClient();
  const { selectedBoard, setSelectedBoard } = useBoardStore();
  const { mutate, isLoading } = useDeleteTaskMutation({
    boardId: taskData.board,
    columnId: taskData.column,
    taskId: taskData._id,
  });

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        // Update the selected board in the store
        const updatedColumns = map(selectedBoard.columns, (column) => {
          if (column._id === taskData.column) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task._id !== taskData._id),
            };
          }
          return column;
        });
        const updatedBoard = { ...selectedBoard, columns: updatedColumns };
        setSelectedBoard(updatedBoard);
        queryClient.setQueryData(["boards"], (oldData) => {
          return Array.isArray(oldData)
            ? oldData.map((board) =>
                board?.id === selectedBoard.id ? updatedBoard : board,
              )
            : oldData;
        });
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
