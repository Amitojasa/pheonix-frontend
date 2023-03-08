import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { Animated, Easing, Text, Touchable, TouchableOpacity, View } from 'react-native'

import DiceOne from "../../assets/dice1.png";
import DiceTwo from "../../assets/dice2.png";
import DiceThree from "../../assets/dice3.png";
import { database } from '../configs/firebase';
import { AuthContext } from '../context/AuthContext';
function DiceComponent({ isOffline = false, diceMove, setDisableDice, disableDice, setDiceMove, playMove, changePlayerId, roomName }) {

    const diceArray = [DiceOne, DiceTwo, DiceThree]
    const { activePlayerId, setActivePlayerId, myPlayerId, setMyPlayerId } = useContext(AuthContext);

    const rollDice = () => {
        // startRotateImage();
        const rndInt = Math.floor(Math.random() * (3) + 1)
        setDiceMove(rndInt)

        // console.log(activePlayerId);
        if (isOffline) {
            setTimeout(() => {
                playMove(rndInt, activePlayerId);
                setDisableDice(true);
            }, 300);
        } else {
            setTimeout(async () => {
                await updateDoc(doc(database, 'rooms', roomName), {



                    diceMove: rndInt


                }).then((data) => {
                    // setActivePlayerId((activePlayerId) % 2 + 1);
                })
                await playMove(rndInt, activePlayerId);
                setDisableDice(true);
            }, 300);
        }





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

    console.log("Dice:" + myPlayerId, activePlayerId);
    return (

        <View style={{ flex: 1, alignSelf: 'center', backgroundColor: "#DB4A39", padding: "3%", borderRadius: 10 }}>
            <TouchableOpacity disabled={isOffline ? false : myPlayerId != activePlayerId} onPress={startRotateImage}>
                <Animated.Image
                    style={{
                        transform: [{ rotate: spin }], height: 80, width: 80,

                    }}
                    source={diceArray[diceMove - 1]}
                /><Text style={{ flex: 1, alignSelf: "center", color: "#FFF", fontWeight: "bold" }}>Roll the Dice</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DiceComponent