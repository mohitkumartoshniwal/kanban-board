import { z } from "zod";

export const taskFormSchema = z.object({
  name: z.string().min(1, "Name is required").default(""),
  description: z.string().min(1, "Description is required").default(""),
});

export const taskSchema = taskFormSchema.merge(
  z.object({
    taskId: z.string(),
  })
);

export const columnFormSchema = z.object({
  name: z.string().min(1, "Name is required").default(""),
});

export const columnSchema = columnFormSchema.merge(
  z.object({
    columnId: z.string(),
    tasks: z.array(taskSchema),
  })
);
