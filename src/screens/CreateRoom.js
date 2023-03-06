import React, { useContext, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    doc,
    setDoc,
    getDoc
} from 'firebase/firestore';
import { database } from '../configs/firebase';
import { BASE_URL, StartPosition } from '../Config';
import { AuthContext } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import LandscapeLogo from '../components/LandscapeLogo';
import CreateJoinPlayerMatching from '../components/CreateJoinPlayerMatching';
import axios from 'axios';



function CreateRoom({ navigation, route, }) {


    const { setTaskList, myPlayerId, userData, setMyPlayerId, activePlayerId, playBackSteps, setPlayBackSteps, taskIndex } = useContext(AuthContext);

    const [player2Details, setPlayer2Details] = useState()
    const [roomName, setRoomName] = useState()
    var f = 1;

    async function handleButtonPress() {
        var n = await Math.floor(100000 + Math.random() * 900000).toString()
        // console.log(n);
        if (n.length > 0) {
            // create new thread using firebase & firestore

            const docRef = await doc(database, "rooms", n);
            const d = await (await getDoc(docRef)).data()
            if (d != undefined) {

                handleButtonPress();
                return;
            }
            await setDoc(doc(database, 'rooms', n), { // TODO:change this

                name: n,
                latestMessage: {
                    text: `${n} created. Welcome!`,
                    // createdAt: new Date().getTime()
                },
                GameInfo: {
                    player1Id: userData._id,
                    player2Id: -1,
                    player1Points: StartPosition,
                    player2Points: StartPosition,


                },
                player1Details: { userName: userData.name },
                player2Details: {},
                diceMove: 1,
                activePlayerId: activePlayerId,
                taskIndex: 0,
                playBackSteps: 2
            }).then(async () => {

                // send an api request to backend to store room info:

                setMyPlayerId(1);

                setRoomName(n);
                // console.log(JSON.parse(userInfo).id);
                await getTaskListFromBackend(n);



            })
        }
    }


    useEffect(() => {
        // console.log("yess", roomName);
        if (roomName) {
            // console.log("inside");
            const ref = doc(database, 'rooms', roomName)
            const unsubscribe = onSnapshot(ref, (snapshot) => {

                if (snapshot && !snapshot.metadata.hasPendingWrites) {

                    // console.log(snapshot.metadata.hasPendingWrites);
                    if (snapshot.data().GameInfo.player2Id != -1) {

                        setPlayer2Details({ userName: snapshot.data().player2Details.userName })// TODO: 
                        setTimeout(() => {
                            navigation.navigate('Game', { roomName: roomName }) //TODO:
                        }, 3000);
                    }
                }

                // console.log(snapshot.data().latestMessage.text)
            })

            return () => unsubscribe();
        }
    }, [roomName]);



    const getTaskListFromBackend = async (rn) => {
        await axios.post(`${BASE_URL}/api/room/create`, {
            "taskNo": 20,
            // "hostUserId": (JSON.parse(userInfo).id),
            "hostUserId": "123456",
            "roomId": rn,
            "taskType": "online"
        }).then((apiRes) => {
            console.log('res tasks create :: = > :: ', apiRes.data.message.tasks);
            if (apiRes.data.message.tasks) setTaskList(apiRes.data.message.tasks);
        }).catch(err => {
            console.log("Error :", err);
        })
    }
    useEffect(() => {
        handleButtonPress()
    }, [])


    return (
        <View style={{ flex: 1 }}>
            <LinearGradient colors={['#FFFF', '#DB4A39']} locations={[0.5, 0.9]} start={{ x: 1, y: 0 }} end={{ x: 0.2, y: 0.9 }} style={styles.linearGradient}>

                <View style={{ height: "60%" }}>
                    <LinearGradient colors={['#0073C5', '#9069FF']} style={[styles.linearGradient, {
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        elevation: 20
                    }]}>

                        <LandscapeLogo></LandscapeLogo>


                        <View style={styles.gameplayersDiv}>
                            <CreateJoinPlayerMatching playerId={1} playerDetails={{ userName: userData.name }} />
                            <Text style={{ fontWeight: 'bold', color: "#FFF", marginBottom: 60, }}>VS</Text>
                            <CreateJoinPlayerMatching playerId={2} playerDetails={player2Details} />
                        </View>

                    </LinearGradient>
                </View>
                <View style={{ marginTop: 50 }}>

                    <View style={styles.roomIdText}><Text style={styles.roomIdTextVal}>Room Id:</Text></View>
                    <View style={styles.roomIdValContainer}><Text style={styles.roomIdVal}>{roomName}</Text></View>
                    {/* <Button onPress={handleButtonPress} title="create"></Button> */}
                </View>
            </LinearGradient>
        </View>
    )
}

export default CreateRoom

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