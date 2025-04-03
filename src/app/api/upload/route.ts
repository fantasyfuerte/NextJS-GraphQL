import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const files = await request.json();

  if (!files) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }
  return NextResponse.json({ message: "File uploaded successfully" });
}
