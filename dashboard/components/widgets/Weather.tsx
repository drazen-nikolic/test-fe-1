"use client";

import React, { useEffect, useState } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import { Delete, Settings } from "@mui/icons-material";
import type { Widget, WeatherSettings } from "@/types/widget";

type Settings = {
  config: {
    location: string;
    unit: string;
  };
};

type WeatherWidgetProps = {
  item: Widget<WeatherSettings>;
  onEdit: (id: Widget<WeatherSettings>) => void;
  onDelete: (id: Widget<WeatherSettings>) => void;
};

export default function WeatherWidget({
  item,
  onEdit,
  onDelete,
}: WeatherWidgetProps) {
  const { config } = item.settings;
  const unitLetter = config.unit.charAt(0);
  const [temperature, setTemperature] = useState("N/A");
  const [condition, setCondition] = useState("Loading...");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://wttr.in/${config.location}?format=j1`,
          { cache: "no-store" }
        );
        const data = await res.json();
        const condition = data.current_condition[0];

        setTemperature(condition[`temp_${unitLetter}`]);
        setCondition(condition.weatherDesc[0].value);
      } catch (error) {
        console.error(error);
      }
    };
    if (config.location && unitLetter) {
      fetchWeather();
    }
  }, [config.location, unitLetter]);

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
        {item.type} in {config.location}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Box>
          <Typography variant="h2" fontWeight="bold">
            {temperature}°{unitLetter}
          </Typography>
          <Typography variant="h5">{condition}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
