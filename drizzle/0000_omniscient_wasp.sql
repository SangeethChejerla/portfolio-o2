CREATE TABLE IF NOT EXISTS "ViewsModel" (
	"id" integer PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"views" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ViewsModel_url_unique" UNIQUE("url")
);
