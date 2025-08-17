import { getDatabase } from "@/lib/db";
import { NextRequest,NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
      const db = await getDatabase();
      const experience = await db.collection("phdguide").find({}).toArray();
      return NextResponse.json({ success: true, data: experience });
    } catch (error) {
      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : error,
      });
    }
}
