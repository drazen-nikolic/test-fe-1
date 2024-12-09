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
import type { Widget, RecentActivitySettings } from "@/types/widget";
import { useRouter } from "next/navigation";

type RecentActivityFormProps = {
  item: Widget<RecentActivitySettings>;
  open: boolean;
  onClose: () => void;
};

export default function RecentActivityForm({
  item,
  open,
  onClose,
}: RecentActivityFormProps) {
  const router = useRouter();
  const [historyLength, setHistoryLength] = useState(
    item.settings.config.historyLength
  );

  const handleEditSave = async () => {
    try {
      await fetch(`/api/widgets?widgetId=${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ historyLength }),
      });
      // Refetch
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Failed to update Recent Activity configuration.");
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setHistoryLength(Number(value));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Configure Recent Activity</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} width={300} mt={1}>
          <TextField
            type="number"
            name="historyLength"
            label="History Length"
            variant="outlined"
            value={historyLength}
            onChange={handleChange}
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
