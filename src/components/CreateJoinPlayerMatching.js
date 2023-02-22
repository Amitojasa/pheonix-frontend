import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import boy from '../../assets/boy.png'
import girl from '../../assets/girl.png'
import coin from '../../assets/coin.png'

const CreateJoinPlayerMatching = ({ playerId }) => {
    // console.log("aaa" + playerId);
    return (
        playerId == 1 ?
            <View style={styles.container}>
                <View style={styles.internalContainer}><Image source={boy} style={styles.avatar} /><Text style={styles.usernameText}>Player 1</Text></View>
                <View style={styles.coinContainer}><Image source={coin} style={styles.coin} /><Text style={styles.coinNumber}>1000</Text></View>
            </View>
            : <View style={styles.container}>
                <View style={styles.internalContainer}><Image source={girl} style={styles.avatar} /><Text style={styles.usernameText}>Player 2</Text></View>
                <View style={styles.coinContainer}><Image source={coin} style={styles.coin} /><Text style={styles.coinNumber}>1000</Text></View>
            </View>
    )
}

export default CreateJoinPlayerMatching

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginBottom: 5, marginHorizontal: 20, width: "30%", },
    internalContainer: { alignItems: 'center', backgroundColor: "#FFF", padding: 10, borderRadius: 10, width: "100%", height: 120 },
    coinContainer: { flexDirection: "row", justifyContent: "center", alignItems: 'center', backgroundColor: "#FFF", paddingVertical: 10, borderRadius: 25, width: "100%", height: 50, maxHeight: 50, marginTop: 20 },

    avatar: {
        flex: 1,
        resizeMode: "center"

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
