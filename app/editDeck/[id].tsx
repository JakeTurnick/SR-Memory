import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, DimensionValue, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { sharedStyles } from "@/components/ui/sharedStyles";

import * as DataTypes from "@/constants/DataTypes";
import { exampleDecks } from "@/constants/dummyData";
import { Button } from "@react-navigation/elements";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function DeckEditor() {
    const { id } = useLocalSearchParams();
    const [deck, setDeck] = useState<DataTypes.Deck | undefined>(undefined); // value used for page
    const [unChangedDeck, setUnchangedDeck] = useState<DataTypes.Deck | undefined>(undefined); // from DB, used to compare changes

    
    useEffect(() => {
        const foundDeck = exampleDecks.find(deck => deck.id === id as string);
        if (foundDeck) {
            setDeck(foundDeck);
            setUnchangedDeck(foundDeck);
        } else {
            console.error("Deck not found with ID:", id);
        }
    }, [id]);

    if (!deck) {
        return (
            <Text style={sharedStyles.h1Text}>No deck found with ID: {id}</Text>
        )
    } else return(
        <View style={[{
            flex: 1,
            padding: 20,
            width: screenWidth,
        }]}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <TextInput 
                    value={deck.name}
                    onChangeText={(text) => setDeck({...deck, name: text})}
                    style={{
                        ...sharedStyles.h1Text,
                        borderWidth: 2,
                        borderColor: '#cccccc',
                        borderRadius: 10,
                        boxShadow: '0 0 10px rgba(27, 252, 2, 0.87)',
                        padding: 16,
                        margin: 6, 
                        textDecorationLine: 'underline',
                }}></TextInput>
                {deck !== unChangedDeck && 
                    <Button onPress={() => {
                        setUnchangedDeck(deck);
                        // Here you would typically save the changes to a database or state management system
                        console.log("Changes saved:", deck);
                    }}>
                        Save Changes
                    </Button>
                }
            </View>
            {deck.description && <TextInput 
                value={deck.description}
                onChangeText={(text) => setDeck({...deck, description: text})}
                placeholder="Deck Description"
                multiline= {true}
                numberOfLines={4}
                style={{
                    ...sharedStyles.text,
                    padding: 6,
                }}
            ></TextInput>}
            
            <ScrollView contentContainerStyle={Platform.OS === 'web' ? styles.webScrollView : styles.mobileScrollView}>
                {deck.cards.map(card => renderCard(card))}
            </ScrollView>
        </View>
    )
}

function renderCard(card: DataTypes.Card) {
    let minWidth: DimensionValue = '90%';
    let minHeight: DimensionValue = null;
    let maxWidht: DimensionValue = null;
    let maxHeight: DimensionValue = null;
    if (Platform.OS === 'web') {
        minWidth = 200;
        minHeight = 400;
        maxWidht = 300;
        maxHeight = 600;
    }

    return (
        <View key={card.id} style={[sharedStyles.centeredContainer, {
  
            margin: 10,
            minWidth: minWidth,
            minHeight: minHeight,
            maxWidth: maxWidht,
            maxHeight: maxHeight,
            justifyContent: 'space-between',
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#cccccc',
            padding: 10,
            overflow: 'hidden',
            }]}>
            {card.faces.map(face => (
                <Text key={face.id} style={{
                    ...sharedStyles.text,
                    borderWidth: 1,
                    borderColor: '#777777',
                    borderRadius: 5,
                    display: 'flex',
                    flexGrow: 1,
                    width: '100%',
                    padding: 6,
                }}>
                    {face.faceIndex === 1 ? "Question: " : "Answer: "}
                    {face.textContent.value}
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    webScrollView: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    mobileScrollView: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
})