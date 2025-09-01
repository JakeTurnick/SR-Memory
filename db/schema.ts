import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v6 as uuidv6 } from 'uuid';


// Deck Table
export const decks = sqliteTable('deck_table', {
    id: integer('id').primaryKey({autoIncrement: true}),
    guid: text('guid').$defaultFn(() => uuidv6()),
    name: text('name').notNull(),
    description: text('description'),
    //cards: deckCardsRelationship
});

// Card Table
export const cards = sqliteTable("card_table", {
    id: integer('id').primaryKey({autoIncrement: true}),
    guid: text('guid').$defaultFn(() => uuidv6()),
    deckId: integer('deckId').references(() => decks.id), // Foreign key to a deck
    //cardId: integer('cardId') -- why did I have this?
    //cardFaces: cardFacesRelationship
});

//* relations must be declared both ways for Drizzle to 'infer relations' between them
// One Deck - Many Cards relation
export const deckCardsRelationship = relations(decks, ({ many }) => ({
    cards: many(cards)
}));
export const cardDeckRelation = relations(cards, ({ one }) => ({
    deck: one(decks, {
        fields: [cards.deckId],
        references: [decks.id]
    })
}));

// CardFace Table
export const cardFaces = sqliteTable("face_table", {
    id: integer('id').primaryKey({autoIncrement: true}),
    guid: text('guid').$defaultFn(() => uuidv6()),
    cardId: integer('id').references(() => cards.id), // Foreign key to a card
    faceIndex: integer('faceIndex').notNull(), // order of card face
    //content: faceContentRelatinoship
});

// One Card - Many Faces relation
export const cardFacesRelationship = relations(cards, ({many}) => ({
    cardFaces: many(cardFaces)
}));
export const faceCardRelation = relations(cardFaces, ({ one }) => ({
    card: one(cards, {
        fields: [cardFaces.cardId],
        references: [cards.id]
    })
}));


// Base Content Table
export const content = sqliteTable('content_table', {
    id: integer('id').primaryKey({autoIncrement: true}),
    guid: text('guid').$defaultFn(() => uuidv6()),
    type: text('type', { mode: "text", length: 20}), // e.g., 'text', 'image', 'multiple_choice'
    cardFaceId: integer('cardFaceId').references(() => cardFaces.id)
    // value: contentRelationship
});

// One Face - Many Content relation
export const facesContentRelationship = relations(cardFaces, ({ many }) => ({
    content: many(content)
}));
export const contentFaceRelation = relations(content, ({ one }) => ({
    cardFace: one(cardFaces, {
        fields: [content.cardFaceId],
        references: [cardFaces.id],
    })
}));

// Typed Content Tables
export const textContent = sqliteTable('text_content_table', {
    id: integer('id').primaryKey().references(() => content.id),
    value: text('value').notNull(),
});
export const imageContent = sqliteTable('image_content_table', {
    id: integer('id').primaryKey().references(() => content.id),
    imageUrl: text('imageUrl').notNull(),
});

// One Content - One TypedContent relation
export const contentTypedContentRelationships = relations(content, ({ one }) => ({
    textContent: one(textContent, {
        fields: [content.id],
        references: [textContent.id],
    }),
    imageContent: one(imageContent, {
        fields: [content.id],
        references: [imageContent.id],
    })
}));

// One TypeContent - One Content relation
export const typedContentContentRelation = relations(textContent, ({ one }) => ({
    content: one(content, {
        fields: [textContent.id],
        references: [content.id],
    })
}));
export const typedImageContentRelation = relations(imageContent, ({ one }) => ({
    content: one(content, {
        fields: [imageContent.id],
        references: [content.id],
    })
}));

