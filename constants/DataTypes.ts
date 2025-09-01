export type Deck = {
    id: number; // DB Primary key
    guid: string; // Unique identifier
    name: string; // Name of the deck
    description?: string; // Optional description of the deck
    cards: Card[];
};

export type Card = {
    id: number; // DB Primary key
    guid: string; // Unique identifier
    faces: CardFace[]; // 1 card to many faces
};

export type CardFace = {
    id: number; // DB Primary key
    guid: string; // Unique identifier
    cardId: string; // PK of card this face belongs to
    faceIndex: number; // which face for a card? 1, 2, 3, ...
    content: Array<TextContent> // upgrade to -> (TextContent | MultipleChoiceContent | ImageContent)
};

export type Content = {
    id: number; // DB Primary key
    guid: string; // Unique identifier
    type: string; // 'text', 'image', 'multiple_choice', etc
    cardFaceId: string; // Foreign key to CardFace
};

export interface TextContent extends Content  {
    id: number; // Primary key, also foreign key to Content
    value: string; // the actual text shown
};