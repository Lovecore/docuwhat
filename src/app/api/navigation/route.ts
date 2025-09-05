import { NextResponse } from "next/server";
import { getNavigationStructure } from "@/lib/content";

export async function GET() {
  const navigation = getNavigationStructure();
  return NextResponse.json(navigation);
}