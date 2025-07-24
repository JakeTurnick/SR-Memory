import { Pressable, StyleSheet, Text, View } from 'react-native';

type HeaderProps = {
    navigation: any;
    text: string;
    children?: React.ReactNode;
};

export function Header({ navigation, text, children }: HeaderProps) {

    return (
        <View style={{flex: 1,}}>
            <View style={styles.container}>
                <Pressable onPress={(() => {
                    navigation.openDrawer();
                })}>
                    <Text style={styles.text}>{text}</Text>
                </Pressable>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000000ff' }}>SR Memory</Text>
            </View>
            <View style={{ flex: 1 }}>
                {children}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 150,
        paddingTop: 50,
        backgroundColor: '#116ecbff',
        justifyContent: 'space-between',
    },
    text: {
        color: "black",
        fontSize: 32,
        outline: '5px solid black',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    }
})