import React from 'react'
import { StyleSheet, View } from 'react-native'
import DiceComponent from './DiceComponent';
import GamePlayerComponent from './GamePlayerComponent';

const BottomComponent = ({ diceMove, setDiceMove, player1, playMove }) => {
    return (
        <View style={styles.container}>
            <GamePlayerComponent playerId={1} />
            <DiceComponent diceMove={diceMove} setDiceMove={setDiceMove} player1={player1} playMove={playMove} />
            <GamePlayerComponent playerId={2} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        padding: 10,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#FFF"
    }
});
export default BottomComponent