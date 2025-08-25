import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import 'react-native-reanimated';

import { drizzle } from 'drizzle-orm/expo-sqlite';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../db/migrations/migrations.js';

import { useColorScheme } from '@/hooks/useColorScheme';
import * as SQLite from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function RootLayout() {
  //const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }


  return (
    // return SQLiteProvider after testing
    <SQLite.SQLiteProvider databaseName="testDB" onInit={initDb}>
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
    </SQLite.SQLiteProvider>
  );
}

const initDb = async () => {

  const db = await SQLite.openDatabaseAsync('testDB')
  // Wrap the raw SQLite database with Drizzle
  const drizzleDb = drizzle(db);

  // Log the start of the migration process
  console.log('Starting migrations...');

  try {
    // Run the migrations
    await migrate(drizzleDb, migrations);
    console.log('Migrations complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}