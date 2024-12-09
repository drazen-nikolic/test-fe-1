"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./SortableItem";
import { Grid, Typography } from "@mui/material";
import DashboardLayout from "./DashboardLayout";
import { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import DropdownButton from "./DropdownButton";
import { widgets as availableWidgets } from "@/config/data";
import WeatherForm from "./widgets/WeatherForm";
import RecentActivityForm from "./widgets/RecentActivityForm";
import { useRouter } from "next/navigation";
import TodoListForm from "./widgets/TodoListForm";
import type {
  WidgetType,
  Widget,
  WeatherSettings,
  TodoListSettings,
  RecentActivitySettings,
} from "@/types/widget";

type DashboardProps = {
  widgets: WidgetType[];
  user: Partial<User>;
};

export default function Dashboard({ widgets, user }: DashboardProps) {
  const router = useRouter();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [items, setItems] = useState(widgets);
  const [editModeWidget, setEditModeWidget] = useState<WidgetType>();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const updateWidgetPositions = async (widgetIds: string[]) => {
    try {
      await fetch("/api/widgets/order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ widgetIds }),
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over!.id) {
      const oldIndex = items.indexOf(
        items.find((item) => item.id === active.id)!
      );
      const newIndex = items.indexOf(
        items.find((item) => item.id === over!.id)!
      );

      const newArray = arrayMove(items, oldIndex, newIndex);
      setItems(newArray);

      const success = await updateWidgetPositions(
        newArray.map((item) => item.id)
      );

      if (!success) {
        toast.error("Couldn't update widget order.");
        setItems(items);
      }
    }

    setActiveId(null);
  };

  const handleAddWidget = async (widget: Partial<WidgetType>) => {
    const newWidget = {
      userId: user.id,
      ...widget,
    };

    try {
      const res = await fetch(`/api/widgets?userId=${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWidget),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error);
        return;
      }

      setItems(data);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditWidget = (item: WidgetType) => {
    setEditModeWidget(item);
  };

  const handleDeleteWidget = async (item: WidgetType) => {
    try {
      const res = await fetch(
        `/api/widgets?userId=${user.id}&widgetId=${item.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      toast.success(data.message);
      setItems(data.orderedWidgets);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error((error as unknown as { message: string }).message);
    }
  };

  return (
    <DashboardLayout user={user}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <DropdownButton
          options={availableWidgets}
          onSelect={handleAddWidget}
          sx={{ mb: 2 }}
        >
          Add Widget
        </DropdownButton>
        <Typography variant="body1" gutterBottom>
          Hold card to move around
        </Typography>
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid key={item.id} item xs={12} sm={6}>
                <SortableItem
                  item={item}
                  onEdit={handleEditWidget}
                  onDelete={handleDeleteWidget}
                />
              </Grid>
            ))}
          </Grid>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <SortableItem
              item={items.find((item) => item.id === activeId)!}
              onEdit={handleEditWidget}
              onDelete={handleDeleteWidget}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {editModeWidget && (
        <>
          <WeatherForm
            open={editModeWidget.type === "Weather"}
            item={editModeWidget as Widget<WeatherSettings>}
            onClose={() => setEditModeWidget(undefined)}
          />
          <RecentActivityForm
            open={editModeWidget.type === "Recent Activity"}
            item={editModeWidget as Widget<RecentActivitySettings>}
            onClose={() => setEditModeWidget(undefined)}
          />
          <TodoListForm
            open={editModeWidget.type === "Todo List"}
            item={editModeWidget as Widget<TodoListSettings>}
            onClose={() => setEditModeWidget(undefined)}
          />
        </>
      )}
    </DashboardLayout>
  );
}
