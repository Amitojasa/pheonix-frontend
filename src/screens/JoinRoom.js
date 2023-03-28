import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
import { StackActions } from '@react-navigation/native';
import { getString } from '../language/Strings';
import { SafeAreaView } from 'react-native-safe-area-context';
import InternetAlert from '../components/InternetAlert';


const JoinRoom = ({ navigation, route }) => {
    const [roomName, setRoomName] = useState('')
    const { isConnected, checkConnection, language, myPlayerId, setTaskList, taskList, setMyPlayerId, userData, setBigTask, bigTask, socket } = useContext(AuthContext);
    var underProgress = 0;
    const [player1Details, setPlayer1Details] = useState()

    const handleJoinRoom = async () => {
        console.log(roomName);
        if (true) {


            var d = await getDoc(await doc(database, 'rooms', roomName))


            if (d.data()) {
                // console.log(d.data());
                await updateDoc(doc(database, 'rooms', roomName), {


                    GameInfo: {
                        player1Id: d.data().GameInfo.player1Id,
                        player2Id: userData.id,
                        player1Points: d.data().GameInfo.player1Points,
                        player2Points: d.data().GameInfo.player2Points,

                    },

                    player2Details: { userName: userData.userName, profileImage: userData.profileImage, coins: userData.coins, id: userData.id },

                }).then(async (data) => {
                    setMyPlayerId(2);
                    setPlayer1Details({ userName: d.data().player1Details.userName, coins: d.data().player1Details.coins, profileImage: d.data().player1Details.profileImage })

                    await getTaskListFromAPI()
                    setTimeout(() => {
                        navigation.dispatch(
                            StackActions.replace('Game', { data: d.data(), roomName: roomName, player1Details: { userName: d.data().player1Details.userName, coins: d.data().player1Details.coins, profileImage: d.data().player1Details.profileImage, id: d.data().player1Details.id }, player2Details: { userName: userData.userName, profileImage: userData.profileImage, coins: userData.coins, id: userData.id } }))
                    }, 2000);

                })



            } else {
                Alert.alert(getString('wrongRoomId', language))
            }
            // console.log(snapshot.data().latestmessage..text)

        }
    }

    // const handleJoinRoom = async () => {
    //     if (underProgress == 0) {
    //         underProgress = 1;
    //         socket.emit("join_room", {

    //             name: roomName,
    //             GameInfo: {
    //                 player2Id: userData.id,
    //             },

    //             player2Details: { userName: userData.userName, profileImage: userData.profileImage, coins: userData.coins, id: userData.id },

    //         }, (async (data) => {
    //             console.log(data);
    //             if (data.status == true && data.message == "Room full (2 players already exist)...") {
    //                 Alert.alert(data.message);
    //             } else if (data.status) {
    //                 data = data.data;

    //                 setMyPlayerId(2);
    //                 setPlayer1Details({ userName: data.player1Details.userName, coins: data.player1Details.coins, profileImage: data.player1Details.profileImage })
    //                 await getTaskListFromAPI()
    //                 console.log(data.player1Details);
    //                 setTimeout(() => {
    //                     navigation.dispatch(
    //                         StackActions.replace('Game', { data: data, roomName: roomName, player1Details: { userName: data.player1Details.userName, coins: data.player1Details.coins, profileImage: data.player1Details.profileImage, id: data.player1Details.id }, player2Details: { userName: userData.userName, profileImage: userData.profileImage, coins: userData.coins, id: userData.id } }))
    //                 }, 2000);
    //             } else {
    //                 Alert.alert(data.message)
    //             }

    //         }));
    //         underProgress = 0;
    //     }

    // }







    const getTaskListFromAPI = async () => {


        await axios.get(`${BASE_URL}/api/room/${roomName}`).then((apiRes) => {
            // console.log('res join tasks :: = > :: ', JSON.stringify(JSON.parse(apiRes.request._response).message));
            console.log(apiRes);




            if (language == 'en') {

                JSON.parse(apiRes.request._response).message.enTasks.tasks && JSON.parse(apiRes.request._response).message.enTasks.tasks.length > 0 && setTaskList(JSON.parse(apiRes.request._response).message.enTasks.tasks);
                JSON.parse(apiRes.request._response).message.enTasks.bigTasks && JSON.parse(apiRes.request._response).message.enTasks.bigTasks.length > 0 && setBigTask(JSON.parse(apiRes.request._response).message.enTasks.bigTasks[0]);
            } else {
                JSON.parse(apiRes.request._response).message.frTasks.tasks && JSON.parse(apiRes.request._response).message.frTasks.tasks.length > 0 && setTaskList(JSON.parse(apiRes.request._response).message.frTasks.tasks);
                JSON.parse(apiRes.request._response).message.frTasks.bigTasks && JSON.parse(apiRes.request._response).message.frTasks.bigTasks.length > 0 && setBigTask(JSON.parse(apiRes.request._response).message.frTasks.bigTasks[0]);
            }

        }).catch(err => {
            console.log("Error :", err);
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <InternetAlert checkConnection={checkConnection} language={language} isConnected={isConnected} />

            <LinearGradient colors={['#FFFF', '#DB4A39']} locations={[0.5, 0.9]} start={{ x: 1, y: 0 }} end={{ x: 0.2, y: 0.9 }} style={styles.linearGradient}>

                <View style={{ height: "55%" }}>
                    <LinearGradient colors={['#0073C5', '#9069FF']} style={[styles.linearGradient, {
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        elevation: 20
                    }]}>

                        <LandscapeLogo></LandscapeLogo>


                        <View style={styles.gameplayersDiv}>
                            <CreateJoinPlayerMatching playerId={1} playerDetails={player1Details} />
                            <Text style={{ fontWeight: 'bold', color: "#FFF", marginBottom: 60, }}>VS</Text>
                            <CreateJoinPlayerMatching playerId={2} playerDetails={{ userName: userData.userName, profileImage: userData.profileImage, coins: userData.coins }} />
                        </View>

                    </LinearGradient>
                </View>
                <View style={{ marginTop: 20 }}>

                    <View style={styles.roomIdText}><Text style={styles.roomIdTextVal}>{getString('roomId', language)}</Text></View>
                    <View style={styles.roomIdValContainer}><TextInput style={styles.roomIdTextEditVal} placeholder={getString('enterRoomId', language)} value={roomName} onChangeText={setRoomName}></TextInput></View>
                    <TouchableOpacity onPress={() => handleJoinRoom()} style={styles.roomIdValContainer}><Text style={styles.roomIdVal}>{getString('joinRoom', language)}</Text></TouchableOpacity>
                    {/* <Button onPress={handleButtonPress} title="create"></Button> */}
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default JoinRoom

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
    roomIdText: { flexDirection: "row", justifyContent: "center", slefAlign: "center", marginLeft: "auto", marginRight: "auto", alignItems: 'center', backgroundColor: "#FFF", paddingVertical: 10, borderRadius: 25, width: "30%", height: 50, maxHeight: 50, marginVertical: 20, marginTop: 40, elevation: 20 },

    roomIdValContainer: { flexDirection: "row", justifyContent: "center", slefAlign: "center", marginLeft: "auto", marginRight: "auto", alignItems: 'center', backgroundColor: "#FFF", paddingVertical: 10, borderRadius: 15, elevation: 20, width: "70%", height: 50, maxHeight: 50, marginVertical: 20 },

    roomIdTextVal: {
        fontWeight: "bold",
        color: "#D50000",
        fontSize: 18
    },
    roomIdTextEditVal: {
        fontWeight: "bold",
        color: "grey",
        fontSize: 16,
        textAlign: "center",
        flex: 1

    },
    roomIdVal: {
        fontWeight: "bold",
        color: "#0048D5",
        fontSize: 18
    }

})