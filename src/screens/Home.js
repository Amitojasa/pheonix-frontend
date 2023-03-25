import React, {useContext, useEffect, useState} from 'react'
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native'
import {commonStyles} from "../css/commonStyles";
import {LinearGradient} from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loginScreenStyles} from "../css/loginScreenStyles";
import {homeScreenStyles} from "../css/homeScreenStyles";
import {AuthContext} from "../context/AuthContext";
import {useIsFocused} from "@react-navigation/native";
import axios from "axios";
import {BASE_URL, HomeUserProfileImage} from "../Config";
import {getString} from '../language/Strings';
import Icons from '@expo/vector-icons/FontAwesome';
import {Ionicons} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import InternetAlert from '../components/InternetAlert';
import {SettingsComponent} from "../components/SettingsComponent";
import ScreenOverlayComponent from "../components/ScreenOverlayComponent";

function Home({navigation}) {
    const {
        userInfo,
        language,
        setLanguage,
        setIsAvatar,
        isAvatar,
        userData,
        avatar,
        setAvatar,
        logout,
        setUserData, isConnected, checkConnection
    } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        AsyncStorage.getItem('isAvatar').then((res) => {
            setIsAvatar(res);
        })
        getUserData().then();
    }, [isFocused]);

    useEffect(() => {
        getUserData().then();
    }, []);

    const getUserData = async () => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        const userId = JSON.parse(userInfo);
        await axios.get(`${BASE_URL}/api/OAuthUsers/${userId.id}`).then((res) => {
            setUserDetails(res.data.message[0]);
            setUserData(res.data.message[0]);
            console.log("check it", res.data.message[0]);
        })
        AsyncStorage.getItem('isAvatar').then((res) => {
            if (res === 'true') {
                setIsAvatar(true)
            } else {
                setIsAvatar(false)
            }

        })
    }

    return (
        <SafeAreaView style={commonStyles.centerContainer}>
            {showSettings && <ScreenOverlayComponent/>}
            {showSettings && <SettingsComponent setShowSettings={setShowSettings}/>}
            <InternetAlert checkConnection={checkConnection} language={language} isConnected={isConnected}/>

            <LinearGradient colors={['#DB4A39', '#FFFFFF']}
                            start={{x: 1, y: 0.3}}
                            end={{x: 0, y: 1}} style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                <View style={homeScreenStyles.userSection}>
                    <Image source={require('../../assets/logoHorizontal.png')}/>
                    <TouchableOpacity onPress={() => {
                        logout()
                    }} style={{
                        position: "absolute",
                        right: -20,
                        top: "30%",
                        padding: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // flexDirection:'row'
                    }}>
                        <Ionicons name="exit" size={20} color="white"/>
                        <Text style={{fontSize: 10, fontWeight: "bold", color: "#FFF", elevation: 10}}>Log Out</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => {
                        setShowSettings(true);
                    }} style={{
                        position: "absolute",
                        left: -10,
                        top: "35%",
                        padding: 10,
                        borderRadius: 10,
                    }}><Text style={{fontWeight: "bold", color: "#FFF", elevation: 10}}>
                        <Ionicons name="settings"
                                  size={40}
                                  color="black"/>
                    </Text></TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('BuyCoins', { userDetails: userDetails })
                    }} style={{
                        position: "absolute",
                        right: -20,
                        top: "40%",
                        padding: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // flexDirection:'row'
                    }}>
                        <Ionicons name="cart" size={20} color="white" />
                        <Text style={{ fontSize: 10, fontWeight: "bold", color: "#FFF", elevation: 10 }}>Buy Coins</Text>
                    </TouchableOpacity>


                    <View style={homeScreenStyles.avatarDiv}>
                        <TouchableOpacity onPress={() => navigation.navigate('Avatar')} style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            zIndex: 100,
                        }}>
                            <Image source={require('../../assets/editLogo.png')} style={homeScreenStyles.editLogo}/>
                        </TouchableOpacity>
                        <Image
                            source={HomeUserProfileImage(userDetails ? userDetails.profileImage : '')}

                            style={homeScreenStyles.userImage}>
                        </Image>


                        <View>
                            <Text style={homeScreenStyles.usernameText}>{userDetails ? userDetails.userName : ''}</Text>
                        </View>
                    </View>
                    <View style={homeScreenStyles.coinsDiv}>
                        <Image source={require('../../assets/coin.png')} style={homeScreenStyles.coinImg}/>
                        <Text style={homeScreenStyles.coinsText}>{userDetails ? userDetails.coins : "2500"}</Text>
                    </View>
                </View>
                <View style={loginScreenStyles.authSection}>
                    <LinearGradient colors={['#0073C5', '#9069FF']}
                                    start={{x: 1, y: 0}}
                                    end={{x: 0, y: 1}}
                                    style={[commonStyles.centerContainer, commonStyles.fullWidth, commonStyles.borderTopRd]}>
                        <View style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                            <TouchableOpacity style={homeScreenStyles.homeBtn}
                                              onPress={() => userData.coins > 50 ? navigation.navigate('CreateRoom') : Alert.alert(getString("lessCoinsTitle", language), getString("lessCoinsDesc", language),)}>
                                <Text style={homeScreenStyles.homeBtnText}>{getString('createRoom', language)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={homeScreenStyles.homeBtn}
                                              onPress={() => navigation.navigate('JoinRoom')}>
                                <Text style={homeScreenStyles.homeBtnText}>{getString('joinRoom', language)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <TouchableOpacity style={{borderBottomColor: "#fff", borderBottomWidth: 1}}
                                                  onPress={() => {
                                                      navigation.navigate('Offline', {
                                                          roomName: Math.floor(100000 + Math.random() * 900000).toString(),
                                                          player1Details: {
                                                              userName: userData.userName,
                                                              id: userData.id,
                                                              profileImage: userData.profileImage,
                                                              coins: userData.coins
                                                          },
                                                          player2Details: {

                                                              userName: "Guest", profileImage: '', coins: 0
                                                          }

                                                      })
                                                  }}
                                >

                                    <Text
                                        style={loginScreenStyles.facebookText}>{getString('playOnSingleDevice', language)}</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </SafeAreaView>)

    // return (
    //     <View style={{ marginTop: 200 }}>
    //         <TouchableOpacity onPress={() => navigation.navigate('CreateRoom')}><Text>Create Room</Text></TouchableOpacity>
    //         <TouchableOpacity onPress={() => navigation.navigate('JoinRoom')}><Text>Join Room</Text></TouchableOpacity>
    //
    //     </View>
    //     )
}

export default Home