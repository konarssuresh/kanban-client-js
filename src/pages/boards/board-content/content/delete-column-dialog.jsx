import { clsx } from "clsx";
import { useQueryClient } from "@tanstack/react-query";
import { ModalDialog } from "../../../../common-components/dialog";

import { useDeleteColumnMutation } from "../../hooks/useDeleteColumnMutation";

import { removeColumnFromState } from "../../../../store/boardEntities";

const DeleteColumnDialog = ({ onClose, columnData }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useDeleteColumnMutation({
    boardId: columnData.board,
    columnId: columnData._id,
  });

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(["boards"], (oldData) =>
          removeColumnFromState(oldData, columnData.board, columnData._id),
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
          Are you sure you want to delete the '{columnData.name}' column? This
          action cannot be undone and will remove all tasks within this column.
        </p>
      </div>
    </ModalDialog>
  );
};

export default DeleteColumnDialog;
