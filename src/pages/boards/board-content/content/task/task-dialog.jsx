import { clsx } from "clsx";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ModalDialog } from "../../../../../common-components/dialog";
import { useUpdateSubtaskMutation } from "../../../hooks/updateSubtaskMutation";
import { useBoardStore } from "../../../../../store/useBoardStore";
import { useFetchBoardsQuery } from "../../../hooks/useFetchBoardsQuery";
import { selectTaskView, updateSubtaskInState } from "../../../../../store/boardEntities";

const Subtask = ({ subtask }) => {
  const queryClient = useQueryClient();
  const { data: boardsState } = useFetchBoardsQuery();
  const { selectedTaskId } = useBoardStore();
  const taskData = useMemo(
    () => selectTaskView(boardsState, selectedTaskId),
    [boardsState, selectedTaskId],
  );
  if (!taskData) {
    return null;
  }
  const { mutate } = useUpdateSubtaskMutation({
    boardId: taskData.board,
    columnId: taskData.column,
    taskId: taskData._id,
    subtaskId: subtask._id,
  });

  const handleChange = (e) => {
    const isDone = e.target.checked;
    const previousState = queryClient.getQueryData(["boards"]);
    queryClient.setQueryData(["boards"], (oldData) =>
      updateSubtaskInState(oldData, subtask._id, isDone),
    );
    mutate(
      { isDone },
      {
        onError: () => {
          queryClient.setQueryData(["boards"], previousState);
        },
      },
    );
  };

  return (
    <fieldset className="fieldset bg-grey-100 border-base-300 rounded-box w-full border px-4 py-2">
      <label className="label">
        <input
          onChange={handleChange}
          type="checkbox"
          checked={subtask.isDone}
          className="checkbox checkbox-primary"
        />
        {subtask.title}
      </label>
    </fieldset>
  );
};

const TaskDialog = ({ onClose }) => {
  const { data: boardsState } = useFetchBoardsQuery();
  const { selectedTaskId, setSelectedTaskId } = useBoardStore();
  const taskData = useMemo(
    () => selectTaskView(boardsState, selectedTaskId),
    [boardsState, selectedTaskId],
  );
  if (!taskData) {
    return null;
  }
  const { title, description, subtasks = [] } = taskData || {};

  const descriptionClasses = clsx({
    "text-grey-400 text-lg": true,
  });

  const taskDialogContainerClasses = clsx({
    "flex flex-col gap-4 w-120": true,
  });

  const subTasksContainerClasses = clsx({
    "flex flex-col gap-2": true,
  });

  const completedSubTasks = subtasks.reduce((count, subTask) => {
    return subTask.isDone ? count + 1 : count;
  }, 0);

  const handleClose = () => {
    setSelectedTaskId(null);
    onClose();
  };

  return (
    <ModalDialog open title={title} onClose={handleClose}>
      <div className={taskDialogContainerClasses}>
        <p className={descriptionClasses}>{description}</p>
        <div className={subTasksContainerClasses}>
          {subtasks.length > 0 && (
            <h5 className={clsx("text-grey-400")}>
              Subtasks {completedSubTasks} of {subtasks.length}
            </h5>
          )}
          {subtasks.map((subtask, index) => (
            <Subtask key={index} subtask={subtask} taskData={taskData} />
          ))}
        </div>
      </div>
    </ModalDialog>
  );
};

export default TaskDialog;
