import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import React, { createContext, useEffect, useRef, useState } from 'react'
import { avatarImage, BASE_URL, taskList1, bigTaskList1 } from '../Config';
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
    const [language, setLanguage] = useState('en');

    const [playBackSteps, setPlayBackSteps] = useState(2)
    const [taskIndex, setTaskIndex] = useState(-1)

    const [taskList, setTaskList] = useState(taskList1)
    const [bigTask, setBigTask] = useState(bigTaskList1[Math.floor(Math.random() * (10))])

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [userData, setUserData] = useState();
    const [isAvatar, setIsAvatar] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: Constants.manifest.extra.IOS_KEY,
        iosClientId: Constants.manifest.extra.ANDROID_KEY,
        expoClientId: Constants.manifest.extra.EXPO_CLIENT_ID
    })

    useEffect(() => {
        if (response?.type === 'success') {
            AsyncStorage.setItem('googleAccessToken', JSON.stringify(response.authentication.accessToken)).then();
            setUserExist(false);
            setGoogleUserLoginData(response).then();
        }
    }, [response]);

    const setUserDetails = async (userDetails, data) => {
        await AsyncStorage.setItem('userInfo', JSON.stringify(userDetails));
        await axios.post(`${BASE_URL}/api/loginByOAuth`, userDetails).then(async (apiRes) => {
            console.log("aPI RES ;; => :;", apiRes)
            const coinsData = {
                "userId": data.id,
                "userCoins": 1000,
                "operation": "add"
            }
            console.log("COINS DATA :: => ::", coinsData)
            if (apiRes.data.message !== 'User Exists. Please log in.') {
                await axios.post(`${BASE_URL}/api/changeUserCoins`, coinsData).catch(er => console.log(er));
            }

            setUserExist(true);
            setIsUserLoggedIn(true);
            console.log(userDetails);
            setUserData(userDetails)
        });
    }

    const handleGuestLogin = () => {
        const username = ('guest' + Math.floor(Math.random() * 100000)).substring(0, 10).toLowerCase();

        const userDetails = {
            id: Math.floor(Math.random() * 10000000000),
            family_name: 'guest',
            given_name: username,
            name: username,
            email: username + '@gmail.com',
            verified_email: true,
            profileImage: avatarImage[Math.floor(Math.random() * avatarImage.length)],
            userName: username
        }

        const data = {
            id: userDetails.id
        }
        setUserDetails(userDetails, data).then();
        console.log("GUEST USER DETAILS :: => ::", userDetails)
    }

    const setGoogleUserLoginData = async (response) => {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${response.authentication.accessToken}` }
        })

        userInfoResponse.json().then(async data => {
            const username = (data.given_name.replace(/ /g, '').substring(0, 5) + Math.floor(Math.random() * 100000)).substring(0, 10).toLowerCase();
            console.log('username ---------', username)
            const userDetails = {
                id: data.id,
                family_name: data.family_name,
                given_name: data.given_name,
                name: data.name,
                email: data.email,
                verified_email: data.verified_email,
                profileImage: avatarImage[Math.floor(Math.random() * avatarImage.length)],
                userName: username
            }

            await AsyncStorage.setItem('userInfo', JSON.stringify(userDetails));
            await axios.post(`${BASE_URL}/api/loginByOAuth`, userDetails).then(async (apiRes) => {
                console.log("aPI RES ;; => :;", apiRes)
                const coinsData = {
                    "userId": data.id,
                    "userCoins": 1000,
                    "operation": "add"
                }

                if (apiRes.data.message !== 'User Exists. Please log in.') {
                    await axios.post(`${BASE_URL}/api/changeUserCoins`, coinsData).catch(er => console.log(er));
                }

                setUserExist(true);
                setIsUserLoggedIn(true);
                console.log(userDetails);
                setUserData(userDetails) //store response
            });


            if (userDetails.profileImage === 'cat' || userDetails.profileImage === 'panda' || userDetails.profileImage == "pig" || userDetails.profileImage === 'monkey' || userDetails.profileImage === 'hen' || userDetails.profileImage === 'fox' || userDetails.profileImage === 'dog' || userDetails.profileImage === 'cow') {
                await AsyncStorage.setItem('isAvatar', "true")
                // console.log("special", userDetails);
                // console.log("Setting isAvatar true");
            }
            else {
                await AsyncStorage.setItem('isAvatar', "false")
                // console.log("special", userDetails);
                // console.log("Setting isAvatar galse");
            }


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

        // await AsyncStorage.getItem('isAvatar').then((res) => {
        //     setIsAvatar(res)
        // })

        // await AsyncStorage.getItem('avatar').then(res => {
        //     setAvatar(res);
        // })

        // AsyncStorage.removeItem('googleAccessToken');
        // AsyncStorage.removeItem('userInfo');
        // AsyncStorage.clear();

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
                            const response = JSON.parse(res);
                            const userDetails = {
                                id: response.id,
                                family_name: response.family_name,
                                given_name: response.given_name,
                                name: response.name,
                                email: response.email,
                                verified_email: response.verified_email,
                                profileImage: response.picture,
                                userName: response.username
                            }
                            await axios.post(`${BASE_URL}/api/loginByOAuth`, userDetails).then((apiRes) => {
                                if (apiRes.data.message === 'User Exists. Please log in.') {
                                    setUserExist(true);
                                    setIsUserLoggedIn(true);
                                    setUserData(userDetails);
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
            bigTask, setBigTask,
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
            isAvatar
            , setUserData, userData, setIsAvatar, language, setLanguage, handleGuestLogin
        }}>{children}
        </AuthContext.Provider>

    )
}

