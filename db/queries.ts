import { eq, sql } from 'drizzle-orm';
import { union } from 'drizzle-orm/sqlite-core';
import { content, decks, imageContent, textContent } from './schema';


export const deckQueries = {
    findDeckById: async (db: any, deckId: number) => {
        const deck = await db.select()
            .from(decks)
            .where(eq(decks.id, deckId))

        return deck;
    },
    updateDeck: async (db: any, deckId: number, updates: Partial<{ name: string; description: string }>) => {
        const { name, description } = updates;
        await db.update(decks)
            .set({ name, description })
            .where(eq(decks.id, deckId));
    },
    createDeck: async (db: any, name: string, description?: string) => {
        const newDeck = {
            name,
            description,
        }
        const [createdDeck] = await db.insert(decks)
            .values(newDeck)
            .returning();
        return createdDeck;
    },
    killDeck: async (db: any, deckId: number) => {
        await db.delete(decks)
            .where(eq(decks.id, deckId));
    }
}

/**
 * Fetches a single content item (text, image, or audio) and its related data.
 * @param {import('./db').db} db - The Drizzle ORM database connection object.
 * @param {number} contentId - The ID of the content item to fetch.
 * @returns {Promise<Array<{ id: number, type: string, data: any }>>} The content data.
 */
export async function getContentById(db: any, contentId: number) {
  // Base query with a where clause to filter by contentId
  const baseQuery = db
    .select({
      id: content.id,
      type: content.type,
      data: sql`NULL`, // Placeholder for specific content data
    })
    .from(content)
    .where(eq(content.id, contentId));

  // Query for text content
  const textQuery = db
    .select({
      id: content.id,
      type: content.type,
      data: textContent.value,
    })
    .from(content)
    .leftJoin(textContent, eq(content.id, textContent.id))
    .where(eq(content.id, contentId));

  // Query for image content
  const imageQuery = db
    .select({
      id: content.id,
      type: content.type,
      data: imageContent.imageUrl,
    })
    .from(content)
    .leftJoin(imageContent, eq(content.id, imageContent.id))
    .where(eq(content.id, contentId));

  /* no audio yet
  // Query for audio content
  const audioQuery = db
    .select({
      id: content.id,
      type: content.type,
      data: audioContent.url,
    })
    .from(content)
    .leftJoin(audioContent, eq(content.id, audioContent.id))
    .where(eq(content.id, contentId));
    */

  // Union all the specific content queries.
  // The first query in a union determines the column names for the final result set.
  const allContent = await union(textQuery, imageQuery);
  
  // The union will return at most one result for a given contentId, 
  // since a piece of content can only be one type.
  return allContent;
}