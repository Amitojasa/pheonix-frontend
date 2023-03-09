import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import boy from '../../assets/boy.png'
import girl from '../../assets/girl.png'
import coin from '../../assets/coin.png'
import { UserProfileImage } from '../Config'

const WinPlayerMatching = ({ playerId, winningPlayer, playerDetails, isOffline = false }) => {
    // console.log("aaa" + playerId);

    console.log(playerDetails);
    return (
        playerId == 1 ?
            <View style={styles.container}>
                {winningPlayer == 1 ? <View style={styles.winnerContainer}><Text style={[styles.coinNumber, { color: "#FFF", fontSize: 20 }]}>Winner</Text></View> : <View style={styles.emptyContainer} ><Text style={styles.coinNumber}></Text></View>}
                <View style={styles.internalContainer}><Image source={UserProfileImage(playerDetails ? playerDetails.profileImage : '')} style={styles.avatar} /><Text style={styles.usernameText}>{playerDetails?.userName}</Text></View>
                {!isOffline &&
                    <>
                        <View style={styles.coinContainer}><Image source={coin} style={styles.coin} /><Text style={styles.coinNumber}>{playerDetails?.coins}</Text></View>
                        <View style={[styles.emptyContainer, { marginTop: 0 }]}><Image source={coin} style={styles.coin} /><Text style={[styles.coinNumber, { color: "#FFF" }]}>{winningPlayer == 1 ? '+' : '-'}50</Text></View>
                    </>}



            </View>
            : <View style={styles.container}>
                {winningPlayer == 2 ? <View style={styles.winnerContainer}><Text style={[styles.coinNumber, { color: "#FFF", fontSize: 20 }]}>Winner</Text></View> : <View style={styles.emptyContainer} ><Text style={styles.coinNumber}></Text></View>}
                <View style={styles.internalContainer}><Image source={UserProfileImage(playerDetails ? playerDetails.profileImage : '')} style={styles.avatar} /><Text style={styles.usernameText}>{playerDetails?.userName}</Text></View>
                {!isOffline &&
                    <>
                        <View style={styles.coinContainer}><Image source={coin} style={styles.coin} /><Text style={styles.coinNumber}>{playerDetails?.coins}</Text></View>
                        <View style={[styles.emptyContainer, { marginTop: 0 }]}><Image source={coin} style={styles.coin} /><Text style={[styles.coinNumber, { color: "#FFF" }]}>{winningPlayer == 2 ? '+' : '-'}50</Text></View>
                    </>}
            </View>
    )
}

export default WinPlayerMatching

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginBottom: 5, marginHorizontal: 20, width: "30%", },
    internalContainer: { alignItems: 'center', backgroundColor: "#FFF", padding: 10, borderRadius: 10, width: "100%", height: 120 },

    coinContainer: { flexDirection: "row", justifyContent: "center", alignItems: 'center', backgroundColor: "#FFF", paddingVertical: 10, borderRadius: 25, width: "100%", height: 50, maxHeight: 50, marginTop: 20 },

    emptyContainer: { flexDirection: "row", justifyContent: "center", alignItems: 'center', paddingVertical: 10, borderRadius: 25, width: "100%", height: 50, maxHeight: 50, marginTop: 20 },

    winnerContainer: { flexDirection: "row", justifyContent: "center", alignItems: 'center', paddingVertical: 10, borderRadius: 25, width: "100%", height: 50, maxHeight: 50, marginTop: 20 },

    avatar: {
        flex: 1,
        resizeMode: "center",
        width: "100%",
        height: "100%"

    },
    coin: {
        // flex: 1,
        resizeMode: "center",
        // backgroundColor: "#000",
        height: 40,
        width: 40,



    },
    usernameText: {
        fontWeight: "bold"
    },
    coinNumber: {
        paddingRight: 10,
        fontWeight: 'bold'
    }
    // { flex: 1, alignSelf: "center", color: "#FFF", fontWeight: "bold" }
})
