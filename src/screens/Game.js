import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import BoardGame from '../components/BoardGame';
import BottomComponent from '../components/BottomComponent';
import { Cols, EndPosition, StartPosition } from '../Config';

const Game = () => {
    const [player1, setPlayer1] = useState(StartPosition)
    const [diceMove, setDiceMove] = useState(1)
    // const [leftToRight1, setLeftToRight1] = useState(true)

    const playMove = (moveVal) => {


        let c = moveVal;
        let initValj = -1;

        for (let i = player1[0]; i >= 0 && c > 0; i--) {

            if (initValj == -1) initValj = player1[1];
            else initValj = -1;

            if (i % 2 == 0) {
                let j = initValj == -1 ? 0 : initValj;
                for (; j < Cols && c > 0; j++) {
                    c--;
                }
                if (c == 0) {
                    if (j < Cols)
                        setPlayer1([i, j])
                    else {

                        if (i <= 0 && j >= Cols - 1)
                            setPlayer1(EndPosition);
                        else
                            setPlayer1([i - 1, j - 1])

                    }

                }
            } else {
                let j = initValj == -1 ? Cols - 1 : initValj;

                for (; j >= 0 && c > 0; j--) {
                    c--;
                }

                if (c == 0) {
                    if (j >= 0)
                        setPlayer1([i, j])
                    else {
                        setPlayer1([i - 1, j + 1])
                    }

                }
            }



        }



    }
    return (
        <View style={styles.container}>
            <BoardGame player1={player1} setPlayer1={setPlayer1} playMove={playMove}></BoardGame>
            <BottomComponent diceMove={diceMove} setDiceMove={setDiceMove} playMove={playMove} player1={player1} ></BottomComponent>
        </View>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00F"
    }

});

export default Game