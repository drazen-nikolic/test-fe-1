import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fetchWidgets, logUserActivity, setWidgetsOrder } from "./utils";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const sortedWidgets = await fetchWidgets(userId);
  return NextResponse.json(sortedWidgets);
}

export async function POST(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const body = await req.json();
  const existingWidgets = await fetchWidgets(userId);

  if (
    body.type === "Recent Activity" &&
    existingWidgets.some((widget) => widget.type === "Recent Activity")
  ) {
    return NextResponse.json(
      { error: "Recent Activity already exists" },
      { status: 409 }
    );
  }

  const newWidget = await prisma.widget.create({
    data: { ...body, position: existingWidgets.length },
    select: {
      id: true,
      type: true,
      position: true,
      settings: true,
    },
  });

  await logUserActivity(userId, `Added new "${newWidget.type}" widget.`);

  return NextResponse.json([...existingWidgets, newWidget]);
}

export async function PUT(req: NextRequest) {
  const bodyConfig = await req.json();
  const widgetId = req.nextUrl.searchParams.get("widgetId");

  if (!widgetId) {
    return NextResponse.json(
      { error: "Widget ID is required" },
      { status: 400 }
    );
  }

  if (!bodyConfig) {
    return NextResponse.json(
      { error: "Settings config is required" },
      { status: 400 }
    );
  }

  try {
    const widget = await prisma.widget.findUnique({ where: { id: widgetId } });
    const updatedWidget = await prisma.widget.update({
      where: { id: widgetId },
      data: {
        settings: {
          ...(widget?.settings as object),
          config: bodyConfig,
        },
      },
    });
    await logUserActivity(
      updatedWidget?.userId,
      `Updated config of "${updatedWidget.type}" widget.`
    );

    return NextResponse.json(updatedWidget);
  } catch (error) {
    console.error("Error updating widget:", error);
    return NextResponse.json(
      { error: "Failed to update widget" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const widgetId = req.nextUrl.searchParams.get("widgetId");

  if (!userId || !widgetId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const deletedWidget = await prisma.widget.delete({
      where: { id: widgetId },
    });
    const widgets = await fetchWidgets(userId);
    const orderedWidgets = await setWidgetsOrder(
      widgets.map((widget) => widget.id)
    );
    await logUserActivity(userId, `Removed "${deletedWidget.type}" widget.`);

    return NextResponse.json({
      message: "Widget deleted successfully",
      orderedWidgets,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Widget not found" }, { status: 404 });
  }
}
