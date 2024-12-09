import { NextRequest, NextResponse } from "next/server";
import { setWidgetsOrder } from "@/app/api/widgets/utils";

export async function PUT(req: NextRequest) {
  const body = await req.json();

  if (!body.widgetIds || !Array.isArray(body.widgetIds)) {
    return NextResponse.json(
      { error: "widgetIds array is required" },
      { status: 400 }
    );
  }

  const { widgetIds } = body;

  try {
    const widgets = await setWidgetsOrder(widgetIds);

    return NextResponse.json({
      message: "Positions updated successfully",
      widgets,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update positions" },
      { status: 500 }
    );
  }
}
