export type RecentActivitySettings = {
  config: {
    historyLength: number;
  };
  data: {
    activities: string[];
  };
};

export type Task = {
  taskId: string;
  description: string;
  completed: boolean;
};

export type TodoListSettings = {
  config: {
    name: string;
    maxItems: number;
  };
  data: {
    tasks: Task[];
  };
};

export type WeatherSettings = {
  config: {
    location: string;
    unit: string;
  };
};

export type Widget<T> = {
  id: string;
  type: string;
  position: number;
  settings: T;
};

export type WidgetType = Widget<
  WeatherSettings | TodoListSettings | RecentActivitySettings
>;
