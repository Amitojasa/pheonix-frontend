import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
function GamePlayerComponent({ playerId }) {

    return (
        playerId == 1 ?
            <View style={styles.container}><Text>Player 1</Text><Ionicons name="person" size={60} color="#000000" /></View> :
            <View style={styles.container}><Text>Player 2</Text><Ionicons name="person" size={60} color="#383CC1" /></View>
    )
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', justifyContent: 'space-between', flex: 1 }
})

export default GamePlayerComponent