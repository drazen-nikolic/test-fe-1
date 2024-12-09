import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    cookies().delete("token");
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Couldn't sign you out!" });
  }

  return NextResponse.json({ message: "Signed out successfully" });
}
