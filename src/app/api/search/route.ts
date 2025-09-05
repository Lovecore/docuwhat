import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/content";

export async function GET() {
  const content = getAllContent();
  return NextResponse.json(content);
}