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
import { BASE_URL, StartPosition } from '../Config';
import { AuthContext } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import LandscapeLogo from '../components/LandscapeLogo';
import CreateJoinPlayerMatching from '../components/CreateJoinPlayerMatching';
import axios from 'axios';
import WinPlayerMatching from '../components/WinPlayerMatching';
import { getString } from '../language/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import InternetAlert from '../components/InternetAlert';


function Win({ navigation, route, }) {




    const { database, isConnected, checkConnection, language, bigTask, setTaskList, myPlayerId, userInfo, setMyPlayerId, activePlayerId, playBackSteps, setPlayBackSteps, taskIndex } = useContext(AuthContext);
    const { winPlayer, player1Id, player2Id, roomName, isOffline = false, pl1D, pl2D } = route.params;
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
        // interstitial.show();
        if (!isOffline) {
            updateWinning();
        } else {
            setplayer1Details(pl1D)
            setplayer2Details(pl2D)
        }

    }, [])





    return (
        <SafeAreaView style={{ flex: 1 }}>
            <InternetAlert checkConnection={checkConnection} language={language} isConnected={isConnected} />

            <LinearGradient colors={['#FFFF', '#DB4A39']} locations={[0.5, 0.9]} start={{ x: 1, y: 0 }} end={{ x: 0.2, y: 0.9 }} style={styles.linearGradient}>

                <View style={{ height: !isOffline ? "60%" : "55%" }}>
                    <LinearGradient colors={['#0073C5', '#9069FF']} style={[styles.linearGradient, {
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        elevation: 20
                    }]}>

                        <LandscapeLogo></LandscapeLogo>


                        <View style={[styles.gameplayersDiv, isOffline && { marginBottom: "20%" }]}>
                            <WinPlayerMatching language={language} playerId={1} winningPlayer={winPlayer} playerDetails={player1Details} isOffline={isOffline} />
                            <Text style={[{ fontWeight: 'bold', color: "#FFF" }, isOffline && { justifyContent: "center", marginTop: "15%" }]}>VS</Text>
                            <WinPlayerMatching language={language} playerId={2} winningPlayer={winPlayer} playerDetails={player2Details} isOffline={isOffline} />
                        </View>

                    </LinearGradient>
                </View>



                <View style={{ backgroundColor: "#FFF", borderRadius: 15, marginHorizontal: "5%", padding: "5%", marginVertical: isOffline ? "20%" : "10%", elevation: 10 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>{getString('performThisTask', language)}</Text>
                    <Text style={{ fontSize: 16, marginTop: "5%", textAlign: "justify" }}>{bigTask.taskDesc}</Text>
                </View>
                <TouchableOpacity onPress={() => {

                    navigation.navigate("Home")

                }} style={[{
                    padding
                        : 10, backgroundColor: "#FFF", borderRadius: 10, justifyContent: "center", alignItems: "center", marginHorizontal: "20%", elevation: 10,
                },]}><Text style={{
                    color: "#DB4A39", fontWeight
                        : "bold", fontSize: 20
                }}>{getString('goToHome', language)}</Text></TouchableOpacity>

            </LinearGradient >
        </SafeAreaView >
    )
}

export default Win

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    gameplayersDiv: {
        // marginTop: 10,
        // flex: 1,
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