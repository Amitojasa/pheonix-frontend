import React, { useContext } from 'react'
import { Button, Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import { commonStyles } from "../css/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import { loginScreenStyles } from "../css/loginScreenStyles";
import { splashScreenStyle } from "../css/splashScreenStyles";
import { SafeAreaView } from 'react-native-safe-area-context';
import InternetAlert from '../components/InternetAlert';
import { getString } from '../language/Strings';

const Login = ({ navigation, route }) => {
    const { isConnected, checkConnection, login, promptAsync, handleGuestLogin, language } = useContext(AuthContext);

    return (
        <SafeAreaView style={commonStyles.centerContainer}>
            <InternetAlert checkConnection={checkConnection} language={language} isConnected={isConnected} />

            <LinearGradient colors={['#DB4A39', '#FFFFFF']}
                start={{ x: 1, y: 0.3 }}
                end={{ x: 0, y: 1 }} style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                <View style={loginScreenStyles.logoSection}>
                    <Image source={require('../../assets/logoHorizontal.png')} />
                    <View style={loginScreenStyles.loginDiv}>
                        <View style={loginScreenStyles.loginBtn}>
                            <Text style={loginScreenStyles.loginText}>{getString('login', language)}</Text>
                        </View>
                    </View>
                </View>

                <View style={loginScreenStyles.authSection}>
                    <LinearGradient colors={['#0073C5', '#9069FF']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[commonStyles.centerContainer, commonStyles.fullWidth, commonStyles.borderTopRd]}>
                        <TouchableOpacity style={[loginScreenStyles.googleLogin]} onPress={() => {
                            promptAsync({ useProxy: true, showInRecents: true })
                        }}>
                            {/* TODO: change useProxy while making apk */}

                            <View>
                                <Text
                                    style={loginScreenStyles.googleText}>{getString('loginWithGoogle', language)}</Text>
                            </View>
                            <Image style={{ width: 40, marginTop: 7 }} source={require('../../assets/googleLogo.png')} />
                        </TouchableOpacity>

                        {/* FACEBOOK LOGIN CODE
                        <TouchableOpacity style={[loginScreenStyles.facebookLogin]} onPress={() => {*/}
                        {/*    fbPromptAsync();*/}
                        {/*}}>*/}
                        {/*    <View>*/}
                        {/*        <Text style={loginScreenStyles.facebookText}>Login with Facebook</Text>*/}
                        {/*    </View>*/}
                        {/*    <View style={{ marginTop: 3, marginLeft: 15 }}>*/}
                        {/*        <Image source={require('../../assets/facebookLogo.png')} />*/}
                        {/*    </View>*/}
                        {/*</TouchableOpacity>*/}
                        <TouchableOpacity onPress={() => {
                            handleGuestLogin()
                        }}>
                            <View style={{
                                borderColor: "#fff", borderWidth: 1, paddingHorizontal: 40, paddingVertical: 10,
                                borderRadius: 15,

                            }}>
                                <Text style={loginScreenStyles.facebookText}>{getString('playAsGuest', language)}</Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default Login