import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function HomeLayout() {
    return (
        <>
            <h1 style={styles.text}>Permanent header?</h1>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'transparent' },
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="deckViewer" />
            </Stack>
        </>
        
    )
}


const styles = StyleSheet.create({
    text: {
        color: "white"
    },
})