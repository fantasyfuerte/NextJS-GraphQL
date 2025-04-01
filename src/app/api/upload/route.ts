import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { file } = body;

  console.log(body);
  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }
  return NextResponse.json({ message: "File uploaded successfully" });
}
