export const widgets = [
  {
    type: "Weather",
    position: 0,
    settings: {
      config: {
        location: "New York, NY",
        unit: "Fahrenheit",
      },
    },
  },
  {
    type: "Todo List",
    position: 1,
    settings: {
      config: {
        name: "Todo List",
        maxItems: 5,
      },
      data: {
        tasks: [
          {
            taskId: "t1",
            description: "Finish project report",
            completed: false,
          },
          {
            taskId: "t2",
            description: "Book flight tickets",
            completed: true,
          },
        ],
      },
    },
  },
  {
    type: "Recent Activity",
    position: 2,
    settings: {
      config: {
        historyLength: 8,
      },
      data: {
        activities: [],
      },
    },
  },
];
