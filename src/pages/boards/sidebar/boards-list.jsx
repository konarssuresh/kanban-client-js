import { clsx } from "clsx";

import IconBoard from "../../../common-components/icons/IconBoard";
import { useFetchBoardsQuery } from "../hooks/useFetchBoardsQuery";
import { useBoardStore } from "../../../store/useBoardStore";
import { useEffect } from "react";

const BoardsList = () => {
  const { data: boards, isLoading } = useFetchBoardsQuery();
  const { selectedBoard, setSelectedBoard } = useBoardStore();

  useEffect(() => {
    if (selectedBoard === null && boards?.length > 0) {
      setSelectedBoard(boards[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards?.length, selectedBoard, setSelectedBoard]);

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
      "bg-purple-700 text-white": board?.id === selectedBoard?.id,
      "text-md text-grey-400 hover:bg-purple-500 hover:text-white": true,
    });
  };

  return (
    <div className={listContainer}>
      <div className={headingClasses}>
        <h6>ALL BOARDS</h6>
        <h6>{!isLoading ? ` (${boards.length})` : ""}</h6>
      </div>

      {boards?.map((board) => {
        const boardClasses = getBoardClasses(board);

        return (
          <nav onClick={() => setSelectedBoard(board)} className={boardClasses}>
            <div className="flex items-center gap-4" key={board?.id}>
              <IconBoard /> <span>{board?.name}</span>
            </div>
          </nav>
        );
      })}
      <nav className={getBoardClasses({ id: "new" })}>
        <div className="flex items-center gap-4" onClick={() => {}}>
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
