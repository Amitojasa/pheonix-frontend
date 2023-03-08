import React, { useContext, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    doc,
    setDoc,
    getDoc,
    updateDoc
} from 'firebase/firestore';
import { database } from '../configs/firebase';
import { BASE_URL, StartPosition } from '../Config';
import { AuthContext } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import LandscapeLogo from '../components/LandscapeLogo';
import CreateJoinPlayerMatching from '../components/CreateJoinPlayerMatching';
import axios from 'axios';
import WinPlayerMatching from '../components/WinPlayerMatching';



function Win({ navigation, route, }) {


    const { setTaskList, myPlayerId, userInfo, setMyPlayerId, activePlayerId, playBackSteps, setPlayBackSteps, taskIndex } = useContext(AuthContext);
    const { winPlayer, player1Id, player2Id, roomName } = route.params;
    // const winPlayer = 1;
    // const [roomName, setRoomName] = useState()
    var f = 1;

    const [player1Details, setplayer1Details] = useState()
    const [player2Details, setplayer2Details] = useState()

    const updateWinning = async () => {
        // console.log(roomName);

        const docRef = await doc(database, "rooms", roomName);
        const d = await (await getDoc(docRef)).data();
        setplayer1Details(d.player1Details)
        setplayer2Details(d.player2Details)
        if (d.winningUpdate == false) {
            await updateDoc(doc(database, 'rooms', roomName), {

                winningUpdate: true,
                winningPlayer: winPlayer

            }).then(async (data) => {
                //call api
                const d = await (await getDoc(docRef)).data();
                const coinsData1 = {
                    "userId": winPlayer == 1 ? d.GameInfo.player1Id : d.GameInfo.player2Id,
                    "userCoins": 50,
                    "operation": "add"
                }
                console.log("con data:", coinsData1);
                await axios.post(`${BASE_URL}/api/changeUserCoins`, coinsData1).then().catch(err => {
                    console.log(err);
                })

                // const d = await (await getDoc(docRef)).data();
                const coinsData2 = {
                    "userId": !(winPlayer == 1) ? d.GameInfo.player1Id : d.GameInfo.player2Id,
                    "userCoins": 50,
                    "operation": "sub"
                }
                console.log("con data:", coinsData2);
                await axios.post(`${BASE_URL}/api/changeUserCoins`, coinsData2).then().catch(err => {
                    console.log(err);
                })


            })
        }

    }

    useEffect(() => {
        updateWinning();
    }, [])





    return (
        <View style={{ flex: 1 }}>
            <LinearGradient colors={['#FFFF', '#DB4A39']} locations={[0.5, 0.9]} start={{ x: 1, y: 0 }} end={{ x: 0.2, y: 0.9 }} style={styles.linearGradient}>

                <View style={{ height: "65%" }}>
                    <LinearGradient colors={['#0073C5', '#9069FF']} style={[styles.linearGradient, {
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        elevation: 20
                    }]}>

                        <LandscapeLogo></LandscapeLogo>


                        <View style={styles.gameplayersDiv}>
                            <WinPlayerMatching playerId={1} winningPlayer={winPlayer} playerDetails={player1Details} />
                            <Text style={{ fontWeight: 'bold', color: "#FFF", marginBottom: 60, }}>VS</Text>
                            <WinPlayerMatching playerId={2} winningPlayer={winPlayer} playerDetails={player2Details} />
                        </View>

                    </LinearGradient>
                </View>

                <TouchableOpacity onPress={() => { navigation.navigate("Home") }} style={{
                    padding
                        : 10, backgroundColor: "#FFF", borderRadius: 10, justifyContent: "center", alignItems: "center", margin: "20%", elevation: 10
                }}><Text style={{
                    color: "#DB4A39", fontWeight
                        : "bold", fontSize: 20
                }}>Go To Home</Text></TouchableOpacity>

            </LinearGradient>
        </View>
    )
}

export default Win

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    gameplayersDiv: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    roomIdText: { flexDirection: "row", justifyContent: "center", slefAlign: "center", marginLeft: "auto", marginRight: "auto", alignItems: 'center', backgroundColor: "#FFF", paddingVertical: 10, borderRadius: 25, width: "30%", height: 50, maxHeight: 50, marginVertical: 20, elevation: 10 },

    roomIdValContainer: { flexDirection: "row", justifyContent: "center", slefAlign: "center", marginLeft: "auto", marginRight: "auto", alignItems: 'center', backgroundColor: "#FFF", paddingVertical: 10, borderRadius: 15, elevation: 20, width: "70%", height: 50, maxHeight: 50, marginVertical: 20 },

    roomIdTextVal: {
        fontWeight: "bold",
        color: "#D50000",
        fontSize: 18
    },
    roomIdVal: {
        fontWeight: "bold",
        color: "#0048D5",
        fontSize: 18
    }

})