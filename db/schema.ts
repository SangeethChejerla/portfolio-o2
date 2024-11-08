import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const views = pgTable('views', {
  slug: varchar('slug', { length: 255 }).primaryKey(),
  count: integer('count').notNull(),
});

export const guestbook = pgTable('guestbook', {
  id: serial('id').primaryKey(),
  message: text('message').notNull(),
  authorName: text('author_name').notNull(),
  authorId: text('author_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type GuestbookEntry = typeof guestbook.$inferSelect;
