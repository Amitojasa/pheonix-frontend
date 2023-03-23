import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { getString } from '../language/Strings'

const InternetAlert = ({ isConnected, checkConnection, language }) => {

    return (
        !isConnected && <>
            <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#000', opacity: 0.5, zIndex: 8, }}></View>
            <View style={{ backgroundColor: "#FFF", position: "absolute", bottom: "45%", zIndex: 10, alignItems: "center", alignSelf: "center", width: "90%", padding: 20, }}>
                <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 10 }}>Internet Required</Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>Please connect to the internet</Text>
                <TouchableOpacity onPress={() => checkConnection()}>
                    <Text style={{ backgroundColor: "#000", padding: 10, paddingHorizontal: 20, margin: 10, color: "#FFF", borderRadius: 10 }}>Ok</Text>
                </TouchableOpacity>
            </View>

        </>
    )
}

export default InternetAlert