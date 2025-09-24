import { sharedStyles } from "@/components/ui/sharedStyles";
import { useLocalSearchParams } from "expo-router";
import { produce } from 'immer';
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";


import leftArrow from "@/assets/Icons/arrow_left.svg";
import rightArrow from "@/assets/Icons/arrow_right.svg";
import circle from "@/assets/Icons/circle.svg";
import plus from "@/assets/Icons/plus.svg";
import * as DataTypes from "@/constants/DataTypes";
import { useDatabase } from "@/db/queries";

type CardProps = {
    card?: Partial<DataTypes.Card>;
    deck?: DataTypes.Deck;
}

const emptyCard: DataTypes.Card = { faces: 
    [
        { 
            faceIndex: 1, content: 
            [
                { type: 'text', value: 'no content' } as DataTypes.TextContent
            ] 
        }
    ] 
}

export default function editCard(props: CardProps) {
    const db = useDatabase();
    const { cardId, deckId } = useLocalSearchParams();
    const [card, setCard] = useState<Partial<DataTypes.Card>>(props.card ?? emptyCard);
    const originalCard = useRef<Partial<DataTypes.Card>>(emptyCard);
    const [faceIndex, setFaceIndex] = useState<number>(0);

    const isChanged: boolean = JSON.stringify(card) !== JSON.stringify(originalCard.current);

    (window as any).db = db; // for debugging purposes, to access queries in the console


    useEffect(() => {
        /*if (props.card) {
            
            console.warn("No card prop");
            
            setCard(foundCard);
            originalCard.current = foundCard;
            console.log("Card found:", foundCard);
            
        }*/
    },[]);

    
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
                {
                    card?.faces?.[faceIndex].content.map(function(content, index) {
                        return renderCardContent(content, index, faceIndex, setCard, card)
                    })
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
                {/* Previous face button */}
                <Pressable 
                    onPress={() => {
                        if (card?.faces == null) return
                        setFaceIndex((faceIndex - 1 + card?.faces.length) % card?.faces.length)
                    }}
                >
                    <Image source={leftArrow} style={{...sharedStyles.iconLg}} />
                </Pressable>
                {card?.faces && renderCarouselControls(card?.faces, setFaceIndex)}
                {/* New face button
                { content: [] as Partial<DataTypes.Content>[]} as DataTypes.CardFace */}
                <Pressable
                    onPress={() => {
                        card?.faces?.push({ 
                            faceIndex: card?.faces?.length, 
                            content: 
                                [
                                    { type: 'text', value: `no content face ${card?.faces?.length}` } as DataTypes.TextContent
                                ] 
                        })
                        console.log("Added new face: ", card?.faces)
                        if (card?.faces == null) return
                        //setFaceIndex(card.faces.length - 1)
                    }}>
                    <Image source={plus} style={{...sharedStyles.icon}} />
                </Pressable>
                {/* Next face button */}
                <Pressable
                    onPress={() => {
                        if (card?.faces == null) return
                        setFaceIndex((faceIndex + 1 + card?.faces.length) % card?.faces.length)
                    }}
                ><Image source={rightArrow} style={{...sharedStyles.iconLg}} ></Image></Pressable>
            </View>
            <View style={{flex: 1}}>
                { isChanged &&
                    <Pressable style={{
                        borderWidth: 2, 
                        borderColor: '#77ee77', 
                        borderRadius: 8,
                        padding: 8,
                    }}
                        onPress={async () => {
                            console.log("Save card: ", card);
                            if (card.id == null) {
                                db.cardQueries.createFullCard(
                                    1,
                                    card,
                                    card.faces as DataTypes.CardFace[],
                                ).then((newCard) => {
                                    console.log("Created new card: ", newCard);
                                })
                            }
                        }}>
                        <Text style={sharedStyles.h1Text}>Save</Text>
                    </Pressable>
                }
            </View>
        </View>
    )
}

// carousel button needs styling
function renderCarouselControls(cardFaces: DataTypes.CardFace[], setFaceIndex: React.Dispatch<SetStateAction<number>>) {
    return cardFaces.map((face, index) => {
        return (
            <Pressable key={face.id} style={{padding: 5}}
                onPress={() => setFaceIndex(index)}>
                <Image source={circle} style={{...sharedStyles.iconSm, padding: 5}} />
            </Pressable>
        )
    })
}

function renderCardContent(content: DataTypes.TextContent, contentIndex: number, faceIndex: number,
        updateState: React.Dispatch<SetStateAction<Partial<DataTypes.Card>>>, card: Partial<DataTypes.Card>) {
    if (content == null) {
        return
    }
    /* switch base on content type */
    return (
        <TextInput 
            key={contentIndex} 
            style={{...sharedStyles.text, width: "100%",}}
            value={content.value}
            onChangeText={text => updateState(produce(card, (draft) => {
                // Learned: cannot assign with optional chaining. Use if over && checks
                if (draft.faces?.[faceIndex]?.content?.[contentIndex]) {
                    draft.faces[faceIndex].content[contentIndex].value = text;
                }  
            }))}
        ></TextInput>
    )
}