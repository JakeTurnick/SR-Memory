import { Button } from "@react-navigation/elements";
import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, DimensionValue, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { sharedStyles } from "@/components/ui/sharedStyles";

import * as DataTypes from "@/constants/DataTypes";
import { exampleDecks } from "@/constants/dummyData";
import * as queries from "@/db/queries";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function DeckEditor() {
    const { id } = useLocalSearchParams();
    const [deck, setDeck] = useState<DataTypes.Deck | undefined>(undefined); // value used for page
    const [unChangedDeck, setUnchangedDeck] = useState<DataTypes.Deck | undefined>(undefined); // from DB, used to compare changes

    const db = useSQLiteContext()!;
    const drizzleDB = drizzle(db);
    //const { success, error } = useMigrations(db, migrations);
    //console.log("Migration status: ", {success, error});
    
    (window as any).db = drizzleDB;
    (window as any).queries = queries; // for debugging purposes, to access queries in the console
    useEffect(() => {
        
        //console.log("testing queries: ", db, queries);
        //queries.deckQueries.createDeck(db, "Test Deck", "This is a test deck")
        console.log("Fetching deck with ID: ", id);
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
                {deck.cards.map(card => renderCard(card, deck.id))}
            </ScrollView>
        </View>
    )
}



function renderCard(card: DataTypes.Card, deckId: string) {

    const router = useRouter();

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
        <Pressable key={card.id} 
        //href={{ pathname: `/editCard/[id]`, params: { id: card.id, deckId: deckId}}}
        onPress={() => {
            console.log("Navigate to editCard/[id] with cardId: ", card.id, " and deckId: ", deckId)
            router.push({ pathname: 'editCard/[id]' as RelativePathString, params: { cardId: card.id, deckId} })
        }}
        style={[sharedStyles.centeredContainer, {
  
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
                    {face.content[0].value}
                </Text>
            ))}
        </Pressable>
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