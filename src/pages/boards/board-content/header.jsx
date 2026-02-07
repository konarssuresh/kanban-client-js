import { clsx } from "clsx";
import { useRef } from "react";
import { useAppStore } from "../../../store/useAppStore";
import { useBoardStore } from "../../../store/useBoardStore";
import LogoDark from "../../../common-components/icons/LogoDark";
import IconVerticalEllipsis from "../../../common-components/icons/IconVerticalEllipsis";
import { showDialog } from "../../../common-components/dialog-container";
import { Button } from "../../../common-components/button";
import AddTaskDialog from "../board-content/add-task-dialog";
import { useFetchBoardsQuery } from "../hooks/useFetchBoardsQuery";
import { selectBoardView } from "../../../store/boardEntities";
import DeleteBoardDialog from "./delete-board-dialog";

const Header = () => {
  const { sidebarOpen } = useAppStore();
  const { data: boardsState } = useFetchBoardsQuery();
  const { selectedBoardId } = useBoardStore();
  const selectedBoard = selectBoardView(boardsState, selectedBoardId);
  const headerClasses = clsx({
    "h-20 w-full border-b border-grey-400": true,
    "flex items-center justify-between p-4": true,
  });
  const titleContainer = clsx({
    "flex items-start gap-4": true,
  });

  const logoClasses = clsx({
    "text-purple-700": true,
  });

  const titleClasses = clsx({
    "text-xl font-bold text-black": true,
  });

  const addTaskContainer = clsx({
    "flex items-center gap-3": true,
  });
  const menuRef = useRef(null);

  const handleAddTask = () => {
    if (!selectedBoard) {
      return;
    }
    const closeDialog = showDialog(
      <AddTaskDialog
        board={selectedBoard}
        onClose={() => {
          closeDialog();
        }}
      />
    );
  };

  const handleDeleteBoard = () => {
    if (!selectedBoard) return;
    if (menuRef.current) {
      menuRef.current.open = false;
    }
    const closeDialog = showDialog(
      <DeleteBoardDialog
        board={selectedBoard}
        onClose={() => {
          closeDialog();
        }}
      />
    );
  };

  return (
    <div className={headerClasses}>
      <div className={titleContainer}>
        {!sidebarOpen && <LogoDark className={logoClasses} />}
        <h2 className={titleClasses}>{selectedBoard?.name}</h2>
      </div>

      <div className={addTaskContainer}>
        <Button
          onClick={handleAddTask}
          variant="primary"
          size="large"
          disabled={!selectedBoard}
        >
          + Add New Task
        </Button>
        <details className="dropdown dropdown-end" ref={menuRef}>
          <summary className={clsx("btn p-0 m-0 h-2")}>
            <IconVerticalEllipsis className="text-grey-400" />
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <a onClick={handleDeleteBoard}>Delete Board</a>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default Header;
