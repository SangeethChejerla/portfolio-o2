// src/app/api/entries/route.ts
import { db } from '@/db/db';
import { guestbook } from '@/db/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { message } = await req.json();

    if (
      !message ||
      typeof message !== 'string' ||
      message.trim().length === 0
    ) {
      return new NextResponse('Message is required', { status: 400 });
    }

    const entry = await db
      .insert(guestbook)
      .values({
        message: message.trim(),
        authorId: userId,
        authorName: user.firstName || 'Anonymous',
      })
      .returning();

    return NextResponse.json(entry[0]);
  } catch (error) {
    console.error('Error in POST /api/entries:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
