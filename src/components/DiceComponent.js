import React, { useState } from 'react'
import { Animated, Easing, Text, Touchable, TouchableOpacity, View } from 'react-native'

import DiceOne from "../../assets/dice1.png";
import DiceTwo from "../../assets/dice2.png";
import DiceThree from "../../assets/dice3.png";
function DiceComponent({ diceMove, setDisableDice, disableDice, setDiceMove, playMove, activePlayerId, changePlayerId }) {

    const diceArray = [DiceOne, DiceTwo, DiceThree]

    const rollDice = () => {
        // startRotateImage();
        const rndInt = Math.floor(Math.random() * (3) + 1)
        setDiceMove(rndInt)
        // console.log(activePlayerId);
        setTimeout(() => {
            playMove(rndInt, activePlayerId);
            setDisableDice(true);
        }, 300);


    }


    const startRotateImage = () => {
        // rollDice();

        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: false  // To make use of native driver for performance
            }
        ).start(() => setTimeout(() => {
            rollDice()
        }, 50));

    }

    let spinValue = new Animated.Value(0);

    // First set up animation 


    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    return (
        <View>
            <TouchableOpacity disabled={disableDice} onPress={startRotateImage}><Animated.Image
                style={{ transform: [{ rotate: spin }], height: 100, width: 100 }}
                source={diceArray[diceMove - 1]}
            /></TouchableOpacity>
        </View>
    )
}

export default DiceComponent