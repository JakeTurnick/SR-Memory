ALTER TABLE `face_table` ADD `faceIndex` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `card_table` ADD `deckId` integer REFERENCES deck_table(id);--> statement-breakpoint
ALTER TABLE `card_table` DROP COLUMN `cardId`;