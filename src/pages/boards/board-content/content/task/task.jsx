import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { useBoardStore } from "../../../../../store/useBoardStore";
import { showDialog } from "../../../../../common-components/dialog-container";
import TaskDialog from "./task-dialog";
import IconCross from "../../../../../common-components/icons/IconCross";
import DeleteTaskDialog from "./delete-task-dialog";

const Task = ({ task }) => {
  const { setSelectedTask } = useBoardStore();
  const [isDragging, setIsDragging] = useState(false);
  const taskContainerRef = useRef(null);
  const taskContainer = clsx({
    "cursor-pointer": true,
    "rounded-md p-4 flex flex-col gap-2 shadow-md": true,
    "opacity-20": isDragging,
    "bg-white": !isDragging,
  });

  const taskTitleClasses = clsx({
    "text-md font-semibold text-black capitalize": true,
  });

  const completedSubTasksClasses = clsx({
    "text-md text-grey-400": true,
  });

  useEffect(() => {
    const element = taskContainerRef.current;
    if (!element) {
      return;
    }

    const cleanup = draggable({
      element,
      getInitialData() {
        return task;
      },
      onDragStart: () => {
        setIsDragging(true);
      },
      onDrop: () => {
        setIsDragging(false);
      },
    });

    return cleanup;
  }, [task]);

  const subTasks = task?.subtasks || [];
  const completedSubTasks = subTasks.reduce((count, subTask) => {
    return subTask.isDone ? count + 1 : count;
  }, 0);

  const handleClick = () => {
    setSelectedTask(task);
    const closeDialog = showDialog(
      <TaskDialog
        taskData={task}
        onClose={() => {
          closeDialog();
        }}
      />,
    );
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    const closeDialog = showDialog(
      <DeleteTaskDialog
        taskData={task}
        onClose={() => {
          closeDialog();
        }}
      />,
    );
  };

  const titleContainerClasses = clsx({
    "flex items-center justify-between gap-2": true,
  });

  return (
    <div className={taskContainer} ref={taskContainerRef} onClick={handleClick}>
      <div className={titleContainerClasses}>
        <h6 className={taskTitleClasses}>{task.title}</h6>
        <button className={clsx("cursor-pointer")} onClick={handleDeleteClick}>
          <IconCross />
        </button>
      </div>

      <p className={completedSubTasksClasses}>
        {completedSubTasks} of {subTasks?.length} subtasks
      </p>
    </div>
  );
};

export default Task;
