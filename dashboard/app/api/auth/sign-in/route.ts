import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";
import { logUserActivity } from "../../widgets/utils";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  const userSelect: Prisma.UserSelect = {
    id: true,
    name: true,
    email: true,
    password: true,
  };

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: userSelect,
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  try {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    cookies().set("token", token, { httpOnly: true });
    await logUserActivity(user.id, "Signed in.");
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something's wrong!" });
  }

  return NextResponse.json({ message: "Logged in successfully", user });
}
