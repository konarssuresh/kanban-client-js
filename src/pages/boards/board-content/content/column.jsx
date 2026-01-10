import { clsx } from "clsx";
import Task from "./task";
const Column = ({ column }) => {
  const columnContainer = clsx({
    "w-70 flex-shrink-0": true,
    // flex container styles
    "flex flex-col gap-4": true,
  });

  const columnTitleClasses = clsx({
    "text-sm text-grey-400": true,
  });

  const tasksContainer = clsx({
    "flex flex-col gap-4 overflow-y-auto": true,
  });

  return (
    <div className={columnContainer}>
      <h4 className={columnTitleClasses}>
        {column.name.toUpperCase()} {`(${column.tasks.length})`}
      </h4>
      <div className={tasksContainer}>
        {column.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
