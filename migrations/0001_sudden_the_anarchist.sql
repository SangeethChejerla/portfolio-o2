CREATE TABLE IF NOT EXISTS "guestbook" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" text NOT NULL,
	"author_name" text NOT NULL,
	"author_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
