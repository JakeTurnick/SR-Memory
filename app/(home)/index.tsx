import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
    return (
        <View>
            <Text style={styles.text}>Home screen</Text>
            <Link href="./deckViewer" style={styles.text}>View decks</Link>
        </View>
    );
}


const styles = StyleSheet.create({
    text: {
        color: "white"
    },
})