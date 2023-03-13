import React, { useContext, useEffect, useState } from 'react'
import { Alert, ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native'
import BoardGame from '../components/BoardGame';
import BottomComponent from '../components/BottomComponent';
import ScreenOverlayComponent from '../components/ScreenOverlayComponent';
import TaskShowComponent from '../components/TaskShowComponent';
import { BASE_URL, Cols, EndPosition, flags, mines, noOfTasks, Rows, StartPosition } from '../Config';
import { LinearGradient } from 'expo-linear-gradient';
import LandscapeLogo from '../components/LandscapeLogo';
import { AuthContext } from '../context/AuthContext';
import bgImg from '../../assets/gameBackgroundImage.png'
import pawn1 from '../../assets/pawn1.png'
import pawn2 from '../../assets/pawn2.png'
import pawn3 from '../../assets/pawn3.png'
import pawn4 from '../../assets/pawn4.png'
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
// import firestore from '@react-native-firebase/firestore'
const Offline = ({ navigation, route }) => {

    const { roomName, player1Details, player2Details } = route.params;
    const [player1, setPlayer1] = useState(EndPosition)
    const [player2, setPlayer2] = useState(StartPosition)
    const [diceMove, setDiceMove] = useState(1)
    const [diceVal, setDiceVal] = useState(1)

    const pawns = [pawn1, pawn2, pawn3, pawn4];
    // const pawns = [pawn1, pawn3, pawn4, pawn6];
    const [player1Pawn, setPlayer1Pawn] = useState(pawn1);
    const [player2Pawn, setPlayer2Pawn] = useState(pawn4);

    const [gameEnded, setGameEnded] = useState(false);
    const [disableDice, setDisableDice] = useState(false)

    const [showTask, setShowTask] = useState(false)
    const [showTaskId, setShowTaskId] = useState(0)


    var firstTime = false;

    const { taskList, activePlayerId, setActivePlayerId, myPlayerId, setMyPlayerId, taskIndex, setTaskIndex, setTaskList } = useContext(AuthContext);

    const getTaskListFromBackend = async (rn) => {
        await axios.post(`${BASE_URL}/api/room/create`, {
            "taskNo": 20,
            // "hostUserId": (JSON.parse(userInfo).id),
            "hostUserId": "123456",
            "roomId": rn,
            "taskType": "offline"
        }).then((apiRes) => {
            console.log('res tasks create :: = > :: ', apiRes.data.message.tasks);
            if (apiRes.data.message.tasks) setTaskList(apiRes.data.message.tasks);
        }).catch(err => {
            console.log("Error :", err);
        })
    }
    useEffect(() => {
        getTaskListFromBackend(roomName);
    }, [])


    const playMove = async (moveVal, playerID) => {
        let tempArr = [];
        if (playerID == 1) tempArr = player1;
        else tempArr = player2;

        let c = moveVal;
        let initValj = -1;

        let resArr = [];

        for (let i = tempArr[0]; i >= 0 && c > 0; i--) {

            if (initValj == -1) initValj = tempArr[1];
            else initValj = -1;

            if (i % 2 == 0) {
                let j = initValj == -1 ? 0 : initValj;
                for (; j < Cols && c > 0; j++) {
                    c--;
                }
                if (c == 0) {
                    if (j < Cols)
                        resArr = [i, j];
                    // playerID == 1 ? setPlayer1([i, j]) : setPlayer2([i, j]);
                    else {

                        if (i <= 0 && j >= Cols - 1)
                            resArr = EndPosition
                        // playerID == 1 ? setPlayer1(EndPosition) : setPlayer2(EndPosition);

                        else
                            resArr = [i - 1, j - 1]
                        // playerID == 1 ? setPlayer1([i - 1, j - 1]) : setPlayer2([i - 1, j - 1]);

                    }

                }
            } else {
                let j = initValj == -1 ? Cols - 1 : initValj;

                for (; j >= 0 && c > 0; j--) {
                    c--;
                }

                if (c == 0) {
                    if (j >= 0)
                        resArr = [i, j]
                    // playerID == 1 ? setPlayer1([i, j]) : setPlayer2([i, j]);
                    else {
                        resArr = [i - 1, j + 1]
                        // playerID == 1 ? setPlayer1([i - 1, j + 1]) : setPlayer2([i - 1, j + 1]);
                    }

                }
            }



        }


        playerID == 1 ? setPlayer1(resArr) : setPlayer2(resArr);
        // setActivePlayerId((activePlayerId) % 2 + 1);
        // changePlayerId();
        console.log("Play move", playerID, resArr);






        firstTime = true;
    }





    const playBackMove = async (moveVal, playerID) => {
        console.log("back call");
        let tempArr = [];
        if (playerID == 1) tempArr = player1;
        else tempArr = player2;

        let c = moveVal;
        let initValj = -1;
        let resArr = [];
        // console.log(player1, player2)
        for (let i = tempArr[0]; i < Rows && c > 0; i++) {

            if (initValj == -1) initValj = tempArr[1];
            else initValj = -1;

            if (i % 2 == 1) {
                let j = initValj == -1 ? 0 : initValj;
                for (; j < Cols && c > 0; j++) {
                    c--;
                }
                if (c == 0) {
                    if (j < Cols)
                        resArr = [i, j]
                    // playerID == 1 ? setPlayer1([i, j]) : setPlayer2([i, j]);
                    else {
                        resArr = [i + 1, j - 1];
                        // playerID == 1 ? setPlayer1([i + 1, j - 1]) : setPlayer2([i + 1, j - 1]);

                    }

                }
            } else {
                let j = initValj == -1 ? Cols - 1 : initValj;

                for (; j >= 0 && c > 0; j--) {
                    c--;
                }

                if (c == 0) {
                    if (j >= 0)
                        resArr = [i, j];
                    // playerID == 1 ? setPlayer1([i, j]) : setPlayer2([i, j]);
                    else {
                        if (i >= Rows - 1 && j <= 0)
                            resArr = StartPosition;
                        // playerID == 1 ? setPlayer1(StartPosition) : setPlayer2(StartPosition);
                        else
                            resArr = [i + 1, j + 1]
                        // playerID == 1 ? setPlayer1([i + 1, j + 1]) : setPlayer2([i + 1, j + 1]);
                    }

                }
            }



        }



        // if (firstTime == true) {

        // setTimeout(() => {
        playerID == 1 ? setPlayer1(resArr) : setPlayer2(resArr);
        // setActivePlayerId((activePlayerId) % 2 + 1);
        // changePlayerId();
        console.log("Playback", playerID, resArr);





    }

    const changePlayerId = async (update = false, backUpdate = false) => {

        setDisableDice(false);
        setActivePlayerId((activePlayerId) % 2 + 1);


        setTaskIndex((taskIndex + 1) % noOfTasks)







    }

    const resetForReplay = () => {
        setPlayer1(StartPosition)
        setPlayer2(StartPosition)
        setGameEnded(false)

    }




    const hasUnsavedChanges = Boolean('');

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (e.data.action.type == "GO_BACK") {
                    // if (!hasUnsavedChanges) {
                    //     // If we don't have unsaved changes, then we don't need to do anything
                    //     return;
                    // }

                    // Prevent default behavior of leaving the screen
                    e.preventDefault();

                    // Prompt the user before leaving the screen
                    Alert.alert(
                        'Are you sure?',
                        'You will loose this match if you leave.',
                        [
                            { text: "Don't leave", style: 'cancel', onPress: () => { } },
                            {
                                text: 'Leave',
                                style: 'destructive',
                                // If the user confirmed, then we dispatch the action we blocked earlier
                                // This will continue the action that had triggered the removal of the screen
                                onPress: () =>
                                    navigation.dispatch(
                                        StackActions.replace
                                            ('Win', { winPlayer: (activePlayerId % 2) + 1, roomName: roomName, isOffline: true })
                                    )

                            },
                        ]
                    );
                }
            }),
        [navigation, hasUnsavedChanges]
    );


    return (
        <SafeAreaView style={styles.container}>
            {/* <LinearGradient colors={['#0073C5', '#9069FF']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.linearGradient}> */}
            <ImageBackground source={bgImg} resizeMode="cover" style={styles.image}>
                <LandscapeLogo />
                <BoardGame player1Details={player1Details} player2Details={player2Details} isOffline={true} navigation={navigation} roomName={roomName} setPlayer1Pawn={setPlayer1Pawn} setPlayer2Pawn={setPlayer2Pawn} player2Pawn={player2Pawn} pawns={pawns} player1Pawn={player1Pawn} diceVal={diceVal} setShowTask={setShowTask} setShowTaskId={setShowTaskId} setGameEnded={setGameEnded} changePlayerId={changePlayerId} activePlayerId={activePlayerId} setActivePlayerId={setActivePlayerId} player2={player2} setPlayer2={setPlayer2} player1={player1} setPlayer1={setPlayer1} playMove={playMove} playBackMove={playBackMove}></BoardGame>
                <BottomComponent isOffline={true} player1Details={player1Details} player2Details={player2Details} player2Pawn={player2Pawn} pawns={pawns} player1Pawn={player1Pawn} roomName={roomName} disableDice={disableDice} setDisableDice={setDisableDice} resetForReplay={resetForReplay} gameEnded={gameEnded} setGameEnded={setGameEnded} changePlayerId={changePlayerId} activePlayerId={activePlayerId} setActivePlayerId={setActivePlayerId} diceMove={diceMove} setDiceMove={setDiceMove} playMove={playMove} player1={player1} player2={player2}></BottomComponent>
                {showTask && <ScreenOverlayComponent />}
                {showTask && <TaskShowComponent task={taskList[showTaskId]} setShowTask={setShowTask}></TaskShowComponent>}
            </ImageBackground>
            {/* </LinearGradient> */}
        </SafeAreaView>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

        // backgroundColor: "#083D77"
    },

    image: {
        flex: 1,
        // justifyContent: 'center',
    },

    linearGradient: {
        flex: 1,

    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },

});

export default Offline