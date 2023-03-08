import React, { useContext, useEffect, useState } from 'react'
import { Image, ImageBackground, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { commonStyles } from "../css/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginScreenStyles } from "../css/loginScreenStyles";
import { homeScreenStyles } from "../css/homeScreenStyles";
import { AuthContext } from "../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL, UserProfileImage } from "../Config";

function Home({ navigation }) {
    const { userInfo, setIsAvatar, isAvatar, userData, avatar, setAvatar, setUserData } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState(null);

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
            console.log(res.data.message[0]);
        })
        AsyncStorage.getItem('isAvatar').then((res) => {
            if (res === 'true') {
                setIsAvatar(true)
            } else {
                setIsAvatar(false)
            }

        })
    }



    return (<View style={commonStyles.centerContainer}>
        <LinearGradient colors={['#DB4A39', '#FFFFFF']}
            start={{ x: 1, y: 0.3 }}
            end={{ x: 0, y: 1 }} style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
            <View style={homeScreenStyles.userSection}>
                <Image source={require('../../assets/logoHorizontal.png')} />
                <View style={{ marginBottom: 30 }}>
                    {isAvatar ? <ImageBackground
                        source={UserProfileImage(userDetails ? userDetails.profileImage : '')}
                        imageStyle={{ borderRadius: 30 }}
                        style={homeScreenStyles.userImage}>
                        <TouchableOpacity onPress={() => navigation.navigate('Avatar')}>
                            <Image source={require('../../assets/editLogo.png')} style={homeScreenStyles.editLogo} />
                        </TouchableOpacity>
                        <View style={homeScreenStyles.usernameDiv}>
                            <Text style={homeScreenStyles.usernameText}>{userDetails ? userDetails.userName : ''}</Text>
                        </View>
                    </ImageBackground> :
                        <ImageBackground
                            source={userDetails ? { uri: userDetails.profileImage } : require('../../assets/placeholder.jpeg')}
                            imageStyle={{ borderRadius: 30 }}
                            style={homeScreenStyles.userImage}>
                            <TouchableOpacity onPress={() => navigation.navigate('Avatar')}>
                                <Image source={require('../../assets/editLogo.png')}
                                    style={homeScreenStyles.editLogo} />
                            </TouchableOpacity>
                            <View style={homeScreenStyles.usernameDiv}>
                                <Text
                                    style={homeScreenStyles.userName}>{userDetails ? userDetails.userName : ''}</Text>
                            </View>
                        </ImageBackground>

                    }
                </View>
                <View style={homeScreenStyles.coinsDiv}>
                    <Image source={require('../../assets/coin.png')} style={homeScreenStyles.coinImg} />
                    <Text style={homeScreenStyles.coinsText}>{userDetails ? userDetails.coins : "2500"}</Text>
                </View>
            </View>
            <View style={loginScreenStyles.authSection}>
                <LinearGradient colors={['#0073C5', '#9069FF']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[commonStyles.centerContainer, commonStyles.fullWidth, commonStyles.borderTopRd]}>
                    <View style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                        <TouchableOpacity style={homeScreenStyles.homeBtn}
                            onPress={() => navigation.navigate('CreateRoom')}>
                            <Text style={homeScreenStyles.homeBtnText}>Create Room</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={homeScreenStyles.homeBtn}
                            onPress={() => navigation.navigate('JoinRoom')}>
                            <Text style={homeScreenStyles.homeBtnText}>Join Room</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <TouchableOpacity style={{ borderBottomColor: "#fff", borderBottomWidth: 1 }} onPress={() => {
                                navigation.navigate('Offline', {
                                    roomName: Math.floor(100000 + Math.random() * 900000).toString(), player1Details: {
                                        userName: userData.userName, id: userData.id, profileImage: userData.profileImage, coins: userData.coins
                                    }, player2Details: {

                                        userName: "Guest", profileImage: '', coins: 0
                                    }

                                })
                            }}
                            >

                                <Text style={loginScreenStyles.facebookText}>Play Offline</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </LinearGradient>
    </View>)

    // return (
    //     <View style={{ marginTop: 200 }}>
    //         <TouchableOpacity onPress={() => navigation.navigate('CreateRoom')}><Text>Create Room</Text></TouchableOpacity>
    //         <TouchableOpacity onPress={() => navigation.navigate('JoinRoom')}><Text>Join Room</Text></TouchableOpacity>
    //
    //     </View>
    //     )
}

export default Home