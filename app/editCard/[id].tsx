import { sharedStyles } from "@/components/ui/sharedStyles";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, TextInput, View } from "react-native";

import leftArrow from "@/assets/Icons/arrow_left.svg";
import rightArrow from "@/assets/Icons/arrow_right.svg";
import circle from "@/assets/Icons/circle.svg";
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

    console.log(card?.faces[faceIndex])
    
    return (
        <View style={{...sharedStyles.centeredContainer,
            borderWidth: 2,
            borderColor: '#cccccc',
            borderRadius: 10,
            margin: 10,
            flex: 1,
        }}>
            <ScrollView style={{flex: 1, width: "100%",}}
            contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
            }}>
                {/* This should be a map loop for each piece of content on the card */}
                {card?.faces[faceIndex].content.map(content => renderCardContent(content))
                /* wtf is going on here?*/
                    //? renderCardContent(card?.faces[faceIndex].content[]) 
                    //: <Text>This card is missing content...</Text>
                }

            </ScrollView>
            
            <View style={{
                width: '100%',
                height: '20%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: "center",
                padding: 20,
                borderTopWidth: 2,
                borderTopColor: '#cccccc'

            }}>
                <Pressable ><Image source={leftArrow} style={{...sharedStyles.iconLg}} ></Image></Pressable>
                {card?.faces && renderCarouselControls(card?.faces)}
                <Pressable ><Image source={rightArrow} style={{...sharedStyles.iconLg}} ></Image></Pressable>
            </View>
        </View>
    )
}

// carousel button needs styling
function renderCarouselControls(cardFaces: DataTypes.CardFace[]) {
    return cardFaces.map(face => {
        return (
            <Pressable key={face.id} style={{padding: 5}}>
                <Image source={circle} style={{...sharedStyles.iconSm, padding: 5}} />
            </Pressable>
        )
    })
}

function renderCardContent(content: DataTypes.TextContent) {
    if (content == null) {
        return
    }
    /* switch base on content type */
    return (
        <TextInput key={content.id} value={content.value} style={{...sharedStyles.text, width: "100%",}}></TextInput>
    )
}