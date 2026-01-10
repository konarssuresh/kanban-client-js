import Sidebar from "./sidebar/sidebar";
import BoardContent from "./board-content/board-content";

const Boards = () => {
  return (
    <div className="flex flex-row w-screen h-screen">
      <Sidebar />
      <BoardContent />
    </div>
  );
};

export default Boards;
