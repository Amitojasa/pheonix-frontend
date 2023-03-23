import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Alert, Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

import { EndPosition, boards, StartPosition } from '../Config';
import { AuthContext } from '../context/AuthContext';
import blueTile from '../../assets/blueTile.png';
import redTile from '../../assets/redTile2.png';
import bomb from '../../assets/bomb.png'
import trophy from '../../assets/trophy.png'
import start from '../../assets/start.png'
import flag from '../../assets/gflag.png'
import { StackActions } from '@react-navigation/native';
import { Audio } from 'expo-av';
import SoundPlayer from 'react-native-sound-player'


function BoardGame({ setShowTask, setShowTaskId, setGameEnded, player1, setPlayer1, player2, changePlayerId, playBackMove, roomName, diceVal, setPlayer1Pawn, setPlayer2Pawn, player1Pawn, player2Pawn, pawns, navigation, isOffline = false, player1Details, player2Details }) {
    const { activePlayerId, myPlayerId, taskIndex, taskList, soundOn } = useContext(AuthContext);
    let rn = (roomName)
    var rndInt1 = (parseInt(rn[0]) + parseInt(rn[1]) + parseInt(rn[2]) + parseInt(rn[3]) + parseInt(rn[4]) + parseInt(rn[5])) % boards.length
    var flags = boards[rndInt1].flags
    var mines = boards[rndInt1].mines
    const [matrix, setMatrix] = useState([])
    const windowWidth = Dimensions.get('window').width;


    function playSound(sound) {
        console.log('Playing ');
        Audio.Sound.createAsync(
            sound,
            { shouldPlay: true }
        ).then((res) => {
            res.sound.setOnPlaybackStatusUpdate((status) => {
                if (!status.didJustFinish) return;
                res.sound.unloadAsync().catch(() => { });
            });
        }).catch((error) => { });
    }



    const create2DMatrix = () => {

        let rn = (roomName)
        var rndInt1 = (parseInt(rn[0]) + parseInt(rn[1]) + parseInt(rn[2]) + parseInt(rn[3]) + parseInt(rn[4]) + parseInt(rn[5])) % boards.length

        // setFlags(boards[rndInt1].flags);
        // setMines(boards[rndInt1].mines);
        // let flags=boards[rndInt1].flags
        // let mines=boards[rndInt1].mines

        var a = [];


        for (let i = 0; i < 5; i++) {
            a[i] = [0, 0, 0, 0, 0];
        }

        for (let i = 0; i < 6; i++) {

            a[flags[i][0]][flags[i][1]] = 1
        }

        for (let i = 0; i < 6; i++) {

            a[mines[i][0]][mines[i][1]] = -1

        }



        a[0][4] = 3;
        a[4][0] = 2;

        setMatrix(a)





    }

    const reachedFlag = async (activeUserId, i) => {


        soundOn && playSound(require('../../assets/flag.mp3'))

        // const rndInt = Math.floor(Math.random() * (2) + 1);
        console.log("taskInd" + taskIndex);
        setShowTaskId(taskIndex);


        setTimeout(() => {

            setShowTask(true);
            changePlayerId(myPlayerId != activePlayerId);

        }, 200);


    }


    const reachedMine = async (activeUserId) => {


        soundOn && playSound(require('../../assets/mine.mp3'))


        // showMineMessage(true);
        // setTimeout(() => {
        //     showMineMessage(False);
        // }, 1000);

        const a = setTimeout(async () => {
            // const rndInt = Math.floor(Math.random() * (3) + 1);
            // console.log("Random back" + rndInt, activeUserId);
            if (activePlayerId == 2)
                await playBackMove((player1[0] + player1[1]) % 3 + 1, activeUserId);
            else
                await playBackMove((player2[0] + player2[1]) % 3 + 1, activeUserId);
            changePlayerId(myPlayerId != activePlayerId);
        }, 200);

        return () => clearTimeout(a);


    }







    useEffect(() => {
        const unsubscribe = setTimeout(async () => {

            let activePId = (activePlayerId);
            console.log(activePlayerId, player1, player2, " check");
            if (!(player2[0] == StartPosition[0] && player2[1] == StartPosition[1] && player1[0] == StartPosition[0] && player1[1] == StartPosition[1])) {
                // TODO: confirm this thing == or != because activePlayerId changes before this

                if (activePId == 1) {
                    // console.log("rr 1");
                    if (player1[0] == EndPosition[0] && player1[1] == EndPosition[1]) {

                        soundOn && playSound(require('../../assets/win.wav'))
                        setGameEnded(true);
                        setTimeout(() => {
                            navigation.dispatch(
                                StackActions.replace
                                    ('Win', { winPlayer: 1, roomName: roomName, isOffline: isOffline, pl1D: player1Details, pl2D: player2Details })); //TODO:
                        }, 2000);
                        return;
                    }

                    for (let i = 0; i < 6; i++) {
                        if (player1[0] == flags[i][0] && player1[1] == flags[i][1]) {
                            console.log("flag for 1", player2);
                            reachedFlag(activePId, i);

                            return;

                        } else if (player1[0] == mines[i][0] && player1[1] == mines[i][1]) {
                            reachedMine(activePId)
                            return;
                        }
                    }



                }
                else if (activePId == 2) {

                    if (player2[0] == EndPosition[0] && player2[1] == EndPosition[1]) {

                        soundOn && playSound(require('../../assets/win.wav'))
                        setGameEnded(true);
                        setTimeout(() => {
                            navigation.dispatch(
                                StackActions.replace
                                    ('Win', { winPlayer: 2, roomName: roomName, isOffline: isOffline, pl1D: player1Details, pl2D: player2Details, })); //TODO:
                        }, 2000);
                        return;
                    }
                    for (let i = 0; i < 6; i++) {
                        if (player2[0] == flags[i][0] && player2[1] == flags[i][1]) {
                            // console.log("flag for 2", player2);
                            reachedFlag(activePId, i);
                            return;

                        } else if (player2[0] == mines[i][0] && player2[1] == mines[i][1]) {
                            reachedMine(activePId);
                            // console.log("mine for 2", player2);
                            return;
                        }
                    }
                }
                changePlayerId();
            }

        }, 300);
        return () => clearTimeout(unsubscribe);

    }, [player1, player2])

    const selectPawns = () => {
        let rn = (roomName)
        var rndInt1 = (parseInt(rn[0]) + parseInt(rn[1]) + parseInt(rn[2])) % pawns.length
        var rndInt2 = (parseInt(rn[3]) + parseInt(rn[4]) + parseInt(rn[5])) % pawns.length
        console.log(rn, rndInt1, rndInt2);
        let i = 1;
        while (rndInt1 == rndInt2) {
            rndInt2 = (rndInt2 + i) % pawns.length;
            console.log("in", rndInt1, rndInt2)
            i++;
        }

        setPlayer1Pawn(pawns[rndInt1])
        setPlayer2Pawn(pawns[rndInt2])
    }


    useEffect(() => {
        selectPawns();

        create2DMatrix();
    }, [])


    const pawnMovement = (index1, index2) => {
        return ((index1 == player1[0] && index2 == player1[1]) || (index1 == player2[0] && index2 == player2[1])) &&
            // <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }, (player1[0] == player2[0] && player2[1] == player1[1]) && { position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, }]}>
            //     {(index1 == player1[0] && index2 == player1[1]) && <Image source={player1Pawn} style={[{
            //         height: 50, width: 50, resizeMode: "center", margin: 0, padding: 0, elevation: 5

            //     }, (player1[0] == player2[0] && player2[1] == player1[1]) && { position: "absolute", top: "20%", left: '20%', right: 0, bottom: 0, }]}></Image>}
            //     {(index1 == player2[0] && index2 == player2[1]) && <Image source={player2Pawn} style={[{
            //         height: 50, width: 50, resizeMode: "center", margin: 0, padding: 0, elevation: 5
            //     }, (player1[0] == player2[0] && player2[1] == player1[1]) && { position: "absolute", top: "20%", left: "20%" }]}></Image>}
            // </View>

            <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }, (player1[0] == player2[0] && player2[1] == player1[1]) && { position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, }]}>
                {(index1 == player1[0] && index2 == player1[1]) && <Image source={player1Pawn} style={[{
                    height: 40, width: 40, resizeMode: "center", margin: 0, padding: 0, elevation: 5,

                }, (player1[0] == player2[0] && player2[1] == player1[1]) && { top: 10 }]}></Image>}
                {(index1 == player2[0] && index2 == player2[1]) && <Image source={player2Pawn} style={[{
                    height: 40, width: 40, resizeMode: "center", margin: 0, padding: 0, elevation: 5,
                }, (player1[0] == player2[0] && player2[1] == player1[1]) && { top: -10 }]}></Image>}
            </View>



    }


    return (
        <View style={{
            marginTop: '5%', marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: "2%",
            backgroundColor: '#0073C5', width: windowWidth * 0.95, height: windowWidth * 0.95,
            padding: 5,
            borderRadius: 5
        }}>
            {
                matrix.map((i, index1) => (
                    <View key={(index1 + 1) * 100} style={{ flexDirection: 'row', flex: 1 }}>
                        {i.map((j, index2) => (

                            <ImageBackground key={(index1 + index2 + 2) * 1000} source={((index1 + index2) % 2 == 0) ? blueTile : redTile} resizeMode="cover" style={[styles.image, styles.bgImage]}>

                                <View key={index1 * 5 + index2} style={styles.box}>

                                    {j == 1 ? <ImageBackground source={flag} style={[{ resizeMode: "cover", width: "100%", height: "100%" }, styles.internalImages]}>{pawnMovement(index1
                                        , index2)}</ImageBackground> :
                                        (j == -1 ? <ImageBackground source={bomb} style={{ resizeMode: "cover", width: "100%", height: "100%" }}>{pawnMovement(index1
                                            , index2)}</ImageBackground> :
                                            j == 3 ? <ImageBackground source={trophy} style={{ resizeMode: "cover", width: "100%", height: "100%" }}>{pawnMovement(index1
                                                , index2)}</ImageBackground> :
                                                j == 2 ? <ImageBackground source={start} style={{ resizeMode: "cover", width: "100%", height: "100%" }}>{pawnMovement(index1
                                                    , index2)}</ImageBackground> : pawnMovement(index1, index2))}




                                </View>
                            </ImageBackground>

                        ))}
                    </View >


                ))
            }
        </View>
    )
}


const styles = StyleSheet.create({
    box1: {
        backgroundColor: "#FED766",
    },
    box2: {
        backgroundColor: "#FF5376",
    },
    box: {
        // height: 20,
        // width: 20

        padding: 3,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "20%",

    },
    image: {
        flex: 1
    },
    bgImage: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        margin: 1
    },
    internalImages: {
        flex: 1,

        // backgroundColor: "#FFF",
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center'
    }

})

export default BoardGame