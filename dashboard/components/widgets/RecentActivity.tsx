import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import { ArrowRight, Delete, Settings } from "@mui/icons-material";
import type { Widget, RecentActivitySettings } from "@/types/widget";

type Settings = {
  config: {
    historyLength: number;
  };
  data: {
    activities: string[];
  };
};

type RecentActivityWidgetProps = {
  item: Widget<RecentActivitySettings>;
  onEdit: (item: Widget<RecentActivitySettings>) => void;
  onDelete: (item: Widget<RecentActivitySettings>) => void;
};

export default function RecentActivityWidget({
  item,
  onEdit,
  onDelete,
}: RecentActivityWidgetProps) {
  const { config, data } = item.settings;
  const { historyLength } = config;
  const activitiesToShow = data.activities.slice(0, historyLength);

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
        {item.type}
      </Typography>
      {activitiesToShow.length ? (
        <List sx={{ height: "220px", width: "100%", overflow: "auto" }}>
          {activitiesToShow.map((activity, index) => (
            <ListItem key={index} sx={{ p: 0 }}>
              <ArrowRight />
              <ListItemText primary={activity} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Typography variant="body2">No activity yet</Typography>
        </Box>
      )}
      {data.activities.length > historyLength && (
        <Box mt={2}>
          <Typography variant="caption" color="textSecondary">
            Showing {historyLength} of {data.activities.length} activities
          </Typography>
        </Box>
      )}
    </Box>
  );
}
