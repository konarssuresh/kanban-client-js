import { clsx } from "clsx";
import { showDialog } from "../../../../common-components/dialog-container";
import { useBoardStore } from "../../../../store/useBoardStore";
import AddColumnDialog from "./add-column-dialog";
import { useFetchBoardsQuery } from "../../hooks/useFetchBoardsQuery";
import { selectBoardView } from "../../../../store/boardEntities";

const AddColumn = () => {
  const { data: boardsState } = useFetchBoardsQuery();
  const { selectedBoardId } = useBoardStore();
  const selectedBoard = selectBoardView(boardsState, selectedBoardId);
  if (!selectedBoard) {
    return null;
  }
  const containerClasses = clsx({
    "w-70 h-full flex justify-center items-center flex-shrink-0 bg-grey-300 cursor-pointer": true,
  });

  const buttonClasses = clsx({
    "text-xl text-grey-400 text-grey-400 cursor-pointer": true,
  });

  const handleAddColumn = () => {
    // Logic to show add column dialog can be implemented here
    const closeDialog = showDialog(
      <AddColumnDialog
        board={selectedBoard}
        onClose={() => {
          closeDialog();
        }}
      />
    );
  };
  return (
    <div className={containerClasses} onClick={handleAddColumn}>
      <button className={buttonClasses}>+ New Column</button>
    </div>
  );
};

export default AddColumn;
