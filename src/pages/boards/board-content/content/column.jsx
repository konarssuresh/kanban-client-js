import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Task from "./task/task";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useMoveTaskMutation } from "../../hooks/useMoveTaskMutation";
import IconVerticalEllipsis from "../../../../common-components/icons/IconVerticalEllipsis";
import { showDialog } from "../../../../common-components/dialog-container";
import DeleteColumnDialog from "./delete-column-dialog";
import { moveTaskInState } from "../../../../store/boardEntities";

const Column = ({ column }) => {
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
                queryClient.setQueryData(["boards"], (oldData) =>
                  moveTaskInState(oldData, fromColumnId, toColumnId, data),
                );
              },
            },
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
  }, [column, mutate, queryClient]);

  const handleDeleteColumn = () => {
    const closeDialog = showDialog(
      <DeleteColumnDialog
        columnData={column}
        onClose={() => {
          closeDialog();
        }}
      />,
    );
  };

  console.log(`isBeingDraggedInto - ` + isElementBeingDragged + column?.name);

  return (
    <div className={columnContainer}>
      <div className={clsx("flex flex-row align-center justify-between")}>
        <h4 className={columnTitleClasses}>
          {column.name.toUpperCase()} {`(${column.tasks.length})`}
        </h4>
        <details className="dropdown dropdown-end">
          <summary className={clsx("btn p-0 m-0 h-2")}>
            <IconVerticalEllipsis />
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <a
                onClick={(e) => {
                  handleDeleteColumn(e);
                }}
              >
                Delete
              </a>
            </li>
          </ul>
        </details>
      </div>

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
