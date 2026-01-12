import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import Task from "./task";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const Column = ({ column }) => {
  const columnsContainerRef = useRef();
  const [isElementBeingDragged, setIsElementBeingDragged] = useState(false);

  const columnContainer = clsx({
    "w-70 flex-shrink-0": true,
    // flex container styles
    "flex flex-col gap-4": true,
  });

  const columnTitleClasses = clsx({
    "text-sm text-grey-400": true,
  });

  const tasksContainer = clsx({
    "flex flex-col gap-4 overflow-y-auto min-h-[90%]": true,
    "bg-blue-400/25": isElementBeingDragged,
  });

  const previewContainerClasses = clsx({
    "text-lg text-grey-400": true,
  });

  useEffect(() => {
    const element = columnsContainerRef.current;

    if (!element) {
      return;
    }

    const cleanup = dropTargetForElements({
      element,
      // canDrop
      onDrop: ({ source }) => {
        console.log(source);
        setIsElementBeingDragged(false);
      },
      onDragEnter: () => {
        setIsElementBeingDragged(true);
      },
      onDragLeave: () => {
        setIsElementBeingDragged(false);
      },
    });

    return cleanup;
  }, [column]);

  console.log(`isBeingDraggedInto - ` + isElementBeingDragged + column?.name);

  return (
    <div className={columnContainer}>
      <h4 className={columnTitleClasses}>
        {column.name.toUpperCase()} {`(${column.tasks.length})`}
      </h4>
      <div className={tasksContainer} ref={columnsContainerRef}>
        {!isElementBeingDragged ? (
          <>
            {column.tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </>
        ) : (
          <div className={previewContainerClasses}>Move to {column?.name}</div>
        )}
      </div>
    </div>
  );
};

export default Column;
