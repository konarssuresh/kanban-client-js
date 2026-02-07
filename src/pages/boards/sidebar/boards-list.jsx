import { clsx } from "clsx";
import { useMemo, useEffect } from "react";

import IconBoard from "../../../common-components/icons/IconBoard";
import { useFetchBoardsQuery } from "../hooks/useFetchBoardsQuery";
import { useBoardStore } from "../../../store/useBoardStore";
import { showDialog } from "../../../common-components/dialog-container";
import AddNewBoardDialog from "./add-new-board-dialog";
import { selectBoardList } from "../../../store/boardEntities";

const BoardsList = () => {
  const { data: boardsState, isLoading } = useFetchBoardsQuery();
  const boards = useMemo(() => selectBoardList(boardsState), [boardsState]);
  const { selectedBoardId, setSelectedBoardId, setSelectedTaskId } =
    useBoardStore();

  useEffect(() => {
    if (!selectedBoardId && boards?.length > 0) {
      setSelectedBoardId(boards[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards?.length, selectedBoardId, setSelectedBoardId]);

  const listContainer = clsx({
    "grow flex flex-col ": true,
  });

  const headingClasses = clsx({
    "flex items-center gap-2 text-sm text-grey-400 px-6 font-semibold align-middle": true,
    "mb-4": true,
  });

  const getBoardClasses = (board) => {
    return clsx({
      "cursor-pointer": true,
      "px-6 py-4 mr-4 rounded-tr-full rounded-br-full": true,
      "bg-purple-700 text-white": board?.id === selectedBoardId,
      "text-md text-grey-400 hover:bg-purple-500 hover:text-white": true,
    });
  };

  const handleAddNewBoard = () => {
    const closeDialog = showDialog(
      <AddNewBoardDialog
        onClose={() => {
          closeDialog();
        }}
      />,
    );
  };

  const handleBoardChange = (board) => {
    setSelectedBoardId(board.id);
    setSelectedTaskId(null);
  };

  return (
    <div className={listContainer}>
      <div className={headingClasses}>
        <h6>ALL BOARDS</h6>
        <h6>{!isLoading ? ` (${boards?.length ?? 0})` : ""}</h6>
      </div>

      {boards?.map((board) => {
        const boardClasses = getBoardClasses(board);

        return (
          <nav
            key={board.id}
            onClick={() => handleBoardChange(board)}
            className={boardClasses}
          >
            <div className="flex items-center gap-4 capitalize" key={board?.id}>
              <IconBoard /> <span>{board?.name}</span>
            </div>
          </nav>
        );
      })}
      <nav
        onClick={handleAddNewBoard}
        className={getBoardClasses({ id: "new" })}
      >
        <div className="flex items-center gap-4">
          <IconBoard className="text-purple-700 hover:text-white" />
          <span className="text-purple-700 hover:text-white">
            + Create New Board
          </span>
        </div>
      </nav>
    </div>
  );
};

export default BoardsList;
