import { getDatabase } from '@/lib/db';
import {NextResponse,NextRequest} from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const db = await getDatabase();
        const experience = await db.collection("publications").find({}).toArray();
        return NextResponse.json({ success: true, data: experience });
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: error instanceof Error ? error.message : error,
        });
      }
}