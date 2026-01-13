import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import compact from "lodash/compact";
import Task from "./task";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useMoveTaskMutation } from "../../hooks/useMoveTaskMutation";
import { useBoardStore } from "../../../../store/useBoardStore";

const Column = ({ column }) => {
  const { setSelectedBoard } = useBoardStore();
  const queryClient = useQueryClient();
  const columnsContainerRef = useRef();
  const [isElementBeingDragged, setIsElementBeingDragged] = useState(false);
  const { mutate } = useMoveTaskMutation({ boardId: column.board });

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
      getData: () => {
        return column;
      },
      // canDrop
      onDrop: ({ source, location }) => {
        if (source.data) {
          console.log(source?.data);
          const fromColumnId = source.data?.column;
          const toColumnId = location.current.dropTargets?.[0]?.data.id;
          mutate(
            {
              fromColumnId: fromColumnId,
              toColumnId: toColumnId,
              taskId: source.data._id,
            },
            {
              onSuccess: (data) => {
                queryClient.setQueryData(["boards"], (oldData) => {
                  const newData = oldData.map((b) => {
                    if (b.id === data.board) {
                      const newColumns = b.columns.map((c) => {
                        if (c.id === fromColumnId) {
                          let filteredTasks = [...c.tasks];
                          filteredTasks = filteredTasks.filter(
                            (t) => t._id !== data._id
                          );
                          return { ...c, tasks: filteredTasks };
                        } else if (c.id === toColumnId) {
                          let newTasks = [...c.tasks, data];
                          return { ...c, tasks: newTasks };
                        } else {
                          return { ...c };
                        }
                      });
                      setSelectedBoard({ ...b, columns: compact(newColumns) });
                      return { ...b, columns: compact(newColumns) };
                    }

                    return { ...b };
                  });

                  return [...newData];
                });
              },
            }
          );
        }
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
  }, [column, mutate, setSelectedBoard]);

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
