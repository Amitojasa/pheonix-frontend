import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
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

import { BASE_URL, EndPosition, StartPosition } from '../Config';
import { AuthContext } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import LandscapeLogo from '../components/LandscapeLogo';
import CreateJoinPlayerMatching from '../components/CreateJoinPlayerMatching';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';
import { getString } from '../language/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import InternetAlert from '../components/InternetAlert';



function CreateRoom({ navigation, route, }) {


    const { isConnected, checkConnection, language, setTaskList, myPlayerId, userData, setMyPlayerId, activePlayerId, playBackSteps, setPlayBackSteps, taskIndex, bigTask, setBigTask, socket, database, setTotalTasks, totalTasks } = useContext(AuthContext);

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
                    player1Id: userData.id,
                    player2Id: -1,
                    player1Points: StartPosition,
                    player2Points: StartPosition,


                },
                player1Details: { userName: userData.userName, profileImage: userData.profileImage, coins: userData.coins, id: userData.id },
                player2Details: {},
                diceMove: 1,
                activePlayerId: activePlayerId,
                taskIndex: 0,
                playBackSteps: 2,
                winningUpdate: false
            }).then(async () => {

                // send an api request to backend to store room info:

                setMyPlayerId(1);

                setRoomName(n);
                // console.log(JSON.parse(userInfo).id);
                await getTaskListFromBackend(n);



            })
        }
    }


    // async function handleButtonPress() {
    //     var n = await Math.floor(100000 + Math.random() * 900000).toString()
    //     if (n.length > 0) {


    //         console.log("creating room");
    //         await socket.emit("create_room", {

    //             name: n,

    //             GameInfo: {
    //                 player1Id: userData.id,
    //                 player2Id: null,
    //                 player1Points: StartPosition,
    //                 player2Points: StartPosition,


    //             },
    //             player1Details: { userName: userData.userName, profileImage: userData.profileImage, coins: userData.coins, id: userData.id },
    //             player2Details: null,
    //             diceMove: 1,
    //             activePlayerId: activePlayerId,
    //             taskIndex: 0,
    //             playBackSteps: 2,
    //             winningUpdate: false
    //         }, async (d) => {

    //             console.log(d);

    //             if (d.status && d.message == "Room already exists...") {
    //                 handleButtonPress();
    //                 return;
    //             } else if (!d.status) {
    //                 Alert.alert(d.message)
    //             }


    //             setMyPlayerId(1);

    //             setRoomName(n);
    //             // console.log(JSON.parse(userInfo).id);
    //             await getTaskListFromBackend(n);
    //         })





    //         // })
    //     }
    // }


    useEffect(() => {
        console.log("yess", roomName);
        if (roomName) {
            // console.log("inside");
            const ref = doc(database, 'rooms', roomName)
            const unsubscribe = onSnapshot(ref, (snapshot) => {

                if (snapshot && !snapshot.metadata.hasPendingWrites) {

                    // console.log(snapshot.metadata.hasPendingWrites);
                    if (snapshot.data().GameInfo.player2Id != -1) {

                        setPlayer2Details({ userName: snapshot.data().player2Details.userName, coins: snapshot.data().player2Details.coins, profileImage: snapshot.data().player2Details.profileImage })// TODO: 
                        setTimeout(() => {
                            navigation.dispatch(
                                StackActions.replace('Game', { roomName: roomName, player2Details: { userName: snapshot.data().player2Details.userName, coins: snapshot.data().player2Details.coins, profileImage: snapshot.data().player2Details.profileImage, id: snapshot.data().player2Details.id }, player1Details: { userName: userData.userName, profileImage: userData.profileImage, coins: userData.coins, id: userData.id } })) //TODO:
                        }, 3000);
                    }
                }

                // console.log(snapshot.data().latestMessage.text)
            })

            return () => unsubscribe();
        }

    }, [roomName]);

    // useEffect(() => {

    //     socket.on('game_start', (data) => {

    //         if (data.status == true && data.message == "Room updated...") {
    //             let d = data.data;
    //             if (d.GameInfo.player2Id != null) {

    //                 setPlayer2Details({ userName: d.player2Details.userName, coins: d.player2Details.coins, profileImage: d.player2Details.profileImage })// TODO: 
    //                 setTimeout(() => {
    //                     navigation.dispatch(
    //                         StackActions.replace('Game', { roomName: roomName, player2Details: { userName: d.player2Details.userName, coins: d.player2Details.coins, profileImage: d.player2Details.profileImage, id: d.player2Details.id }, player1Details: { userName: userData.userName, profileImage: userData.profileImage, coins: userData.coins, id: userData.id } })) //TODO:
    //                 }, 3000);
    //             }
    //         }

    //     });

    //     // return () => {
    //     //     socket.disconnect();
    //     // };
    // }, [socket]);




    const getTaskListFromBackend = async (rn) => {
        await axios.post(`${BASE_URL}/api/room/create`, {
            "taskNo": 40,
            "bigTaskNo": 1,
            // "lang": language,
            // "hostUserId": (JSON.parse(userInfo).id),
            "hostUserId": userData.id,
            "roomId": rn,
            "taskType": "offline",
            "bigTaskType": "offline"
            // "isSmallTask": true,
        }).then((apiRes) => {

            if (language == 'en') {
                console.log('res tasks create en :: = > :: ', apiRes.data.message.enTasks);
                if (apiRes.data.message.enTasks.tasks && apiRes.data.message.enTasks.tasks.length > 0) { setTaskList(apiRes.data.message.enTasks.tasks); setTotalTasks(apiRes.data.message.enTasks.tasks.length) }
                if (apiRes.data.message.enTasks.bigTasks && apiRes.data.message.enTasks.bigTasks.length > 0) setBigTask(apiRes.data.message.enTasks.bigTasks[0]);
            } else {
                console.log('res tasks create fr :: = > :: ', apiRes.data.message.frTasks);
                if (apiRes.data.message.frTasks.tasks && apiRes.data.message.frTasks.tasks.length > 0) { setTaskList(apiRes.data.message.frTasks.tasks); setTotalTasks(apiRes.data.message.frTasks.tasks.length) }
                if (apiRes.data.message.frTasks.bigTasks && apiRes.data.message.frTasks.bigTasks.length > 0) setBigTask(apiRes.data.message.frTasks.bigTasks[0]);
            }
            // if (apiRes.data.message.bigTask) setBigTask(apiRes.data.message.bigTasks[0]);

        }).catch(err => {
            console.log("Error :", err);
        })
    }
    useEffect(() => {
        handleButtonPress()
    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <InternetAlert checkConnection={checkConnection} language={language} isConnected={isConnected} />

            <LinearGradient colors={['#FFFF', '#DB4A39']} locations={[0.5, 0.9]} start={{ x: 1, y: 0 }} end={{ x: 0.2, y: 0.9 }} style={styles.linearGradient}>

                <View style={{ height: "60%" }}>
                    <LinearGradient colors={['#0073C5', '#9069FF']} style={[styles.linearGradient, {
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        elevation: 20
                    }]}>

                        <LandscapeLogo></LandscapeLogo>


                        <View style={styles.gameplayersDiv}>
                            <CreateJoinPlayerMatching playerId={1} playerDetails={{ userName: userData.userName, profileImage: userData.profileImage, coins: userData.coins }} />
                            <Text style={{ fontWeight: 'bold', color: "#FFF", marginBottom: 60, }}>VS</Text>
                            <CreateJoinPlayerMatching playerId={2} playerDetails={player2Details} />
                        </View>

                    </LinearGradient>
                </View>
                <View style={{ marginTop: 50 }}>

                    <View style={styles.roomIdText}><Text style={styles.roomIdTextVal}>{getString('roomId', language)}</Text></View>
                    <View style={styles.roomIdValContainer}><Text style={styles.roomIdVal}>{roomName}</Text></View>
                    {/* <Button onPress={handleButtonPress} title="create"></Button> */}
                </View>
            </LinearGradient>
        </SafeAreaView>
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