import { clsx } from "clsx";
import EmptyBoard from "./empty-board";
import Column from "./column";
import AddColumn from "./add-column";
import { useBoardStore } from "../../../../store/useBoardStore";

const Content = () => {
  const { selectedBoard } = useBoardStore();
  const contentContainer = clsx({
    "w-full h-full overflow-auto bg-grey-100": true,
    // text classes
    "text-grey-400": true,
  });

  const columnsContainer = clsx({
    "w-full h-full overflow-auto bg-grey-100": true,
    "flex flex-row gap-4 p-4": true,
  });

  if (!selectedBoard) {
    return <div className={contentContainer}></div>;
  }

  if (selectedBoard && selectedBoard.columns.length === 0) {
    return (
      <div className={contentContainer}>
        <EmptyBoard />
      </div>
    );
  }

  return (
    <div className={columnsContainer}>
      {selectedBoard.columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
      <AddColumn board={selectedBoard} />
    </div>
  );
};

export default Content;
