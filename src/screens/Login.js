import React, { useContext } from 'react'
import { Button, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { commonStyles } from "../css/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import { loginScreenStyles } from "../css/loginScreenStyles";
import { splashScreenStyle } from "../css/splashScreenStyles";

const Login = ({ navigation, route }) => {
    const { login, promptAsync } = useContext(AuthContext);

    return (
        <View style={commonStyles.centerContainer}>
            <LinearGradient colors={['#DB4A39', '#FFFFFF']}
                start={{ x: 1, y: 0.3 }}
                end={{ x: 0, y: 1 }} style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                <View style={loginScreenStyles.logoSection}>
                    <Image source={require('../../assets/logoHorizontal.png')} />
                    <View style={loginScreenStyles.loginDiv}>
                        <TouchableOpacity style={loginScreenStyles.loginBtn} onPress={() => {
                            login('user', 'password')
                        }}>
                            <Text style={loginScreenStyles.loginText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={loginScreenStyles.authSection}>
                    <LinearGradient colors={['#0073C5', '#9069FF']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[commonStyles.centerContainer, commonStyles.fullWidth, commonStyles.borderTopRd]}>
                        <TouchableOpacity style={[loginScreenStyles.googleLogin]} onPress={() => { promptAsync({ useProxy: true, showInRecents: true }) }}>
                            {/* TODO: change useProxy while making apk */}

                            <View>
                                <Text style={loginScreenStyles.googleText}>Login with Google</Text>
                            </View>
                            <View style={{ marginTop: 7, marginLeft: 30 }}>
                                <Image source={require('../../assets/googleLogo.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[loginScreenStyles.facebookLogin]}>
                            <View>
                                <Text style={loginScreenStyles.facebookText}>Login with Facebook</Text>
                            </View>
                            <View style={{ marginTop: 3, marginLeft: 15 }}>
                                <Image source={require('../../assets/facebookLogo.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{ borderBottomColor: "#fff", borderBottomWidth: 1 }}>
                                <Text style={loginScreenStyles.facebookText}>Play as Guest</Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </View>
    )
}

export default Login