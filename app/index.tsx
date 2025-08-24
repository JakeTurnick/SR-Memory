import { sharedStyles } from "@/components/ui/sharedStyles";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
    return (
        <View style={sharedStyles.centeredContainer}>
            <Stack.Screen options={{ title: 'Home' }} />
            <Text style={sharedStyles.text}>Home screen</Text>
            <Link href="./deckViewer" style={{...styles.h1, padding: 10}}>View decks</Link>
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