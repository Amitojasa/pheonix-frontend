import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import BoardGame from '../components/BoardGame';
import BottomComponent from '../components/BottomComponent';
import ScreenOverlayComponent from '../components/ScreenOverlayComponent';
import TaskShowComponent from '../components/TaskShowComponent';
import { Cols, EndPosition, Rows, StartPosition, taskList } from '../Config';
import { LinearGradient } from 'expo-linear-gradient';
import LandscapeLogo from '../components/LandscapeLogo';

const Game = () => {
    const [player1, setPlayer1] = useState(StartPosition)
    const [player2, setPlayer2] = useState(StartPosition)
    const [diceMove, setDiceMove] = useState(1)
    const [activePlayerId, setActivePlayerId] = useState(1);
    const [gameEnded, setGameEnded] = useState(false);
    const [disableDice, setDisableDice] = useState(false)

    const [showTask, setShowTask] = useState(false)
    const [showTaskId, setShowTaskId] = useState(0)
    // const [leftToRight1, setLeftToRight1] = useState(true)

    const playMove = (moveVal, playerID) => {
        let tempArr = [];
        if (playerID == 1) tempArr = player1;
        else tempArr = player2;

        let c = moveVal;
        let initValj = -1;

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
                        playerID == 1 ? setPlayer1([i, j]) : setPlayer2([i, j]);
                    else {

                        if (i <= 0 && j >= Cols - 1)
                            playerID == 1 ? setPlayer1(EndPosition) : setPlayer2(EndPosition);

                        else
                            playerID == 1 ? setPlayer1([i - 1, j - 1]) : setPlayer2([i - 1, j - 1]);

                    }

                }
            } else {
                let j = initValj == -1 ? Cols - 1 : initValj;

                for (; j >= 0 && c > 0; j--) {
                    c--;
                }

                if (c == 0) {
                    if (j >= 0)
                        playerID == 1 ? setPlayer1([i, j]) : setPlayer2([i, j]);
                    else {
                        playerID == 1 ? setPlayer1([i - 1, j + 1]) : setPlayer2([i - 1, j + 1]);
                    }

                }
            }



        }



    }

    const playBackMove = (moveVal, playerID) => {
        let tempArr = [];
        if (playerID == 1) tempArr = player1;
        else tempArr = player2;

        let c = moveVal;
        let initValj = -1;

        console.log(player1, player2)
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
                        playerID == 1 ? setPlayer1([i, j]) : setPlayer2([i, j]);
                    else {

                        playerID == 1 ? setPlayer1([i + 1, j - 1]) : setPlayer2([i + 1, j - 1]);

                    }

                }
            } else {
                let j = initValj == -1 ? Cols - 1 : initValj;

                for (; j >= 0 && c > 0; j--) {
                    c--;
                }

                if (c == 0) {
                    if (j >= 0)
                        playerID == 1 ? setPlayer1([i, j]) : setPlayer2([i, j]);
                    else {
                        if (i >= Rows - 1 && j <= 0)
                            playerID == 1 ? setPlayer1(StartPosition) : setPlayer2(StartPosition);
                        else
                            playerID == 1 ? setPlayer1([i + 1, j + 1]) : setPlayer2([i + 1, j + 1]);
                    }

                }
            }



        }



    }

    const changePlayerId = () => {
        setActivePlayerId((activePlayerId) % 2 + 1);
        setDisableDice(false)
    }

    const resetForReplay = () => {
        setPlayer1(StartPosition)
        setPlayer2(StartPosition)
        setGameEnded(false)

    }


    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0073C5', '#9069FF']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={styles.linearGradient}>
                <LandscapeLogo />
                <BoardGame setShowTask={setShowTask} setShowTaskId={setShowTaskId} setGameEnded={setGameEnded} changePlayerId={changePlayerId} activePlayerId={activePlayerId} setActivePlayerId={setActivePlayerId} player2={player2} setPlayer2={setPlayer2} player1={player1} setPlayer1={setPlayer1} playMove={playMove} playBackMove={playBackMove}></BoardGame>
                <BottomComponent disableDice={disableDice} setDisableDice={setDisableDice} resetForReplay={resetForReplay} gameEnded={gameEnded} setGameEnded={setGameEnded} changePlayerId={changePlayerId} activePlayerId={activePlayerId} setActivePlayerId={setActivePlayerId} diceMove={diceMove} setDiceMove={setDiceMove} playMove={playMove} player1={player1} player2={player2}></BottomComponent>
                {showTask && <ScreenOverlayComponent />}
                {showTask && <TaskShowComponent task={taskList[showTaskId]} setShowTask={setShowTask}></TaskShowComponent>}
            </LinearGradient>
        </View>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

        // backgroundColor: "#083D77"
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

export default Game