import { clsx } from "clsx";
import { map } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { ModalDialog } from "../../../../common-components/dialog";

import { useDeleteColumnMutation } from "../../hooks/useDeleteColumnMutation";

import { useBoardStore } from "../../../../store/useBoardStore";

const DeleteColumnDialog = ({ onClose, columnData }) => {
  const queryClient = useQueryClient();
  const { selectedBoard, setSelectedBoard } = useBoardStore();
  const { mutate, isLoading } = useDeleteColumnMutation({
    boardId: columnData.board,
    columnId: columnData._id,
  });

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        // Update the selected board in the store
        const updatedColumns = map(selectedBoard.columns, (column) => {
          if (column._id !== columnData._id) {
            return column;
          }
          return null;
        }).filter(Boolean);
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
      title="Delete this column?"
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
        <p>
          Are you sure you want to delete the '{columnData.title}' column? This
          action cannot be undone and will remove all tasks within this column.
        </p>
      </div>
    </ModalDialog>
  );
};

export default DeleteColumnDialog;
