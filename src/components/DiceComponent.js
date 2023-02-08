import React, { useState } from 'react'
import { Text, Touchable, TouchableOpacity } from 'react-native'

function DiceComponent({ diceMove, setDiceMove, playMove }) {



    const rollDice = () => {

        const rndInt = Math.floor(Math.random() * (3) + 1)
        setDiceMove(rndInt)
        playMove(rndInt);

    }

    return (
        <TouchableOpacity onPress={rollDice}><Text style={{ padding: 20 }}>{diceMove}</Text></TouchableOpacity>
    )
}

export default DiceComponent