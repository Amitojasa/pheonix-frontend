import React from 'react'
import { Text, Touchable, TouchableOpacity, View } from 'react-native'
function Home({ navigation }) {
    return (
        <View style={{ marginTop: 200 }}>
            <TouchableOpacity onPress={() => navigation.navigate('CreateRoom')}><Text>Create Room</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('JoinRoom')}><Text>Join Room</Text></TouchableOpacity>

        </View>)
}

export default Home