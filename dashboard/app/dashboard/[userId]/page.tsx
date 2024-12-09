import prisma from "@/lib/prisma";
import Dashboard from "@/components/Dashboard";
import { redirect } from "next/navigation";
import { fetchWidgets } from "@/app/api/widgets/utils";
import type { WidgetType } from "@/types/widget";
import { User } from "@prisma/client";

export const dynamic = "force-dynamic";

async function getData({ userId }: { userId: string }) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  const widgets = await fetchWidgets(userId);

  return {
    user,
    widgets,
  };
}

export default async function DashboardPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;

  if (!userId) {
    redirect("/sign-in");
  }

  const { user, widgets } = await getData({ userId });

  const key = JSON.stringify(widgets);

  return (
    <Dashboard
      widgets={widgets as WidgetType[]}
      user={user as User}
      key={key}
    />
  );
}
