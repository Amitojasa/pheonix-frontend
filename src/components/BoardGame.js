import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icons from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { EndPosition, flags, mines, taskList } from '../Config';
import { useFirstRender } from '../customhooks/useFirstRender';
function BoardGame({ setShowTask, setShowTaskId, setGameEnded, player1, setPlayer1, player2, activePlayerId, changePlayerId, playBackMove }) {

    const [matrix, setMatrix] = useState([])
    const windowWidth = Dimensions.get('window').width;

    const firstRender = useFirstRender();

    const create2DMatrix = () => {

        var a = [];


        for (let i = 0; i < 5; i++) {
            a[i] = [0, 0, 0, 0, 0];
        }

        for (let i = 0; i < 5; i++) {

            a[flags[i][0]][flags[i][1]] = 1
        }

        for (let i = 0; i < 5; i++) {

            a[mines[i][0]][mines[i][1]] = -1
        }



        a[0][4] = 3;
        a[4][0] = 2;

        setMatrix(a)





    }

    const reachedFlag = (activeUserId, i) => {
        console.log(activeUserId, "reached flag")
        const rndInt = Math.floor(Math.random() * (2) + 1);
        setShowTaskId(i * rndInt);
        // console.log(i * rndInt)
        setTimeout(() => {

            setShowTask(true);

        }, 500);


    }


    const reachedMine = (activeUserId) => {

        console.log(activeUserId, "reached mine")

        const rndInt = Math.floor(Math.random() * (3) + 1);

        // showMineMessage(true);
        // setTimeout(() => {
        //     showMineMessage(False);
        // }, 1000);

        setTimeout(() => {
            playBackMove(rndInt, activeUserId);
            changePlayerId();
        }, 500);


    }

    useEffect(() => {

        if (!firstRender) {
            if (activePlayerId == 1) {

                if (player1[0] == EndPosition[0] && player1[1] == EndPosition[1]) {
                    Alert.alert("Player 1 Won the game", "Both the players will go for luch together and Player 2 will have to pay.")
                    setGameEnded(true);
                    return;
                }

                for (let i = 0; i < 5; i++) {
                    if (player1[0] == flags[i][0] && player1[1] == flags[i][1]) {
                        reachedFlag(activePlayerId, i);

                    } else if (player1[0] == mines[i][0] && player1[1] == mines[i][1]) {
                        reachedMine(activePlayerId)
                        return;
                    }
                }



            }
            else if (activePlayerId == 2) {
                if (player2[0] == EndPosition[0] && player2[1] == EndPosition[1]) {
                    Alert.alert("Player 2 Won the game", "Player 1 has to buy a movie for Player 2 and both have to go together for a movie.");
                    setGameEnded(true);
                    return;
                }
                for (let i = 0; i < 5; i++) {
                    if (player2[0] == flags[i][0] && player2[1] == flags[i][1]) {
                        reachedFlag(activePlayerId, i);

                    } else if (player2[0] == mines[i][0] && player2[1] == mines[i][1]) {
                        reachedMine(activePlayerId);
                        return;
                    }
                }
            }
            changePlayerId();
        }


    }, [player1, player2])

    useEffect(() => {
        create2DMatrix();
    }, [])


    return (
        <View style={{
            marginTop: '30%', marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: 'green', width: windowWidth * 0.95, height: windowWidth * 0.95
        }}>
            {
                matrix.map((i, index1) => (
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {i.map((j, index2) => (
                            <View style={[((index1 + index2) % 2 == 0) ? styles.box1 : styles.box2, styles.box]}>

                                {j == 1 ? <Ionicons name="flag" size={32} color="green" /> : (j == -1 ? <MaterialCommunityIcons name="mine" size={32} color="#242B2E" /> : j == 3 ? <Icons name="trophy" size={32} color="#B80C09" /> : j == 2 ? <Ionicons name="star" size={32} color="#D74E09" /> : <Text></Text>)}

                                {((index1 == player1[0] && index2 == player1[1]) || (index1 == player2[0] && index2 == player2[1])) &&
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        {(index1 == player1[0] && index2 == player1[1]) && <MaterialCommunityIcons name="chess-pawn" size={32} color="#000000" />}
                                        {(index1 == player2[0] && index2 == player2[1]) && <MaterialCommunityIcons name="chess-pawn" size={32} color="#383CC1" />}
                                    </View>

                                }


                            </View>

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
        justifyContent: 'center'
    }

})

export default BoardGame