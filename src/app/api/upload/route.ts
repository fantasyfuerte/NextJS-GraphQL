import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  
  const formData = await request.formData()
  console.log(formData.getAll("file"))

  

  return NextResponse.json({ message: "File uploaded successfully" });
}
