import type { z } from "zod";
import type { columnSchema, taskSchema } from "./schemas";

export type Column = z.infer<typeof columnSchema>;
export type Task = z.infer<typeof taskSchema>;

export enum TYPES {
  COLUMN = "COLUMN",
  TASK = "TASK",
}

export enum ACTIONS {
  ADD_COLUMN = "ADD_COLUMN",
  UPDATE_COLUMN = "UPDATE_COLUMN",
  DELETE_COLUMN = "DELETE_COLUMN",
  ADD_TASK = "ADD_TASK",
  UPDATE_TASK = "UPDATE_TASK",
  DELETE_TASK = "DELETE_TASK",
}

export type TRANSFER_DATA = {
  type: TYPES;
  columnId?: Column["columnId"];
  taskId?: Task["taskId"];
};
