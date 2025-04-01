import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const filename = searchParams.get("file");
  console.log(filename);
  if (!filename) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }
  return NextResponse.json({ message: "File uploaded successfully" });
}
