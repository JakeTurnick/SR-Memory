import * as DataTypes from '@/constants/DataTypes';
import { CardFace, NewCard, NewContent, TextContent } from "@/db/schema";
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import * as schema from './schema';

// Factory function to create queries with the db context
function createQueries(database: any) {
  return {
    deckQueries: {
      findAllDecks: async () => {
        const allDecks = await database.query.decks.findMany({
          with: { cards: true }
        });
        return allDecks;
      },
      findDeckById: async (deckId: number) => {
        const deck = await database.query.decks.findFirst({
          where: eq(schema.decks.id, deckId),
          with: { cards: true }
        });

        return deck;
      },
      updateDeck: async (deckId: number, updates: Partial<{ name: string; description: string }>) => {
        const { name, description } = updates;
        await database.update(schema.decks)
          .set({ name, description })
          .where(eq(schema.decks.id, deckId));
      },
      createDeck: async (name: string, description?: string) => {
        const newDeck = { name, description };
        const [createdDeck] = await database.insert(schema.decks)
          .values(newDeck)
          .returning();
        return createdDeck;
      },
      killDeck: async (deckId: number) => {
        await database.delete(schema.decks)
          .where(eq(schema.decks.id, deckId));
      }
    },
    cardQueries: {
      findAllCards: async () => {
        const allCards = await database.query.cards.findMany();
        return allCards;
      },
      findCardById: async (cardId: number) => {
        const card = await database.select()
          .from(schema.cards)
          .where(eq(schema.cards.id, cardId));
        return card;
      },
      updateCard: async (
        cardId: number,
        updates: Partial<{ front: string; back: string; deckId: number }>
      ) => {
        const { front, back, deckId } = updates;
        await database.update(schema.cards)
          .set({ front, back, deckId })
          .where(eq(schema.cards.id, cardId));
      },
      createCard: async (
        deckId: number,
        card: NewCard
      ) => {
        const [createdCard] = await database.insert(schema.cards)
          .values({ ...card, deckId })
          .returning();
        return createdCard;
      },
      // Create a full card with faces and content (and optional text content
      createFullCard: async (
        deckId: number,
        card: NewCard,
        faces: DataTypes.CardFace[],
        //content: NewContent[],
        //textContent?: TextContent[],
      ) => {
        // 1. Insert newCard
        const [newCard] = await database.insert(schema.cards)
          .values({ ...card, deckId })
          .returning();
        
        const cardId = newCard.id;

        // 2. Create newFaces
        const cardFaces: DataTypes.CardFace[] = [];
        for (const [index, face] of faces.entries()) {
          const [newFace] = await database.insert(schema.cardFaces)
            .values({faceIndex: index, cardId})
            .returning();
            cardFaces.push({...newFace, content: face.content})
        }

        // 3. Create content for each face
        for (const [index, face] of cardFaces.entries()) {
          for (const [index, content] of face.content.entries()) {
            const [savedContent] = await database.insert(schema.content)
              .values({ ...content, cardFaceId: face.id })
              .returning();

            if (content.type === 'text') {
              await database.insert(schema.textContent)
                .values({ id: savedContent.id, value: content.value })
            }
            
          }
        }

        return newCard;
      },
      killCard: async (cardId: number) => {
        await database.delete(schema.cards)
          .where(eq(schema.cards.id, cardId));
      }
    },
    cardFaceQueries: {
      createCardFace: async (
        cardFace: Partial<DataTypes.CardFace>,
        cardId: number
      ) => {
        const [createdFace] = await database.insert(schema.cardFaces)
          .values({ ...cardFace, cardId })
          .returning();
        return createdFace;
      },
      updateCardFace: async(
        cardFace: CardFace
      ) => {
        const [updatedFace] = await database.update(schema.cardFaces)
          .values({...cardFace})
          .where(eq(schema.cardFaces.id, cardFace.id))
          .returning();

          return updatedFace;
      },
      findAllFacesByCardId: async (cardId: number) => {
        const faces = await database.query.cardFaces.findMany({
          where: eq(schema.cardFaces.cardId, cardId),
          with: { content: { with: { textContent: true } } }
        });
        return faces;
      },
      findFaceById: async (faceId: number) => {
        const face = await database.query.cardFaces.findFirst({
          where: eq(schema.cardFaces.id, faceId),
          with: { content: { with: { textContent: true } } }
        });
        return face;
      },
      killCardFace: async (faceId: number) => {
        await database.delete(schema.cardFaces)
          .where(eq(schema.cardFaces.id, faceId));
      }
    },
    contentQueries: {
      createContent: async (
        content: NewContent,
        cardFaceId: number
      ) => {
        const [savedContent] = await database.insert(schema.content)
          .values({ ...content, cardFaceId })
          .returning();

        if (content.type === 'text') {
          await database.insert(schema.textContent)
            .values({ id: savedContent.id, value: (content as TextContent).value })
        }
        return savedContent;
      }
    },
    updateContent: async (
      contentId: number,
      content: schema.Content
    ) => {
      await database.update(schema.content)
        .set({ ...content })
        .where(eq(schema.content.id, contentId));

      if (content.type === 'text' && 'value' in content) {
        await database.update(schema.textContent)
          .set({ value: (content as TextContent).value })
          .where(eq(schema.textContent.id, contentId));
      }
    },
    findContentById: async (contentId: number) => {
      const content = await database.query.content.findFirst({
        where: eq(schema.content.id, contentId),
        with: { textContent: true }
      });
      return content;
    },
    killContent: async (contentId: number) => {
      await database.delete(schema.content)
        .where(eq(schema.content.id, contentId));
    }
    //textContentQueries: {} let this be handled by contentQueries + switch statement
  }
};

// Custom hook to use in your components
export function useDatabase() {
  const SQLiteDatabase = useSQLiteContext()!;
  const database = drizzle(SQLiteDatabase, { schema });

  return createQueries(database as any);
}