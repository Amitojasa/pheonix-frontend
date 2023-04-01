import React, { useContext, useEffect, useState } from 'react'
import { Alert, ImageBackground, StyleSheet, View } from 'react-native'
import BoardGame from '../components/BoardGame';
import BottomComponent from '../components/BottomComponent';
import ScreenOverlayComponent from '../components/ScreenOverlayComponent';
import TaskShowComponent from '../components/TaskShowComponent';
import { BASE_URL, Cols, EndPosition, totalTasks, Rows, StartPosition } from '../Config';
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
import { SafeAreaView } from 'react-native-safe-area-context'
import InternetAlert from '../components/InternetAlert';

// import firestore from '@react-native-firebase/firestore'
const Offline = ({ navigation, route }) => {

    const { roomName, player1Details, player2Details } = route.params;
    const [player1, setPlayer1] = useState(StartPosition)
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

    const { taskList, userData, activePlayerId, setActivePlayerId, myPlayerId, setMyPlayerId, taskIndex, setTaskIndex, setTaskList, setBigTask, bigTask, language, isConnected, checkConnection, totalTasks, setTotalTasks } = useContext(AuthContext);

    const getTaskListFromBackend = async (rn) => {

        await axios.post(`${BASE_URL}/api/room/create`, {
            "taskNo": 25,
            // "hostUserId": (JSON.parse(userInfo).id),
            // TODO: check host id 
            "hostUserId": userData.id,
            "roomId": rn,
            "taskType": "offline",
            "bigTaskNo": 1,
            "bigTaskType": "offline",
        }).then((apiRes) => {
            console.log('res tasks create :: = > :: ', apiRes.data.message);

            if (language == 'en') {
                console.log('res tasks create en :: = > :: ', apiRes.data.message.enTasks);
                if (apiRes.data.message.enTasks.tasks && apiRes.data.message.enTasks.tasks.length > 0) { setTaskList(apiRes.data.message.enTasks.tasks); setTotalTasks(apiRes.data.message.enTasks.tasks.length) }
                if (apiRes.data.message.enTasks.bigTasks && apiRes.data.message.enTasks.bigTasks.length > 0) setBigTask(apiRes.data.message.enTasks.bigTasks[0]);
            } else {
                console.log('res tasks create fr :: = > :: ', apiRes.data.message.frTasks);
                if (apiRes.data.message.frTasks.tasks && apiRes.data.message.frTasks.tasks.length > 0) { setTaskList(apiRes.data.message.frTasks.tasks); setTotalTasks(apiRes.data.message.frTasks.tasks.length) }
                if (apiRes.data.message.frTasks.bigTasks && apiRes.data.message.frTasks.bigTasks.length > 0) setBigTask(apiRes.data.message.frTasks.bigTasks[0]);
            }

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


    const goBackByOne = (moveVal, playerID) => {
        console.log("goback call");
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

        return resArr;

    }

    const checkMine = (resArr, mines) => {
        console.log("mine check");
        for (let i = 0; i < 6; i++) {
            if (resArr[0] == mines[i][0] && resArr[1] == mines[i][1]) {

                return true;
            }
        }

        return false;
    }



    const playBackMove = async (moveVal, playerID, mines) => {
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



        if (checkMine(resArr, mines) == true) {
            resArr = goBackByOne(moveVal - 1, playerID);
        }

        // if (firstTime == true) {

        // setTimeout(() => {
        playerID == 1 ? setPlayer1(resArr) : setPlayer2(resArr);
        // setActivePlayerId((activePlayerId) % 2 + 1);
        // changePlayerId();
        console.log("Playback", playerID, resArr);





    }

    const changePlayerId = (update = false, backUpdate = false) => {

        // setDisableDice(false);
        setActivePlayerId((activePlayerId) % 2 + 1);


        setTaskIndex((taskIndex + 1) % totalTasks)

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
                    language == 'en' ? Alert.alert(
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
                                            ('Win', { winPlayer: (activePlayerId % 2) + 1, roomName: roomName, isOffline: true, pl1D: player1Details, pl2D: player2Details, })
                                    )

                            },
                        ]
                    ) :
                        Alert.alert(
                            'Es-tu sûr?',
                            'Vous perdrez ce match si vous partez.',
                            [
                                {
                                    text: "Ne pars pas", style: 'cancel', onPress: () => { }
                                },
                                {
                                    text: 'Partir',
                                    style: 'destructive',
                                    // If the user confirmed, then we dispatch the action we blocked earlier
                                    // This will continue the action that had triggered the removal of the screen
                                    onPress: () =>
                                        navigation.dispatch(
                                            StackActions.replace
                                                ('Win', { winPlayer: (activePlayerId % 2) + 1, roomName: roomName, isOffline: true, pl1D: player1Details, pl2D: player2Details, })
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
            <InternetAlert checkConnection={checkConnection} language={language} isConnected={isConnected} />

            {/* <LinearGradient colors={['#0073C5', '#9069FF']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.linearGradient}> */}
            <ImageBackground source={bgImg} resizeMode="cover" style={styles.image}>
                <LandscapeLogo />
                <BoardGame player1Details={player1Details} player2Details={player2Details} isOffline={true} navigation={navigation} roomName={roomName} setPlayer1Pawn={setPlayer1Pawn} setPlayer2Pawn={setPlayer2Pawn} player2Pawn={player2Pawn} pawns={pawns} player1Pawn={player1Pawn} diceVal={diceVal} setShowTask={setShowTask} setShowTaskId={setShowTaskId} setGameEnded={setGameEnded} changePlayerId={changePlayerId} activePlayerId={activePlayerId} setActivePlayerId={setActivePlayerId} player2={player2} setPlayer2={setPlayer2} player1={player1} setPlayer1={setPlayer1} playMove={playMove} playBackMove={playBackMove}></BoardGame>
                <BottomComponent navigation={navigation} showTask={showTask} isOffline={true} player1Details={player1Details} player2Details={player2Details} player2Pawn={player2Pawn} pawns={pawns} player1Pawn={player1Pawn} roomName={roomName} disableDice={disableDice} setDisableDice={setDisableDice} resetForReplay={resetForReplay} gameEnded={gameEnded} setGameEnded={setGameEnded} changePlayerId={changePlayerId} activePlayerId={activePlayerId} setActivePlayerId={setActivePlayerId} diceMove={diceMove} setDiceMove={setDiceMove} playMove={playMove} player1={player1} player2={player2}></BottomComponent>
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