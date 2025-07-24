import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function DeckViewer() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Deck Viewer' }} />
            <Link href="./index" style={styles.text}>Back to Home</Link>
        </View>
    )
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