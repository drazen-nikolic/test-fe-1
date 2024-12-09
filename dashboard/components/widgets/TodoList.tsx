import React, { useState } from "react";
import {
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { Close, Delete, Settings } from "@mui/icons-material";
import toast from "react-hot-toast";
import type { Widget, TodoListSettings, Task } from "@/types/widget";

type TodoListWidgetProps = {
  item: Widget<TodoListSettings>;
  onEdit: (item: Widget<TodoListSettings>) => void;
  onDelete: (item: Widget<TodoListSettings>) => void;
};

export default function TodoListWidget({
  item,
  onEdit,
  onDelete,
}: TodoListWidgetProps) {
  const { config, data } = item.settings;
  const { maxItems } = config;
  const [tasks, setTasks] = useState(data.tasks.slice(0, maxItems));
  const [newTask, setNewTask] = useState("");

  const handleDeleteTask = async (taskId: string) => {
    const oldTasks = [...tasks];
    try {
      setTasks(tasks.filter((oldTask) => oldTask.taskId !== taskId));
      await fetch(`/api/widgets/todo?widgetId=${item.id}&taskId=${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      setTasks(oldTasks);
      toast.error(`Failed to add new task to ${item.settings.config.name}.`);
      console.error(error);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) {
      return;
    }
    const oldTasks = [...tasks];

    const newTaskItem: Task = {
      taskId: `task-${Date.now()}`,
      description: newTask.trim(),
      completed: false,
    };
    setNewTask("");

    try {
      setTasks([...oldTasks, newTaskItem]);
      await fetch(`/api/widgets/todo?widgetId=${item.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskItem),
      });
    } catch (error) {
      setTasks(oldTasks);
      toast.error(`Failed to add new task to ${item.settings.config.name}.`);
      console.error(error);
    }
  };

  const handleCheckTask = async (task: Task, completed: boolean) => {
    const oldTasks = [...tasks];
    try {
      setTasks(
        tasks.map((oldTask) =>
          oldTask.taskId === task.taskId ? { ...oldTask, completed } : oldTask
        )
      );
      await fetch(
        `/api/widgets/todo?widgetId=${item.id}&taskId=${task.taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...task, completed: !task.completed }),
        }
      );
    } catch (error) {
      setTasks(oldTasks);
      toast.error(`Failed to add new task to ${item.settings.config.name}.`);
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        py: 2,
        px: 3,
      }}
    >
      <Box sx={{ position: "absolute", top: 10, right: 10 }}>
        <IconButton onClick={() => onEdit(item)}>
          <Settings />
        </IconButton>
        <IconButton onClick={() => onDelete(item)}>
          <Delete />
        </IconButton>
      </Box>
      <Typography variant="h6" gutterBottom>
        {config.name}
      </Typography>
      <List sx={{ maxHeight: "180px", width: "100%", overflow: "auto", pr: 2 }}>
        {tasks.slice(0, config.maxItems).map((task) => (
          <ListItem
            key={task.taskId}
            sx={{ display: "flex", alignItems: "center", px: 0 }}
          >
            <Checkbox
              value={task.completed}
              checked={task.completed}
              onChange={(e, value) => handleCheckTask(task, value)}
              sx={{ mr: 1 }}
            />
            <ListItemText
              primary={task.description}
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            />
            <IconButton onClick={() => handleDeleteTask(task.taskId)}>
              <Close />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box marginTop="auto" paddingTop={1}>
        <Box display="flex" gap={1}>
          <TextField
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
            size="small"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            disabled={!newTask.trim()}
          >
            Add
          </Button>
        </Box>
        {data.tasks.length > maxItems && (
          <Box mt={1}>
            <Typography variant="caption" color="textSecondary">
              Showing {maxItems} of {data.tasks.length} tasks
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
