import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const Task = ({ task }) => {
  const [isDragging, setIsDragging] = useState(false);
  const taskContainerRef = useRef(null);
  const taskContainer = clsx({
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
    return subTask.isCompleted ? count + 1 : count;
  }, 0);

  return (
    <div className={taskContainer} ref={taskContainerRef}>
      <h6 className={taskTitleClasses}>{task.title}</h6>
      <p className={completedSubTasksClasses}>
        {completedSubTasks} of {subTasks?.length} subtasks
      </p>
    </div>
  );
};

export default Task;
