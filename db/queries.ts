import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useSQLiteContext } from 'expo-sqlite';
import { decks } from './schema';

// Factory function to create queries with the db context
function createDeckQueries(database: any) {
  return {
    findAllDecks: async () => {
      const allDecks = await database.select().from(decks);
      return allDecks;
    },
    findDeckById: async (deckId: number) => {
      const deck = await database.select()
        .from(decks)
        .where(eq(decks.id, deckId));
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
  };
}

// Custom hook to use in your components
export function useDatabase() {
  const SQLiteDatabase = useSQLiteContext()!;
  const database = drizzle(SQLiteDatabase);
  return createDeckQueries(database as any);
}