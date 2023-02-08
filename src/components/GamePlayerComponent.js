import React from 'react'
import { Text } from 'react-native'

function GamePlayerComponent({ playerId }) {
    return (
        playerId == 1 ?
            <Text>Player 1</Text> :
            <Text>Player 2</Text>
    )
}

export default GamePlayerComponent