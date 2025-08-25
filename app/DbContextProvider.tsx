import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import React, { createContext, PropsWithChildren } from "react";

// 4. Create the Provider component, with typed props
interface DbContextProviderProps {
  db: ExpoSQLiteDatabase;
}

export const DbContext = createContext<ExpoSQLiteDatabase | null>(null);

const DbContextProvider: React.FC<PropsWithChildren<DbContextProviderProps>> = ({db, children}) => {
    //const DbContext = createContext<ExpoSQLiteDatabase>(db);
    return (
        <DbContext.Provider value={db}>
            {children}
        </DbContext.Provider>
    );
}

export default DbContextProvider;