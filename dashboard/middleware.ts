import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const token = cookies().get("token");
  const signInUrl = new URL("/sign-in", req.url);

  if (!token) {
    return NextResponse.redirect(signInUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token.value, secret);

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(signInUrl);
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
