import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v6 as uuidv6 } from 'uuid';

export const cards = sqliteTable("card_table", {
    id: integer('id').primaryKey({autoIncrement: true}),
    guid: text('guid').$defaultFn(() => uuidv6()),
    cardId: integer('cardId')
})

export const cardFaces = sqliteTable("face_table", {
    id: integer('id').primaryKey({autoIncrement: true}),
    cardId: integer('id').references(() => cards.id),

})

export const cardToFacesRelationship = relations(cards, ({many}) => ({
    cardFaces: many(cardFaces)
}))