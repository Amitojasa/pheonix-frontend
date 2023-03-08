import React, { useContext } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { StartPosition } from '../Config';
import { AuthContext } from '../context/AuthContext';
import DiceComponent from './DiceComponent';
import GamePlayerComponent from './GamePlayerComponent';

const BottomComponent = ({ isOffline = false, roomName, gameEnded, setGameEnded, changePlayerId, diceMove, setDiceMove, player1, playMove, player2, setActivePlayerId, activePlayerId, resetForReplay, disableDice, setDisableDice, player1Pawn, player2Pawn, player1Details, player2Details }) => {


    const { myPlayerId, setMyPlayerId } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View>{gameEnded ? <Button title="Replay" onPress={resetForReplay}></Button> :
                <DiceComponent isOffline={isOffline} roomName={roomName} changePlayerId={changePlayerId} diceMove={diceMove} setDiceMove={setDiceMove} player1={player1} playMove={playMove} activePlayerId={activePlayerId} setActivePlayerId={setActivePlayerId} disableDice={disableDice} setDisableDice={setDisableDice} />}</View>
            <View style={styles.gameplayersDiv}>
                <GamePlayerComponent isOffline={isOffline} playerId={1} playerPawn={player1Pawn} playerDetails={player1Details} />

                <GamePlayerComponent isOffline={isOffline} playerId={2} playerPawn={player2Pawn} playerDetails={player2Details} />
            </View>

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
        flexDirection: 'column',
        justifyContent: 'space-between',
        // backgroundColor: "#FFF"
    },
    gameplayersDiv: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        // backgroundColor: "#000",
        justifyContent: "space-between"
    }


});
export default BottomComponent