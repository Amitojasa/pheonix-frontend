import React, { useContext } from 'react'
import { Button, Image, Pressable, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { commonStyles } from "../css/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import { loginScreenStyles } from "../css/loginScreenStyles";
import { splashScreenStyle } from "../css/splashScreenStyles";

const Login = ({ navigation, route }) => {
    const { login, } = useContext(AuthContext);

    return (
        <View style={commonStyles.centerContainer}>
            {/* <Text>Login</Text> */}
            <LinearGradient colors={['#DB4A39', '#FFFFFF']}

                start={{ x: 1, y: 0.3 }}
                end={{ x: 0, y: 1 }} style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                <View style={loginScreenStyles.logoSection}>
                    <Image source={require('../../assets/logoHorizontal.png')} />
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
                        start={{ x: -0.5, y: 0.5 }}
                        end={{ x: 0, y: -1.5 }} style={[splashScreenStyle.centerContainer, splashScreenStyle.fullWidth, splashScreenStyle.borderRd]}>
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