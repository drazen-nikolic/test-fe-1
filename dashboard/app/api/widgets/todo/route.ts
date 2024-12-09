import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logUserActivity } from "../utils";
import type { TodoListSettings } from "@/types/widget";

export async function POST(req: NextRequest) {
  const bodyData = await req.json();
  const widgetId = req.nextUrl.searchParams.get("widgetId");

  if (!widgetId) {
    return NextResponse.json(
      { error: "Widget ID is required" },
      { status: 400 }
    );
  }

  if (!bodyData) {
    return NextResponse.json({ error: "Task is missing." }, { status: 400 });
  }

  try {
    const widget = await prisma.widget.findUnique({ where: { id: widgetId } });
    const settings = widget?.settings as TodoListSettings;

    const updatedWidget = await prisma.widget.update({
      where: { id: widgetId },
      data: {
        settings: {
          ...settings,
          data: {
            tasks: [...settings.data.tasks, bodyData],
          },
        },
      },
    });

    await logUserActivity(
      updatedWidget?.userId,
      `Added new task to "${settings.config.name}" todo list.`
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

export async function PUT(req: NextRequest) {
  const bodyData = await req.json();
  const widgetId = req.nextUrl.searchParams.get("widgetId");
  const taskId = req.nextUrl.searchParams.get("taskId");

  if (!widgetId) {
    return NextResponse.json(
      { error: "Widget ID is required" },
      { status: 400 }
    );
  }

  if (!taskId) {
    return NextResponse.json({ error: "taskId is required" }, { status: 400 });
  }

  if (!bodyData) {
    return NextResponse.json(
      { error: "Settings data is required" },
      { status: 400 }
    );
  }

  try {
    const widget = await prisma.widget.findUnique({ where: { id: widgetId } });
    const settings = widget?.settings as TodoListSettings;

    settings.data.tasks.find((task) => task.taskId === taskId)!.completed =
      bodyData.completed;

    const updatedWidget = await prisma.widget.update({
      where: { id: widgetId },
      data: {
        settings: {
          ...settings,
          data: {
            tasks: settings.data.tasks,
          },
        },
      },
    });

    await logUserActivity(
      updatedWidget?.userId,
      `${bodyData.completed ? "Checked" : "Unchecked"} item in "${
        settings.config.name
      }" todo list.`
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
  const taskId = req.nextUrl.searchParams.get("taskId");
  const widgetId = req.nextUrl.searchParams.get("widgetId");

  if (!widgetId) {
    return NextResponse.json(
      { error: "widgetId is required" },
      { status: 400 }
    );
  }

  if (!taskId) {
    return NextResponse.json({ error: "taskId is required" }, { status: 400 });
  }

  try {
    const widget = await prisma.widget.findUnique({ where: { id: widgetId } });
    const settings = widget?.settings as TodoListSettings;

    const updatedWidget = await prisma.widget.update({
      where: { id: widgetId },
      data: {
        settings: {
          ...settings,
          data: {
            tasks: settings.data.tasks.filter((task) => task.taskId !== taskId),
          },
        },
      },
    });

    await logUserActivity(
      widget?.userId as string,
      `Removed task from "${updatedWidget.type}".`
    );

    return NextResponse.json({
      message: `Removed task from "${updatedWidget.type}".`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Widget not found" }, { status: 404 });
  }
}
