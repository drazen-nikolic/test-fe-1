"use client";

import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import type { Widget, TodoListSettings } from "@/types/widget";

type TodoListProps = {
  item: Widget<TodoListSettings>;
  open: boolean;
  onClose: () => void;
};

export default function TodoList({ item, open, onClose }: TodoListProps) {
  const router = useRouter();
  const [name, setName] = useState(item.settings.config.name);
  const [maxItems, setMaxItems] = useState(item.settings.config.maxItems);

  const handleEditSave = async () => {
    try {
      await fetch(`/api/widgets?widgetId=${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, maxItems }),
      });
      // Refetch
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Failed to update weather configuration.");
      console.error(error);
    }
  };

  const handleNameChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setName(value);
  };

  const handleMaxItems = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setMaxItems(Number(value));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Configure Weather</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} width={300} mt={1}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            fullWidth
          />
          <TextField
            name="maxItems"
            label="Max Items"
            variant="outlined"
            value={maxItems}
            onChange={handleMaxItems}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleEditSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
