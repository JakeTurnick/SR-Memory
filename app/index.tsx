import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Home' }} />
            <Text style={styles.text}>Home screen</Text>
            <Link href="./deckViewer" style={styles.text}>View decks</Link>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
    },
    text: {
        color: "white",
    }
})