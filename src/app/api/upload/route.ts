import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get("file");
  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }
  return NextResponse.json({ message: "File uploaded successfully" });
}
