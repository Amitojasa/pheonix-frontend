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


const JoinRoom = ({ navigation, route }) => {
    const [roomName, setRoomName] = useState('')
    const { myPlayerId, setTaskList, taskList, setMyPlayerId, userData } = useContext(AuthContext);
    console.log(userData);
    const [player1Details, setPlayer1Details] = useState()

    const handleJoinRoom = async () => {
        console.log(roomName);
        if (true) {


            var d = await getDoc(await doc(database, 'rooms', roomName))


            if (d.data()) {

                await updateDoc(doc(database, 'rooms', roomName), {


                    GameInfo: {
                        player1Id: d.data().GameInfo.player1Id,
                        player2Id: 2,
                        player1Points: d.data().GameInfo.player1Points,
                        player2Points: d.data().GameInfo.player2Points,

                    },


                }).then(async (data) => {
                    setMyPlayerId(2);
                    setPlayer1Details({ name: "amitoj" })

                    await getTaskListFromAPI()

                    navigation.navigate('Game', { data: d.data(), roomName: roomName })
                })



            } else {
                Alert.alert("Sorry, Wrong Room ID.")
            }
            // console.log(snapshot.data().latestMessage.text)

        }
    }


    const getTaskListFromAPI = async () => {


        await axios.get(`${BASE_URL}/api/room/${roomName}`).then((apiRes) => {
            console.log('res join tasks :: = > :: ', JSON.parse(apiRes.request._response).message[0].tasks);
            JSON.parse(apiRes.request._response).message[0].tasks && setTaskList(JSON.parse(apiRes.request._response).message[0].tasks);
        }).catch(err => {
            console.log("Error :", err);
        })
    }

    return (
        <View style={{ flex: 1 }}>
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
                            <CreateJoinPlayerMatching playerId={2} playerDetails={userData} />
                        </View>

                    </LinearGradient>
                </View>
                <View style={{ marginTop: 20 }}>

                    <View style={styles.roomIdText}><Text style={styles.roomIdTextVal}>Room Id:</Text></View>
                    <View style={styles.roomIdValContainer}><TextInput style={styles.roomIdTextEditVal} placeholder="Enter Room Id" value={roomName} onChangeText={setRoomName}></TextInput></View>
                    <TouchableOpacity onPress={() => handleJoinRoom()} style={styles.roomIdValContainer}><Text style={styles.roomIdVal}>Join Room</Text></TouchableOpacity>
                    {/* <Button onPress={handleButtonPress} title="create"></Button> */}
                </View>
            </LinearGradient>
        </View>
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