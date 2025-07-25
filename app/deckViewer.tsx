import { sharedStyles } from "@/components/ui/sharedStyles";
import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function DeckViewer() {
    return (
        <View style={sharedStyles.centeredContainer}>
            <Stack.Screen options={{ title: 'Deck Viewer' }} />
            <Link href="./index" style={sharedStyles.text}>Back to Home</Link>
        </View>
    )
}