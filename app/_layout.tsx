import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { drizzle, ExpoSQLiteDatabase } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import migrations from '../db/migrations/migrations.js';
import DbContextProvider from './DbContextProvider';

import { useColorScheme } from '@/hooks/useColorScheme';
import * as SQLite from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const initDb = async () => {
  
  const db = await SQLite.openDatabaseAsync('testDB')
  
  const drizzleDb = drizzle(db);

  try {
    // Run the migrations
    await migrate(drizzleDb, migrations);
    console.log('Migrations complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  }

  return {
    db,
    drizzleDb
  }
} 

export default function RootLayout() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [drizzleDb, setDrizzleDb] = useState<ExpoSQLiteDatabase | null>(null);
  //const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  useEffect(() => {
    initDb().then(({db, drizzleDb}) => {
      setDb(db);
      setDrizzleDb(drizzleDb);
      useDrizzleStudio(drizzleDb as unknown as any);
    })
  },[]);

  return (
    // return SQLiteProvider after testing
    //<SQLite.SQLiteProvider databaseName="testDB" onInit={initDb}>
    <DbContextProvider db={drizzleDb as unknown as ExpoSQLiteDatabase}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer>
            <Drawer.Screen
              name="index"
              options={{
                title: 'Home',
              }}
            />
            <Drawer.Screen
              name="deckViewer"
              options={{
                title: 'Deck Viewer',
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      </ThemeProvider>
    </DbContextProvider>
    //</SQLite.SQLiteProvider>
  );
}

/* const initDb = async () => {
  
  const db = await SQLite.openDatabaseAsync('testDB')
  
  const drizzleDb = drizzle(db);
  useDrizzleStudio(db as unknown as any);

  try {
    // Run the migrations
    await migrate(drizzleDb, migrations);
    console.log('Migrations complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
} */