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

export const cards = sqliteTable("card_table", {
    id: integer('id').primaryKey({autoIncrement: true}),
    guid: text('guid').$defaultFn(() => uuidv6()),
    deckId: integer('deckId').references(() => decks.id), // Foreign key to a deck
    //cardId: integer('cardId') -- why did I have this?
    //cardFaces: cardFacesRelationship
});


// relations must be declared both ways for Drizzle to 'infer relations' between them
export const deckCardsRelationship = relations(decks, ({ many }) => ({
    cards: many(cards)
}));
export const cardDeckRelation = relations(cards, ({ one }) => ({
    deck: one(decks, {
        fields: [cards.deckId],
        references: [decks.id]
    })
}));

// Specifies that cards have many faces
export const cardFacesRelationship = relations(cards, ({many}) => ({
    cardFaces: many(cardFaces)
}))

export const cardFaces = sqliteTable("face_table", {
    id: integer('id').primaryKey({autoIncrement: true}),
    guid: text('guid').$defaultFn(() => uuidv6()),
    cardId: integer('id').references(() => cards.id), // Foreign key to a card
    faceIndex: integer('faceIndex').notNull(), // order of card face
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
    // value: contentRelationship
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

