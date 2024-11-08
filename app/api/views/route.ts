import { db } from '@/db/db';
import { views } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { slug } = await request.json();

  try {
    await db
      .insert(views)
      .values({
        slug: slug,
        count: 1,
      })
      .onConflictDoUpdate({
        target: views.slug,
        set: {
          count: sql`${views.count} + 1`,
        },
      });

    const viewsData = await db
      .select()
      .from(views)
      .where(sql`views.slug = ${slug}`);

    return NextResponse.json({ count: viewsData[0]?.count || 0 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update view count' },
      { status: 500 }
    );
  }
}
