import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Dimensions, Image, View } from 'react-native'
import landscape_logo from "../../assets/landscape_logo.png";
function LandscapeLogo() {
    const windowWidth = Dimensions.get('window').width;
    return (

        <Image
            source={landscape_logo}

            style={{
                height: 100,
                marginTop: '5%',
                // padding: 15,
                // marginTop: StatusBar.currentHeight,
                flexDirection: 'row',
                alignSelf: 'center',
                width: '90%',
                // backgroundColor: "#000",
                marginBottom:"5%"
            }}
        ></Image>

    )
}

export default LandscapeLogo