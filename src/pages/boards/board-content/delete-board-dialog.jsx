import { clsx } from "clsx";
import { useQueryClient } from "@tanstack/react-query";
import { ModalDialog } from "../../../common-components/dialog";
import { useDeleteBoardMutation } from "../hooks/useDeleteBoardMutation";
import {
  removeBoardFromState,
  selectBoardList,
} from "../../../store/boardEntities";
import { useBoardStore } from "../../../store/useBoardStore";

const DeleteBoardDialog = ({ onClose, board }) => {
  const queryClient = useQueryClient();
  const { setSelectedBoardId, setSelectedTaskId } = useBoardStore();
  const { mutate, isLoading } = useDeleteBoardMutation({
    boardId: board?.id || board?._id,
  });

  const handleDelete = () => {
    mutate(undefined, {
      onSuccess: () => {
        let nextBoardId = null;
        queryClient.setQueryData(["boards"], (oldData) => {
          const updated = removeBoardFromState(oldData, board.id || board._id);
          const list = selectBoardList(updated);
          nextBoardId = list?.[0]?.id || null;
          return updated;
        });
        setSelectedTaskId(null);
        setSelectedBoardId(nextBoardId);
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
      title="Delete this board?"
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
          Are you sure you want to delete the '{board?.name}' board? This action
          cannot be undone and will remove all columns and tasks.
        </p>
      </div>
    </ModalDialog>
  );
};

export default DeleteBoardDialog;
