import { Button } from "@react-navigation/elements";
import { RelativePathString, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, DimensionValue, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import EditCard from "@/app/editCard/[id]";
import ModalComponent from "@/components/ui/Modal";
import { sharedStyles } from "@/components/ui/sharedStyles";

import * as DataTypes from "@/constants/DataTypes";
import { useDatabase } from "@/db/queries";

import add_box from "@/assets/Icons/add_box.svg";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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

export default function DeckEditor() {
    const db = useDatabase();
    const { id } = useLocalSearchParams();
    const [deck, setDeck] = useState<DataTypes.Deck | undefined>(undefined); // value used for page
    //TODO: unChangedDeck -> deckChanges --> deck = {deck, ...deckChanges}
    const [unChangedDeck, setUnchangedDeck] = useState<DataTypes.Deck | undefined>(undefined); // from DB, used to compare changes
    const [isLoading, setIsLoading] = useState(true);
    const [showCreateCardModal, setShowCreateCardModal] = useState(false);

    db.cardQueries.killCard(1);

    
    (window as any).db = db; // for debugging purposes, to access queries in the console
    useEffect(() => {
        const findDeck = async (id: number) => {
            //console.log("Fetching deck with ID: ", id);
            try {
                const foundDeck = db.deckQueries.findDeckById(Number(id));
                setDeck(await foundDeck);
                setUnchangedDeck(await foundDeck);
                //console.log("Found deck: ", foundDeck);
            } catch (error) {
                console.error("Error fetching deck by ID: ", error);
            } finally {
                setIsLoading(false);
            }
        }
        findDeck(Number(id));
        
    }, [id]);

    if (isLoading) {
        return (
            <View style={sharedStyles.centeredContainer}>
                <Text style={sharedStyles.h1Text}>Loading deck...</Text>
            </View>
        )
    }

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
                <Pressable
                    //href={{ pathname: `/editCard/[id]`, params: { id: card.id, deckId: deckId}}}
                    onPress={() => {
                        console.log("add new card")

                        setShowCreateCardModal(true);
                        //router.push({ pathname: 'editCard/[id]' as RelativePathString, params: { cardId: card.id, deckId} })
                    }}
                    style={[sharedStyles.centeredContainer, {
                        margin: 10,
                        minWidth: minWidth,
                        minHeight: minHeight,
                        maxWidth: maxWidht,
                        maxHeight: maxHeight,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderRadius: 10,
                        borderColor: '#cccccc',
                        padding: 10,
                        overflow: 'hidden',
                        }]}>
                    <Image source={add_box} style={{width: "40%", height: "40%"}}/>
                </Pressable>
                {(deck?.cards?.length > 0 && deck?.cards !== undefined) && deck.cards.map(card => <RenderCard card={card} deckId={deck.guid} key={card.id}/>)}
            </ScrollView>
            {/* MODAL FOR ADDING A NEW CARD */}
            <ModalComponent 
                visible={showCreateCardModal} 
                setVisible={setShowCreateCardModal}
                fgStyleOverride={{width: '80%'}}
                >
                <Text style={{...sharedStyles.h1Text}}>New Card:</Text>
                <EditCard deck={deck} />
            </ModalComponent>
        </View>
    )
}



function RenderCard({ card, deckId }: { card: DataTypes.Card, deckId: string }) {
    const router = useRouter();

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