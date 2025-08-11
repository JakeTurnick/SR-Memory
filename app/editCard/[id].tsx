import { sharedStyles } from "@/components/ui/sharedStyles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import * as DataTypes from "@/constants/DataTypes";
import { exampleDecks } from "@/constants/dummyData";

type CardProps = {
    card?: DataTypes.Card;
    deck?: DataTypes.Deck;
}

export default function editCard(props: CardProps) {
    const { cardId, deckId } = useLocalSearchParams();
    const [card, setCard] = useState<DataTypes.Card | undefined>(props.card);
    const [faceIndex, setFaceIndex] = useState<number>(0);
    useEffect(() => {
        if (!props.card) {
            console.warn("No card prop");
            const foundDeck = exampleDecks.find(deck => deck.id === deckId as string);
            if (!foundDeck) {
                console.error("Deck not found with ID:", deckId);
                return;
            };
            console.log("Found deck: ", foundDeck, " cards: ", foundDeck.cards)
            const foundCard = foundDeck.cards.find(card => card.id === cardId as string);
            if (!foundCard) {
                console.error("Card not found with ID:", cardId, ", in deck: ", deckId);
                return;
            };
            setCard(foundCard);
            console.log("Card found:", foundCard);
        }
    },[]);
    
    return (
        <View style={{...sharedStyles.centeredContainer,
            borderWidth: 2,
            borderColor: '#cccccc',
            borderRadius: 10,
            margin: 10
        }}>
            <ScrollView contentContainerStyle={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                flexGrow: 1,
            }}>
                <Text style={{...sharedStyles.text}}>This will be card info</Text>
                <Text style={sharedStyles.h1Text}>{card?.faces[faceIndex].textContent.value}</Text>
                <Text style={sharedStyles.text}>This feature is under construction.</Text>
            </ScrollView>
            
            <View style={{
                width: '100%',
                height: '20%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 20,
                borderTopWidth: 2,
                borderTopColor: '#cccccc'

            }}>
                <Pressable ><Text style={{...sharedStyles.text}} >Previous</Text></Pressable>
                <Text style={{...sharedStyles.text}}> ... a dot for each face</Text>
                <Pressable ><Text style={{...sharedStyles.text}} >Next</Text></Pressable>
            </View>
        </View>
    )
}