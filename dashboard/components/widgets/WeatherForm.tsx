"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import type { Widget, WeatherSettings } from "@/types/widget";

type WeatherFormProps = {
  item: Widget<WeatherSettings>;
  open: boolean;
  onClose: () => void;
};

export default function WeatherForm({ item, open, onClose }: WeatherFormProps) {
  const router = useRouter();
  const [location, setLocation] = useState(item.settings.config.location);
  const [unit, setUnit] = useState(item.settings.config.unit);

  const handleEditSave = async () => {
    try {
      await fetch(`/api/widgets?widgetId=${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, unit }),
      });
      // Refetch
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Failed to update weather configuration.");
      console.error(error);
    }
  };

  const handleChangeUnit = (e: SelectChangeEvent<string>) => {
    const { value } = e.target as HTMLSelectElement;
    setUnit(value);
  };

  const handleChangeLocation = (
    e: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const { value } = e.target as HTMLInputElement;
    setLocation(value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Configure Weather</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} width={300} mt={1}>
          <TextField
            name="location"
            label="City"
            variant="outlined"
            value={location}
            onChange={handleChangeLocation}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Select Unit</InputLabel>
            <Select
              name="unit"
              value={unit}
              onChange={handleChangeUnit}
              label="Select Unit"
            >
              <MenuItem value="Fahrenheit">Fahrenheit</MenuItem>
              <MenuItem value="Celsius">Celsius</MenuItem>
            </Select>
          </FormControl>
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
