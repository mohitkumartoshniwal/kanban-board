import type { Column, Task } from "@/types";
import { useLocalStorage } from "@vueuse/core";
import { v4 as uuidv4 } from "uuid";
let KEY = "KANBAN-STORE";

export const STORE = useLocalStorage<Column[]>(KEY, []);

export function addColumn(name: Column["name"]) {
  STORE.value.push({
    columnId: uuidv4(),
    name,
    tasks: [],
  });
}

export function updateColumn(payload: Pick<Column, "name" | "columnId">) {
  let column = STORE.value.find(
    (column) => column.columnId === payload.columnId
  );

  if (!column) return;

  column.name = payload.name;
}

export function deleteColumn(columnId: Column["columnId"]) {
  STORE.value = STORE.value.filter((column) => column.columnId !== columnId);
}

export function addTaskToColumn(
  columnId: Column["columnId"],
  payload: Pick<Task, "name" | "description">
) {
  let column = STORE.value.find((column) => column.columnId === columnId);

  if (!column) return;

  column.tasks.push({
    taskId: uuidv4(),
    name: payload.name,
    description: payload.description,
  });
}

export function updateTask(columnId: Column["columnId"], task: Task) {
  let column = STORE.value.find((column) => column.columnId === columnId);

  if (!column) return;

  column.tasks = column.tasks.map((oldTask) => {
    if (oldTask.taskId === task.taskId) {
      return {
        ...oldTask,
        ...task,
      };
    }

    return oldTask;
  });
}

export function deleteTask(
  columnId: Column["columnId"],
  taskId: Task["taskId"]
) {
  let column = STORE.value.find((column) => column.columnId === columnId);

  if (!column) return;

  column.tasks = column.tasks.filter((task) => task.taskId !== taskId);
}

export function moveTask(
  taskId: Task["taskId"],
  targetColumnId: Column["columnId"],
  targetTaskId?: Task["taskId"]
) {
  let currentTask!: Task;
  let currentTaskIndex!: number;

  let column = STORE.value.find((column) =>
    column.tasks.find((task, index) => {
      if (task.taskId === taskId) {
        currentTask = task;
        currentTaskIndex = index;
        return true;
      }
    })
  );

  if (!column) return;

  column.tasks.splice(currentTaskIndex, 1);

  let targetColumn = STORE.value.find(
    (column) => column.columnId === targetColumnId
  );

  if (targetTaskId) {
    let targetTaskIndex = targetColumn?.tasks.findIndex((task) => {
      task.taskId === targetTaskId;
    });

    targetColumn?.tasks.splice(targetTaskIndex!, 0, currentTask);
  } else {
    targetColumn?.tasks.push(currentTask);
  }
}

export function moveColumn(
  columnId: Column["columnId"],
  targetColumnId: Column["columnId"]
) {
  let columnToMove: Column;
  let targetColumnIndex: number;

  STORE.value = STORE.value.filter((column, index) => {
    if (column.columnId === columnId) {
      columnToMove = column;
      return false;
    }

    if (column.columnId === targetColumnId) {
      targetColumnIndex = index;
    }

    return true;
  });

  STORE.value.splice(targetColumnIndex!, 0, columnToMove!);
}

export default {
  STORE,
  addColumn,
  updateColumn,
  deleteColumn,
  addTaskToColumn,
  updateTask,
  deleteTask,
  moveTask,
  moveColumn,
};
