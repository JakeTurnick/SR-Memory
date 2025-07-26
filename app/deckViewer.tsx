import { sharedStyles } from "@/components/ui/sharedStyles";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

import * as DataTypes from "@/constants/DataTypes";
import { exampleDecks } from "@/constants/dummyData";

export default function DeckViewer() {
    return (
        <View style={[sharedStyles.centeredContainer, { 
            display: 'flex',
            flexDirection: 'row',
            width: '100%',

        }]}>
            <Stack.Screen options={{ title: 'Deck Viewer' }} />
            {renderDecks(exampleDecks)}
        </View>
    )
}

function renderDecks(decks: DataTypes.Deck[]) {
    return decks.map(deck => (
        <View key={deck.id} style={[sharedStyles.centeredContainer, { 
            margin: 10,
            padding: 10,
            minHeight: "35%",
            borderWidth: 2,
            borderColor: '#cccccc',
            borderStyle: 'solid',
            borderRadius: 10,
        }]}>
            <Text style={sharedStyles.h1Text}>{deck.name}</Text>
            <Text style={sharedStyles.text}>{deck.description}</Text>
            
        </View>
    ));
}