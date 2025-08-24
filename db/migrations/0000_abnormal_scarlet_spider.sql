CREATE TABLE `face_table` (
	`id` integer,
	`guid` text,
	FOREIGN KEY (`id`) REFERENCES `card_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `card_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guid` text,
	`cardId` integer
);
--> statement-breakpoint
CREATE TABLE `content_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guid` text,
	`type` text(20),
	`cardFaceId` integer,
	FOREIGN KEY (`cardFaceId`) REFERENCES `face_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `deck_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guid` text,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `image_content_table` (
	`id` integer PRIMARY KEY NOT NULL,
	`imageUrl` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `content_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `text_content_table` (
	`id` integer PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `content_table`(`id`) ON UPDATE no action ON DELETE no action
);
