import { StyleSheet } from "react-native";

export const sharedStyles = StyleSheet.create({
    centeredContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222222ff',
    },
    text: {
        fontSize: 16,
        color: '#999999',
    },
    h1Text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#999999',
    },
    icon: {
        height: 32,
        width: 32,
        color: "#aaaaaa"
    },
    iconSm: {
        height: 24,
        width: 24,
        color: "#aaaaaa"
    },
    iconLg: {
        height: 48,
        width: 48,
        color: "#aaaaaa"
    },
});

//not quite sure how JSDoc works, but something to explore in the future for large project documentation
/**
 * Shared styles for the application.
 * @property centeredContainer - A style for a container that centers its content. Default dark background.
 * @property text - A style for text elements. Default light color.
 * @property h1Text - A style for main headings. Default light color.
 */