const emptyBoardsState = {
  boardIds: [],
  boardsById: {},
  columnsById: {},
  tasksById: {},
  subtasksById: {},
};

const isNormalizedState = (data) =>
  data && data.boardsById && data.columnsById && data.tasksById;

const coalesceId = (item) => item?.id || item?._id || item?.Id;

const normalizeBoards = (boards = []) => {
  if (isNormalizedState(boards)) {
    return boards;
  }
  const state = {
    boardIds: [],
    boardsById: {},
    columnsById: {},
    tasksById: {},
    subtasksById: {},
  };

  (Array.isArray(boards) ? boards : []).forEach((board) => {
    const boardId = coalesceId(board);
    if (!boardId) return;
    const columnIds = [];
    const columns = Array.isArray(board?.columns) ? board.columns : [];

    columns.forEach((column) => {
      const columnId = coalesceId(column);
      if (!columnId) return;
      const taskIds = [];
      const tasks = Array.isArray(column?.tasks) ? column.tasks : [];

      tasks.forEach((task) => {
        const taskId = coalesceId(task);
        if (!taskId) return;
        const subtaskIds = [];
        const subtasks = Array.isArray(task?.subtasks) ? task.subtasks : [];

        subtasks.forEach((subtask, index) => {
          const subtaskId = coalesceId(subtask) || `${taskId}:${index}`;
          subtaskIds.push(subtaskId);
          state.subtasksById[subtaskId] = {
            id: subtaskId,
            title: subtask?.title || "",
            isDone: !!subtask?.isDone,
            taskId: taskId,
          };
        });

        taskIds.push(taskId);
        state.tasksById[taskId] = {
          id: taskId,
          title: task?.title || "",
          description: task?.description || "",
          columnId: coalesceId(task?.column) || columnId,
          boardId: coalesceId(task?.board) || boardId,
          position: task?.position ?? 0,
          subtaskIds,
        };
      });

      columnIds.push(columnId);
      state.columnsById[columnId] = {
        id: columnId,
        name: column?.name || "",
        boardId: coalesceId(column?.board) || boardId,
        position: column?.position ?? 0,
        taskIds,
      };
    });

    state.boardIds.push(boardId);
    state.boardsById[boardId] = {
      id: boardId,
      name: board?.name || "",
      columnIds,
    };
  });

  return state;
};

const ensureState = (data) => {
  if (isNormalizedState(data)) return data;
  if (Array.isArray(data)) return normalizeBoards(data);
  return emptyBoardsState;
};

const selectBoardList = (state) => {
  const data = ensureState(state);
  return data.boardIds.map((id) => data.boardsById[id]).filter(Boolean);
};

const selectTaskView = (state, taskId) => {
  const data = ensureState(state);
  const task = data.tasksById?.[taskId];
  if (!task) return null;
  const subtasks = (task.subtaskIds || [])
    .map((id) => data.subtasksById[id])
    .filter(Boolean)
    .map((subtask) => ({
      ...subtask,
      _id: subtask.id,
    }));

  return {
    ...task,
    _id: task.id,
    column: task.columnId,
    board: task.boardId,
    subtasks,
  };
};

const selectColumnView = (state, columnId) => {
  const data = ensureState(state);
  const column = data.columnsById?.[columnId];
  if (!column) return null;
  const tasks = (column.taskIds || [])
    .map((id) => selectTaskView(data, id))
    .filter(Boolean);

  return {
    ...column,
    _id: column.id,
    board: column.boardId,
    tasks,
  };
};

const selectBoardView = (state, boardId) => {
  const data = ensureState(state);
  const board = data.boardsById?.[boardId];
  if (!board) return null;
  const columns = (board.columnIds || [])
    .map((id) => selectColumnView(data, id))
    .filter(Boolean);

  return {
    ...board,
    _id: board.id,
    columns,
  };
};

const mergeIds = (existing, incoming) => {
  const seen = new Set(existing || []);
  (incoming || []).forEach((id) => seen.add(id));
  return Array.from(seen);
};

const addBoardToState = (state, board) => {
  const data = ensureState(state);
  const normalized = normalizeBoards([board]);

  return {
    boardIds: mergeIds(data.boardIds, normalized.boardIds),
    boardsById: { ...data.boardsById, ...normalized.boardsById },
    columnsById: { ...data.columnsById, ...normalized.columnsById },
    tasksById: { ...data.tasksById, ...normalized.tasksById },
    subtasksById: { ...data.subtasksById, ...normalized.subtasksById },
  };
};

const addColumnToState = (state, boardId, column) => {
  const data = ensureState(state);
  const columnId = coalesceId(column);
  if (!columnId) return data;

  const board = data.boardsById[boardId];
  if (!board) return data;

  return {
    ...data,
    boardsById: {
      ...data.boardsById,
      [boardId]: {
        ...board,
        columnIds: [...(board.columnIds || []), columnId],
      },
    },
    columnsById: {
      ...data.columnsById,
      [columnId]: {
        id: columnId,
        name: column?.name || "",
        boardId: boardId,
        position: column?.position ?? 0,
        taskIds: [],
      },
    },
  };
};

const addTaskToState = (state, columnId, task) => {
  const data = ensureState(state);
  const taskId = coalesceId(task);
  if (!taskId) return data;
  const column = data.columnsById[columnId];
  if (!column) return data;

  const subtasksById = { ...data.subtasksById };
  const subtaskIds = [];
  const subtasks = Array.isArray(task?.subtasks) ? task.subtasks : [];

  subtasks.forEach((subtask, index) => {
    const subtaskId = coalesceId(subtask) || `${taskId}:${index}`;
    subtaskIds.push(subtaskId);
    subtasksById[subtaskId] = {
      id: subtaskId,
      title: subtask?.title || "",
      isDone: !!subtask?.isDone,
      taskId: taskId,
    };
  });

  return {
    ...data,
    columnsById: {
      ...data.columnsById,
      [columnId]: {
        ...column,
        taskIds: [...(column.taskIds || []), taskId],
      },
    },
    tasksById: {
      ...data.tasksById,
      [taskId]: {
        id: taskId,
        title: task?.title || "",
        description: task?.description || "",
        columnId: columnId,
        boardId: column?.boardId,
        position: task?.position ?? 0,
        subtaskIds,
      },
    },
    subtasksById,
  };
};

const removeColumnFromState = (state, boardId, columnId) => {
  const data = ensureState(state);
  const board = data.boardsById[boardId];
  const column = data.columnsById[columnId];
  if (!board || !column) return data;

  const columnsById = { ...data.columnsById };
  const tasksById = { ...data.tasksById };
  const subtasksById = { ...data.subtasksById };

  (column.taskIds || []).forEach((taskId) => {
    const task = tasksById[taskId];
    if (task?.subtaskIds) {
      task.subtaskIds.forEach((subtaskId) => {
        delete subtasksById[subtaskId];
      });
    }
    delete tasksById[taskId];
  });

  delete columnsById[columnId];

  return {
    ...data,
    boardsById: {
      ...data.boardsById,
      [boardId]: {
        ...board,
        columnIds: (board.columnIds || []).filter((id) => id !== columnId),
      },
    },
    columnsById,
    tasksById,
    subtasksById,
  };
};

const removeTaskFromState = (state, columnId, taskId) => {
  const data = ensureState(state);
  const column = data.columnsById[columnId];
  if (!column) return data;

  const tasksById = { ...data.tasksById };
  const subtasksById = { ...data.subtasksById };
  const task = tasksById[taskId];

  if (task?.subtaskIds) {
    task.subtaskIds.forEach((subtaskId) => {
      delete subtasksById[subtaskId];
    });
  }

  delete tasksById[taskId];

  return {
    ...data,
    columnsById: {
      ...data.columnsById,
      [columnId]: {
        ...column,
        taskIds: (column.taskIds || []).filter((id) => id !== taskId),
      },
    },
    tasksById,
    subtasksById,
  };
};

const moveTaskInState = (state, fromColumnId, toColumnId, task) => {
  const data = ensureState(state);
  const taskId = coalesceId(task);
  if (!taskId) return data;

  const fromColumn = data.columnsById[fromColumnId];
  const toColumn = data.columnsById[toColumnId];
  if (!fromColumn || !toColumn) return data;
  const existingTask = data.tasksById[taskId] || {};

  return {
    ...data,
    columnsById: {
      ...data.columnsById,
      [fromColumnId]: {
        ...fromColumn,
        taskIds: (fromColumn.taskIds || []).filter((id) => id !== taskId),
      },
      [toColumnId]: {
        ...toColumn,
        taskIds: [...(toColumn.taskIds || []), taskId],
      },
    },
    tasksById: {
      ...data.tasksById,
      [taskId]: {
        ...existingTask,
        columnId: toColumnId,
        boardId: toColumn.boardId,
        position: task?.position ?? existingTask.position ?? 0,
      },
    },
  };
};

const updateSubtaskInState = (state, subtaskId, isDone) => {
  const data = ensureState(state);
  const subtask = data.subtasksById[subtaskId];
  if (!subtask) return data;

  return {
    ...data,
    subtasksById: {
      ...data.subtasksById,
      [subtaskId]: {
        ...subtask,
        isDone: !!isDone,
      },
    },
  };
};

const removeBoardFromState = (state, boardId) => {
  const data = ensureState(state);
  const board = data.boardsById[boardId];
  if (!board) return data;

  const columnsById = { ...data.columnsById };
  const tasksById = { ...data.tasksById };
  const subtasksById = { ...data.subtasksById };

  (board.columnIds || []).forEach((columnId) => {
    const column = columnsById[columnId];
    if (column?.taskIds) {
      column.taskIds.forEach((taskId) => {
        const task = tasksById[taskId];
        if (task?.subtaskIds) {
          task.subtaskIds.forEach((subtaskId) => {
            delete subtasksById[subtaskId];
          });
        }
        delete tasksById[taskId];
      });
    }
    delete columnsById[columnId];
  });

  const boardsById = { ...data.boardsById };
  delete boardsById[boardId];

  return {
    ...data,
    boardIds: (data.boardIds || []).filter((id) => id !== boardId),
    boardsById,
    columnsById,
    tasksById,
    subtasksById,
  };
};

export {
  normalizeBoards,
  selectBoardList,
  selectBoardView,
  selectTaskView,
  addBoardToState,
  addColumnToState,
  addTaskToState,
  removeColumnFromState,
  removeTaskFromState,
  removeBoardFromState,
  moveTaskInState,
  updateSubtaskInState,
};
