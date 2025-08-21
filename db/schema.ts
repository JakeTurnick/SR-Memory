import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v6 as uuidv6 } from 'uuid';

export const decks = sqliteTable('deck_table', {
    id: integer('id').primaryKey({autoIncrement: true}),
    guid: text('guid').$defaultFn(() => uuidv6()),
    name: text('name').notNull(),
    description: text('description'),
    //cards: deckCardsRelationship
})

export const deckCardsRelationship = relations(decks, ({ many }) => ({
    cards: many(cards)
}))

export const cards = sqliteTable("card_table", {
    id: integer('id').primaryKey({autoIncrement: true}),
    guid: text('guid').$defaultFn(() => uuidv6()),
    cardId: integer('cardId')
    //cardFaces: cardFacesRelationship
})

// Specifies that cards have many faces
export const cardFacesRelationship = relations(cards, ({many}) => ({
    cardFaces: many(cardFaces)
}))

export const cardFaces = sqliteTable("face_table", {
    id: integer('id').primaryKey({autoIncrement: true}),
    guid: text('guid').$defaultFn(() => uuidv6()),
    cardId: integer('id').references(() => cards.id), // Foreign key to a card
    //content: faceContentRelatinoship
})

export const facesContentRelationship = relations(cardFaces, ({ many }) => ({
    content: many(content)
}))

export const content = sqliteTable('content_table', {
    id: integer('id').primaryKey({autoIncrement: true}),
    guid: text('guid').$defaultFn(() => uuidv6()),
    type: text('type', { mode: "text", length: 20}), // e.g., 'text', 'image', 'multiple_choice'
    cardFaceId: integer('cardFaceId').references(() => cardFaces.id)
})

export const contentRelationships = relations(content, ({ one }) => ({
    textContent: one(textContent, {
        fields: [content.id],
        references: [textContent.id],
    }),
    imageContent: one(imageContent, {
        fields: [content.id],
        references: [imageContent.id],
    })
}))

export const textContent = sqliteTable('text_content_table', {
    id: integer('id').primaryKey().references(() => content.id),
    value: text('value').notNull(),
})

export const imageContent = sqliteTable('image_content_table', {
    id: integer('id').primaryKey().references(() => content.id),
    imageUrl: text('imageUrl').notNull(),
})

