import React from 'react'
import {Image, Text, View} from 'react-native'
import {splashScreenStyle as styles} from "../css/splashScreenStyles";
import {LinearGradient} from 'expo-linear-gradient';

const Splash = () => {
    return (
        <View style={styles.centerContainer}>
            <LinearGradient colors={['#0073C5','#9069FF']}
                            start={{x: 1, y: 0}}
                            end={{x: 0, y: 1}} style={[styles.centerContainer, styles.fullWidth]}>
                <Image source={require('../../assets/logo.png')}/>
            </LinearGradient>
        </View>
    )
}
export default Splash