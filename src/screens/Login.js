import React, {useContext} from 'react'
import {Button, Image, Pressable, Text, View} from 'react-native'
import {AuthContext} from '../context/AuthContext';
import {commonStyles} from "../css/commonStyles";
import {LinearGradient} from "expo-linear-gradient";
import {loginScreenStyles} from "../css/loginScreenStyles";
import {splashScreenStyle as styles} from "../css/splashScreenStyles";

const Login = ({navigation, route}) => {
    const {login,} = useContext(AuthContext);

    return (
        <View style={commonStyles.centerContainer}>
            <LinearGradient colors={['#DB4A39', '#FFFFFF']}
                            locations={[0.7, 0]}
                            start={{x: 0.5, y: 0.9}}
                            end={{x: 1, y: 0}} style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                <View style={loginScreenStyles.logoSection}>
                    <Image source={require('../../assets/logoHorizontal.png')}/>
                    <View style={loginScreenStyles.loginDiv}>
                        <Pressable style={loginScreenStyles.loginBtn} onPress={() => {
                            login('user', 'password')
                        }}>
                            <Text style={loginScreenStyles.loginText}>LOGIN</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={loginScreenStyles.authSection}>
                    <LinearGradient colors={['#0073C5', '#9069FF']}
                                    locations={[1, 0]}
                                    start={{x: -0.5, y: 0.5}}
                                    end={{x: 0, y: -1.5}} style={[styles.centerContainer, styles.fullWidth,styles.borderRd]}>
                        <Pressable >
                        <Text>Login with Google</Text>
                        </Pressable>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </View>
    )
}

export default Login