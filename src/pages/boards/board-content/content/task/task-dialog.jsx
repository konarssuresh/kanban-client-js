import { clsx } from "clsx";
import { map } from "lodash";
import { ModalDialog } from "../../../../../common-components/dialog";
import { useUpdateSubtaskMutation } from "../../../hooks/updateSubtaskMutation";
import { useBoardStore } from "../../../../../store/useBoardStore";

const Subtask = ({ subtask }) => {
  const { selectedTask: taskData, setSelectedTask } = useBoardStore();
  const { mutate } = useUpdateSubtaskMutation({
    boardId: taskData.board,
    columnId: taskData.column,
    taskId: taskData._id,
    subtaskId: subtask._id,
  });

  const handleChange = (e) => {
    const isDone = e.target.checked;

    const updatedSubtasks = map(taskData.subtasks, (st) => {
      if (st._id === subtask._id) {
        return { ...st, isDone };
      } else {
        return st;
      }
    });

    // optimistically update the selected task's subtasks
    setSelectedTask({ ...taskData, subtasks: updatedSubtasks });
    mutate(
      { isDone },
      {
        onError: () => {
          // revert optimistic update on error
          setSelectedTask(taskData);
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
  const {
    selectedTask: taskData,
    setSelectedTask,
    selectedBoard,
    setSelectedBoard,
  } = useBoardStore();
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
    const updatedColumns = (selectedBoard.columns || []).map((col) => {
      if (col._id !== taskData.column) return col;
      return {
        ...col,
        tasks: (col.tasks || []).map((t) =>
          t._id === taskData._id ? taskData : t,
        ),
      };
    });
    setSelectedBoard({ ...selectedBoard, columns: updatedColumns });
    setSelectedTask(null);
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
