import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

export async function GET(req: NextRequest) {
	try {
		const db = await getDatabase();
		const experience = await db.collection("experience").find({}).toArray();
		return NextResponse.json({ success: true, data: experience });
	} catch (error) {
		return NextResponse.json({ success: false, error: error instanceof Error ? error.message : error });
	}
}