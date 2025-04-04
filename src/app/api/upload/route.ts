import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const files = (await request.formData()).getAll("file");

  console.log(files);

  if (!files) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }
  return NextResponse.json({ message: "File uploaded successfully" });
}
