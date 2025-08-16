export type Content = {
    id: string;
}

export interface TextContent extends Content  {
    type: "text"; // identifies this as text content
    value: string; // the actual text shown
};

export type CardFace = {
    id: string; // Unique identifier for the card face
    cardId: string; // 1 card to many face
    faceIndex: number; // which face for a card? 1, 2, 3, ...
    //textContent?: TextContent;
    //[key: string]: TextContent | MultipleChoiceContent | ImageContent; // flexible properties for different content types
    // ^^ future update: allows x number of properties, of multiple types - for when cards are more advanced
    content: Array<TextContent> // upgrade to -> (TextContent | MultipleChoiceContent | ImageContent)
}
export type Card = {
    id: string; // Unique identifier for the card
    // name: string; --- do we need this?
    faces: CardFace[]; // 1 card to many faces
    decks: string[]; // which decks does this card belong to?
}

export type Deck = {
    id: string; // Unique identifier for the deck
    name: string; // Name of the deck
    description?: string; // Optional description of the deck
    cards: Card[];
}