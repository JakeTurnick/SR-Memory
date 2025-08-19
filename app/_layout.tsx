import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useNavigation } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import * as SQLite from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }


  return (
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

const initDb = async (db: SQLite.SQLiteDatabase) => {
  const cardTable = await db.getFirstAsync("SELECT name FROM sqlite_master WHERE type='table' and name='cards';")

  if (!cardTable) {
    console.log("no card table")
    
  }
}