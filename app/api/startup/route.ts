import { getDatabase } from "@/lib/db";
import {NextResponse,NextRequest} from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const db = await getDatabase();
        const gallery = await db.collection("gallery").find({}).toArray();
        return NextResponse.json({ success: true, data: gallery });
    } catch (error) {
        return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : error,
        });
    }
}