PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_face_table` (
	`id` integer,
	`guid` text NOT NULL,
	`faceIndex` integer NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `card_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_face_table`("id", "guid", "faceIndex") SELECT "id", "guid", "faceIndex" FROM `face_table`;--> statement-breakpoint
DROP TABLE `face_table`;--> statement-breakpoint
ALTER TABLE `__new_face_table` RENAME TO `face_table`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_card_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guid` text NOT NULL,
	`deckId` integer,
	FOREIGN KEY (`deckId`) REFERENCES `deck_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_card_table`("id", "guid", "deckId") SELECT "id", "guid", "deckId" FROM `card_table`;--> statement-breakpoint
DROP TABLE `card_table`;--> statement-breakpoint
ALTER TABLE `__new_card_table` RENAME TO `card_table`;--> statement-breakpoint
CREATE TABLE `__new_content_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guid` text,
	`type` text(20),
	`cardFaceId` integer,
	FOREIGN KEY (`cardFaceId`) REFERENCES `face_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_content_table`("id", "guid", "type", "cardFaceId") SELECT "id", "guid", "type", "cardFaceId" FROM `content_table`;--> statement-breakpoint
DROP TABLE `content_table`;--> statement-breakpoint
ALTER TABLE `__new_content_table` RENAME TO `content_table`;--> statement-breakpoint
CREATE TABLE `__new_image_content_table` (
	`id` integer PRIMARY KEY NOT NULL,
	`imageUrl` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `content_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_image_content_table`("id", "imageUrl") SELECT "id", "imageUrl" FROM `image_content_table`;--> statement-breakpoint
DROP TABLE `image_content_table`;--> statement-breakpoint
ALTER TABLE `__new_image_content_table` RENAME TO `image_content_table`;--> statement-breakpoint
CREATE TABLE `__new_text_content_table` (
	`id` integer PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `content_table`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_text_content_table`("id", "value") SELECT "id", "value" FROM `text_content_table`;--> statement-breakpoint
DROP TABLE `text_content_table`;--> statement-breakpoint
ALTER TABLE `__new_text_content_table` RENAME TO `text_content_table`;--> statement-breakpoint
CREATE TABLE `__new_deck_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`guid` text NOT NULL,
	`name` text NOT NULL,
	`description` text
);
--> statement-breakpoint
INSERT INTO `__new_deck_table`("id", "guid", "name", "description") SELECT "id", "guid", "name", "description" FROM `deck_table`;--> statement-breakpoint
DROP TABLE `deck_table`;--> statement-breakpoint
ALTER TABLE `__new_deck_table` RENAME TO `deck_table`;