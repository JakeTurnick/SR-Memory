import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import * as schema from './schema';
import { cards, decks } from './schema';

// Factory function to create queries with the db context
function createDeckQueries(database: any) {
  return {
    deckQueries: {
      findAllDecks: async () => {
        const allDecks = await database.query.decks.findMany({
          with: { cards: true }
        });
        return allDecks;
      },
      findDeckById: async (deckId: number) => {
        const deck = await database.select()
          .from(decks)
          .where(eq(decks.id, deckId))
          
        return deck;
      },
      updateDeck: async (deckId: number, updates: Partial<{ name: string; description: string }>) => {
        const { name, description } = updates;
        await database.update(decks)
          .set({ name, description })
          .where(eq(decks.id, deckId));
      },
      createDeck: async (name: string, description?: string) => {
        const newDeck = { name, description };
        const [createdDeck] = await database.insert(decks)
          .values(newDeck)
          .returning();
        return createdDeck;
      },
      killDeck: async (deckId: number) => {
        await database.delete(decks)
          .where(eq(decks.id, deckId));
      }
    },
    cardQueries: {
      findAllCards: async () => {
        const allCards = await database.query.cards.findMany();
        return allCards;
      },
      findCardById: async (cardId: number) => {
        const card = await database.select()
          .from(cards)
          .where(eq(cards.id, cardId));
        return card;
      },
      updateCard: async (
        cardId: number,
        updates: Partial<{ front: string; back: string; deckId: number }>
      ) => {
        const { front, back, deckId } = updates;
        await database.update(cards)
          .set({ front, back, deckId })
          .where(eq(cards.id, cardId));
      },
      createCard: async (
        front: string,
        back: string,
        deckId: number
      ) => {
        const newCard = { front, back, deckId };
        const [createdCard] = await database.insert(cards)
          .values(newCard)
          .returning();
        return createdCard;
      },
      killCard: async (cardId: number) => {
        await database.delete(cards)
          .where(eq(cards.id, cardId));
      }
    }
  };
}

// Custom hook to use in your components
export function useDatabase() {
  const SQLiteDatabase = useSQLiteContext()!;
  const database = drizzle(SQLiteDatabase, { schema });
  return createDeckQueries(database as any);
}