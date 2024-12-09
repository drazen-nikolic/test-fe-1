import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item from "./Item";
import WeatherWidget from "./widgets/Weather";
import TodoListWidget from "./widgets/TodoList";
import RecentActivityWidget from "./widgets/RecentActivity";
import type {
  WidgetType,
  Widget,
  WeatherSettings,
  TodoListSettings,
  RecentActivitySettings,
} from "@/types/widget";
import { useTheme } from "@mui/material";

type SortableItemProps = {
  item: WidgetType;
  onEdit: (item: WidgetType) => void;
  onDelete: (item: WidgetType) => void;
};

export function SortableItem({ item, onEdit, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });
  const theme = useTheme();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const renderWidget = (type: string) => {
    switch (type) {
      case "Weather":
        return (
          <WeatherWidget
            item={item as Widget<WeatherSettings>}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      case "Todo List":
        return (
          <TodoListWidget
            item={item as Widget<TodoListSettings>}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      case "Recent Activity":
        return (
          <RecentActivityWidget
            item={item as Widget<RecentActivitySettings>}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      default:
        return "Widget doesn't exist";
    }
  };

  return (
    <Item
      ref={setNodeRef}
      style={{ ...style, backgroundColor: theme.palette.background.paper }}
      {...item}
      {...attributes}
      {...listeners}
    >
      {renderWidget(item.type)}
    </Item>
  );
}
