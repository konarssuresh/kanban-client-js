import { clsx } from "clsx";
import { useAppStore } from "../../../store/useAppStore";
import { useBoardStore } from "../../../store/useBoardStore";
import LogoDark from "../../../common-components/icons/LogoDark";
import IconVerticalEllipsis from "../../../common-components/icons/IconVerticalEllipsis";
import { showDialog } from "../../../common-components/dialog-container";
import { Button } from "../../../common-components/button";
import AddTaskDialog from "../board-content/add-task-dialog";
import { useFetchBoardsQuery } from "../hooks/useFetchBoardsQuery";
import { selectBoardView } from "../../../store/boardEntities";

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
        <IconVerticalEllipsis className="text-grey-400" />
      </div>
    </div>
  );
};

export default Header;
