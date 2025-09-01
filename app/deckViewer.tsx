import { sharedStyles } from "@/components/ui/sharedStyles";
import { ExternalPathString, Link, RelativePathString, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import * as DataTypes from "@/constants/DataTypes";
import { useDatabase } from "@/db/queries";

export default function DeckViewer() {
    const db = useDatabase();
    const [decks, setDecks] = useState<DataTypes.Deck[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                //console.log(db.deckQueries.findAllDecks())
                db.deckQueries.findAllDecks().then(fetchedDecks => {
                    setDecks(fetchedDecks);
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching decks: ", error);
            }
        };
        
        fetchDecks()
    }, []);

    (window as any).decks = decks;
    return (
        <ScrollView contentContainerStyle={[sharedStyles.centeredContainer, { 
            display: 'flex',
            flexDirection: 'row',
            width: '100%',

        }]}>
            <Stack.Screen options={{ title: 'Deck Viewer' }} />
            {
                !loading && decks !== undefined ? decks.map(deck => <RenderDeck key={deck.guid} deck={deck} />)
                : <Text style={sharedStyles.h1Text}>No decks found. Please create a deck first.</Text>
                // map over decks with render single deck, prevents one modal for being rendered for all decks
            }
        </ScrollView>
    )
}

// STATE MUST BE IN COMPONENTS - NOT IN  FUNCTIONS (components are PascalCase)
function RenderDeck({ deck }: { deck: DataTypes.Deck }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <Pressable  
        style={[sharedStyles.centeredContainer, { 
            margin: 10,
            padding: 10,
            minHeight: "35%",
            borderWidth: 2,
            borderColor: '#cccccc',
            borderStyle: 'solid',
            borderRadius: 10,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
        }]}
        onPress={() => {
            setShowModal(true);
        }}>
            <Text style={sharedStyles.h1Text}>{deck.name}</Text>
            <View style={[
                {
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                }
            ]}>
                <Text style={[sharedStyles.text ]}>Total Cards: {deck.cards.length}</Text>
                <Text style={sharedStyles.text}>{deck.description}</Text>
            </View>
            <Text style={sharedStyles.text}>Last Reviewed: Some time</Text>
            <Modal
            visible={showModal}
            transparent={true}
            animationType="fade"
            >
                
                <Pressable 
                onPress={
                    () => {
                        setShowModal(false);
                    }
                } 
                style={[
                    sharedStyles.centeredContainer, 
                    { 
                        backgroundColor: 'rgba(0, 0, 0, 0.35)',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1,
                        cursor: 'pointer',
                    }
                ]}
                >
                    <Pressable style={[{
                        flex: 1,
                        margin: "10%",
                        padding: 20,
                        borderRadius: 10,
                        backgroundColor: '#333333',
                        cursor: 'pointer',
                    }]}
                    onPress={(e) => {
                        e.stopPropagation(); // Prevents closing modal when clicking inside
                    }  } 
                    >
                        <Text style={sharedStyles.h1Text}>{deck.name}'s modal</Text>
                        <Text style={sharedStyles.text}>{deck.description}</Text>
                        {/* Render deck cards here */}
                        {renderDeckOptions(deck, setShowModal)}
                    </Pressable>
                </Pressable>
            </Modal>
        </Pressable>
    );  
}


function renderDeckOptions(deck: DataTypes.Deck, setShowModal: (show: boolean) => void) {
    return (
        <View style={{ 
            width: '100%',
            paddingTop: 10,
        }}>

            {deckOptionsBtn(setShowModal, `./editDeck/${deck.id}`, "Edit Deck")}
            <Link href="./deckViewer" style={[sharedStyles.text, deckSytles.deckOptionsBtn]}>
                <Text>Start Review</Text>
                <Text>(x days ago)</Text>
            </Link>
        </View>
    );
}

function deckOptionsBtn(setShowModal: (show: boolean) => void, link: RelativePathString | ExternalPathString, text: string) {
    return (
        <Pressable style={({pressed}) => [
                deckSytles.deckOptionsBtn,
                pressed && { backgroundColor: '#555555' }
                
            ]}
            onPress={() => {
                setShowModal(false)
            }}>
                <Link href={link} style={[sharedStyles.text]}>{text}</Link>
            </Pressable>
    )
}

const deckSytles = StyleSheet.create({
    deckOptionsBtn: {
        width: '100%',
        padding: 10,
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: '#444444',
        alignContent: 'space-between',
        justifyContent: 'space-between',

    }
});