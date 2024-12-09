import prisma from "@/lib/prisma";

type Settings = {
  config: {
    historyLength: number;
  };
  data: {
    activities: string[];
  };
};

const widgetResponseModel = {
  id: true,
  type: true,
  position: true,
  settings: true,
};

export async function fetchWidgets(userId: string) {
  return prisma.widget.findMany({
    where: { userId },
    orderBy: { position: "asc" },
    select: widgetResponseModel,
  });
}

export async function setWidgetsOrder(widgetIds: string[]) {
  const updateOperations = widgetIds.map((id: string, index: number) =>
    prisma.widget.update({
      where: { id },
      data: { position: index },
      select: widgetResponseModel,
    })
  );
  return prisma.$transaction(updateOperations);
}

// Log user activity through routes
export async function logUserActivity(userId: string, message: string) {
  const recentActivityWidget = await prisma.widget.findFirst({
    where: { userId, type: "Recent Activity" },
  });

  if (!recentActivityWidget) {
    return null;
  }

  const settings = recentActivityWidget.settings as Settings;

  if (!settings?.data?.activities) {
    console.error("Unexpected settings format");
    return null;
  }

  return await prisma.widget.update({
    where: { id: recentActivityWidget.id },
    data: {
      settings: {
        ...settings,
        data: {
          ...settings.data,
          activities: [message, ...settings.data.activities],
        },
      },
    },
  });
}
