import React from 'react'
import { Text, View } from 'react-native'

function ScreenOverlayComponent() {
    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#000", opacity: 0.5, zIndex: 100 }}>


        </View>
    )
}

export default ScreenOverlayComponent