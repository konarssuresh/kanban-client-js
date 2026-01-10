import clsx from "clsx";

const Task = ({ task }) => {
  const taskContainer = clsx({
    "bg-white rounded-md p-4 flex flex-col gap-2 shadow-md": true,
  });

  const taskTitleClasses = clsx({
    "text-md font-semibold text-black capitalize": true,
  });

  const completedSubTasksClasses = clsx({
    "text-md text-grey-400": true,
  });

  const subTasks = task?.subtasks || [];
  const completedSubTasks = subTasks.reduce((count, subTask) => {
    return subTask.isCompleted ? count + 1 : count;
  }, 0);

  return (
    <div className={taskContainer}>
      <h6 className={taskTitleClasses}>{task.title}</h6>
      <p className={completedSubTasksClasses}>
        {completedSubTasks} of {subTasks?.length} subtasks
      </p>
    </div>
  );
};

export default Task;
