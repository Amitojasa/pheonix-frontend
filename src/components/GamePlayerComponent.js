import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import boy from '../../assets/boy.png'
import girl from '../../assets/girl.png'
import { AuthContext } from '../context/AuthContext';
import { UserProfileImage } from '../Config';
function GamePlayerComponent({ playerId, playerPawn, playerDetails }) {
    const { myPlayerId, setMyPlayerId, activePlayerId } = useContext(AuthContext);
    console.log(activePlayerId);
    return (
        playerId == 1 ?
            <View style={[styles.container, activePlayerId == 1 && { borderColor: "#DB4A39", borderWidth: 5 }]}><Image source={playerPawn} style={styles.pawn} /><Image source={UserProfileImage(playerDetails ? playerDetails.profileImage : '')} style={styles.avatar} /><Text style={styles.usernameText}>{playerDetails.userName}</Text></View> :
            <View style={[styles.container, activePlayerId == 2 && { borderColor: "#DB4A39", borderWidth: 5 }]}><Image source={playerPawn} style={styles.pawn} /><Image source={UserProfileImage(playerDetails ? playerDetails.profileImage : '')} style={styles.avatar} /><Text style={styles.usernameText}>{playerDetails.userName}</Text></View>
    )
}

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginBottom: 5, marginHorizontal: 20, backgroundColor: "#FFF", padding: 10, borderRadius: 10, width: "28%", height: 100 },
    avatar: {
        flex: 1,
        resizeMode: "center"
    },
    pawn: {
        // flex: 1,
        resizeMode: "center",
        height: 25,
        width: 25,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 10,
        margin: 2,
        // backgroundColor: "#000"
    },
    usernameText: {
        fontSize: 12,
        fontWeight: "bold"
    }
    // { flex: 1, alignSelf: "center", color: "#FFF", fontWeight: "bold" }
})

export default GamePlayerComponent