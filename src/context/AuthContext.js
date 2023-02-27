import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import React, { createContext, useEffect, useRef, useState } from 'react'
import { BASE_URL, taskList1 } from '../Config';
import Navigation from '../Navigation';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Google from 'expo-auth-session/providers/google';
import { UserDataModel } from "../models/userDataModel";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [splashLoading, setSplashLoading] = useState(true)
    const [activePlayerId, setActivePlayerId] = useState(1);
    const [myPlayerId, setMyPlayerId] = useState(1);
    const [userInfo, setUserInfo] = useState(null);

    const [playBackSteps, setPlayBackSteps] = useState(2)
    const [taskIndex, setTaskIndex] = useState(-1)
    // const [avatar, setAvatar] = useState('male');
    // const [userData, setUserData] = useState(null);
    const [taskList, setTaskList] = useState(taskList1)

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [userData, setUserData] = useState(new UserDataModel());

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: Constants.manifest.extra.IOS_KEY,
        iosClientId: Constants.manifest.extra.ANDROID_KEY,
        expoClientId: Constants.manifest.extra.EXPO_CLIENT_ID
    })

    const [isAvatar, setIsAvatar] = useState(false);
    const [avatar, setAvatar] = useState('../../assets/maleAvatar.png');

    useEffect(() => {
        if (response?.type === 'success') {
            AsyncStorage.setItem('googleAccessToken', JSON.stringify(response.authentication.accessToken)).then();
            setUserExist(false);
            // setIsUserLoggedIn(true); // TODO check line 54.
            setGoogleUserLoginData(response).then();
        }
    }, [response]);

    const setGoogleUserLoginData = async (response) => {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${response.authentication.accessToken}` }
        })

        userInfoResponse.json().then(async data => {
            setUserData(prevState => {
                prevState.id = data.id
                prevState.family_name = data.family_name
                prevState.given_name = data.given_name
                prevState.name = data.name
                prevState.email = data.email
                prevState.verified_email = data.verified_email
                prevState.profileImage = data.picture
                return prevState
            })
            await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
            await axios.post(`${BASE_URL}/api/loginByOAuth`, userData).then((apiRes) => {
                setUserExist(true);
                setIsUserLoggedIn(true);
            });
            const coinsData = {
                "userId": data.id,
                "userCoins": 1000,
                "operation": "add"
            }
            // await axios.post(`${BASE_URL}/api/changeUserCoins`, coinsData).then((res)=>{
            //     console.log("res coins :: => ::",res);
            // }) //todo update when backend is fixed

        })

    }

    const logout = () => {
        setIsLoading(true);
        // axios.post(`${BASE_URL}/api/v1/logout`, {}, {
        //     headers: {
        //         Authorization: `Bearer ${userInfo.access_token}`
        //     }
        // }).then(res => {
        //     AsyncStorage.removeItem('userInfo');
        //     setUserInfo(null);
        //     setIsLoading(false);

        // }).catch(e => {
        //     console.log(`logout error ${e.response}`);
        AsyncStorage.removeItem('googleAccessToken');
        setIsLoading(false);
        // })

        //logout
    }


    const isLoggedIn = async () => {
        setIsLoading(true);
        setSplashLoading(true);
        setTimeout(() => {
            setSplashLoading(false);
        }, 8000);

        await AsyncStorage.getItem('isAvatar').then((res) => {
            setIsAvatar(res)
        })

        await AsyncStorage.getItem('avatar').then(res => {
            setAvatar(res);
        })

        AsyncStorage.removeItem('googleAccessToken');
        AsyncStorage.removeItem('userInfo');

        NetInfo.fetch().then(async (state) => {
            if (!state.isConnected) {
                console.log("connection")
                Alert.alert("Internet Required", "Please connect to the internet, and restart the app")
                setIsLoading(false)
            } else {
                try {
                    await AsyncStorage.getItem('userInfo').then(async (res) => {
                        if (res) {
                            setUserInfo(res);
                            setUserData(prevState => {
                                const response = JSON.parse(res);
                                prevState.id = response.id
                                prevState.family_name = response.family_name
                                prevState.given_name = response.given_name
                                prevState.name = response.name
                                prevState.email = response.email
                                prevState.verified_email = response.verified_email
                                prevState.profileImage = isAvatar ? avatar : response.picture
                                return prevState
                            })
                            await axios.post(`${BASE_URL}/api/loginByOAuth`, userData).then((apiRes) => {
                                console.log("TRUE :: => ::", apiRes);
                                if (apiRes.data.message === 'User Exists. Please log in.') {
                                    setUserExist(true);
                                    setIsUserLoggedIn(true);
                                }
                            })
                        } else {
                            setIsUserLoggedIn(false);
                        }
                    })
                } catch (e) {
                    // console.log("Yes" + e);
                    setIsLoading(false);
                }
            }
        });
    }

    useEffect(() => {
        isLoggedIn().then();
    }, []);

    return (
        <AuthContext.Provider value={{
            setTaskList,
            taskList,
            taskIndex,
            setTaskIndex,
            playBackSteps,
            setPlayBackSteps,
            myPlayerId,
            setMyPlayerId,
            activePlayerId,
            setActivePlayerId,
            setIsLoading,
            isLoading,
            splashLoading,
            logout,
            promptAsync,
            isUserLoggedIn,
            userExist,
            userInfo,
            isAvatar,
            avatar, setAvatar, userData, setUserData,

        }}>{children}
        </AuthContext.Provider>

    )
}

