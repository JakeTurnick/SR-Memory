import * as DataTypes from "./DataTypes";

export const exampleCards: DataTypes.Card[] = [
    {
        id: "card1",
        faces: [
            {
                id: "card1-face1",
                cardId: "card1",
                faceIndex: 1,
                textContent: {
                    type: "text",
                    value: "This is the first face of the card."
                }
            },
            {
                id: "card1-face2",
                cardId: "card1",
                faceIndex: 2,
                textContent: {
                    type: "text",
                    value: "This is the second face of the card."
                }
            }
        ],
        decks: ["deck1", "deck2"]
    },
    {
        id: "card2",
        faces: [
            {
                id: "card2-face1",
                cardId: "card2",
                faceIndex: 1,
                textContent: {
                    type: "text",
                    value: "What is the capital of France?"
                }
            },
            {
                id: "card2-face2",
                cardId: "card2",
                faceIndex: 2,
                textContent: {
                    type: "text",
                    value: "Paris"
                }
            }
        ],
        decks: ["deck1"]
    },
    {
        id: "card3",
        faces: [
            {
                id: "card3-face1",
                cardId: "card3",
                faceIndex: 1,
                textContent: {
                    type: "text",
                    value: "What is 2 + 2?"
                }
            },
            {
                id: "card3-face2",
                cardId: "card3",
                faceIndex: 2,
                textContent: {
                    type: "text",
                    value: "4"
                }
            }
        ],
        decks: ["deck1"]
    },
    {
        id: "card4",
        faces: [
            {
                id: "card4-face1",
                cardId: "card4",
                faceIndex: 1,
                textContent: {
                    type: "text",
                    value: "Who wrote 'Hamlet'?"
                }
            },
            {
                id: "card4-face2",
                cardId: "card4",
                faceIndex: 2,
                textContent: {
                    type: "text",
                    value: "William Shakespeare"
                }
            }
        ],
        decks: ["deck1"]
    },
    {
        id: "card5",
        faces: [
            {
                id: "card5-face1",
                cardId: "card5",
                faceIndex: 1,
                textContent: {
                    type: "text",
                    value: "What is the boiling point of water (°C)?"
                }
            },
            {
                id: "card5-face2",
                cardId: "card5",
                faceIndex: 2,
                textContent: {
                    type: "text",
                    value: "100"
                }
            }
        ],
        decks: ["deck1"]
    },
    {
        id: "card6",
        faces: [
            {
                id: "card6-face1",
                cardId: "card6",
                faceIndex: 1,
                textContent: {
                    type: "text",
                    value: "What is the largest planet in our solar system?"
                }
            },
            {
                id: "card6-face2",
                cardId: "card6",
                faceIndex: 2,
                textContent: {
                    type: "text",
                    value: "Jupiter"
                }
            }
        ],
        decks: ["deck1"]
    },
    {
        id: "card7",
        faces: [
            {
                id: "card7-face1",
                cardId: "card7",
                faceIndex: 1,
                textContent: {
                    type: "text",
                    value: "What is the chemical symbol for gold?"
                }
            },
            {
                id: "card7-face2",
                cardId: "card7",
                faceIndex: 2,
                textContent: {
                    type: "text",
                    value: "Au"
                }
            }
        ],
        decks: ["deck1"]
    },
    {
        id: "card8",
        faces: [
            {
                id: "card8-face1",
                cardId: "card8",
                faceIndex: 1,
                textContent: {
                    type: "text",
                    value: "Who painted the Mona Lisa?"
                }
            },
            {
                id: "card8-face2",
                cardId: "card8",
                faceIndex: 2,
                textContent: {
                    type: "text",
                    value: "Leonardo da Vinci"
                }
            }
        ],
        decks: ["deck1"]
    },
    {
        id: "card9",
        faces: [
            {
                id: "card9-face1",
                cardId: "card9",
                faceIndex: 1,
                textContent: {
                    type: "text",
                    value: "What is the smallest prime number?"
                }
            },
            {
                id: "card9-face2",
                cardId: "card9",
                faceIndex: 2,
                textContent: {
                    type: "text",
                    value: "2"
                }
            }
        ],
        decks: ["deck1"]
    },
]

export const exampleDecks: DataTypes.Deck[] = [
    {
        id: "deck1",
        name: "Example Deck 1",
        description: "Contains all example cards.",
        cards: [
            ...exampleCards
        ]
    },
    {
        id: "deck2",
        name: "Example Deck 2",
        description: "a slice of example cards.",
        cards: [
            ...exampleCards.slice(0,5)
        ]
    }
]