import { sharedStyles } from "@/components/ui/sharedStyles";
import { Stack } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

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
            {
                exampleDecks.map(deck => renderDeck2(deck))
                // map over dekcs with render single deck,
                // this prevents modal for being rendered for all decks - as oppsed to the one clicked
                //renderDecks(exampleDecks)
            }
        </View>
    )
}


function renderDeck2(deck: DataTypes.Deck) {
    const [showModal, setShowModal] = useState(false);
    return (
        <Pressable 
        key={deck.id} 
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
            console.log(`${deck.id}, ${deck.name} pressed`);
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
                
                <TouchableOpacity onPress={() => setShowModal(false)} style={[
                    sharedStyles.centeredContainer, 
                    { 
                        backgroundColor: 'rgba(0, 0, 0, 0.35)',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1,
                    }
                ]}>
                    <View style={[{
                    maxHeight: "80%",
                    maxWidth: "90%",
                    padding: 20,
                    borderRadius: 10,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    backgroundColor: '#333333',
                }
                ]}>
                        <Text style={sharedStyles.h1Text}>{deck.name}'s modal</Text>
                        <Text style={sharedStyles.text}>{deck.description}</Text>
                        {/* Render deck cards here */}
                    </View>
                </TouchableOpacity>
                    
                
            </Modal>
        </Pressable>
    );  
}

function renderDecks(decks: DataTypes.Deck[]) {
    const [showModal, setShowModal] = useState(false);
    return decks.map(deck => (
        <Pressable 
        key={deck.id} 
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
            console.log(`${deck.id}, ${deck.name} pressed`);
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
                
                <TouchableOpacity onPress={() => setShowModal(false)} style={[
                    sharedStyles.centeredContainer, 
                    { 
                        backgroundColor: 'rgba(0, 0, 0, 0.35)',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1,
                    }
                ]}>
                    <View style={[{
                    maxHeight: "80%",
                    maxWidth: "90%",
                    padding: 20,
                    borderRadius: 10,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    backgroundColor: '#333333',
                }
                ]}>
                        <Text style={sharedStyles.h1Text}>{deck.name}'s modal</Text>
                        <Text style={sharedStyles.text}>{deck.description}</Text>
                        {/* Render deck cards here */}
                    </View>
                </TouchableOpacity>
                    
                
            </Modal>
        </Pressable>
    ));
}
