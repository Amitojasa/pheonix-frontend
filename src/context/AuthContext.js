import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import React, { createContext, useEffect, useRef, useState } from 'react'
import { BASE_URL, taskList1 } from '../Config';
import Navigation from '../Navigation';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';
import Constants from 'expo-constants';
import * as Google from 'expo-auth-session/providers/google';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [splashLoading, setSplashLoading] = useState(true)
    const [activePlayerId, setActivePlayerId] = useState(1);
    const [myPlayerId, setMyPlayerId] = useState(1);
    const [userInfo, setUserInfo] = useState(null);

    const [playBackSteps, setPlayBackSteps] = useState(2)
    const [taskIndex, setTaskIndex] = useState(-1)

    const [taskList, setTaskList] = useState(taskList1)

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userExist, setUserExist] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: Constants.manifest.extra.IOS_KEY,
        iosClientId: Constants.manifest.extra.ANDROID_KEY,
        expoClientId: Constants.manifest.extra.EXPO_CLIENT_ID
    })

    const [isAvatar, setIsAvatar] = useState(false);
    const [avatar, setAvatar] = useState('male');

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
            if (await AsyncStorage.getItem('userInfo')) {
                setUserExist(true);
            } else {
                await AsyncStorage.setItem('userInfo', JSON.stringify(data));
                setUserInfo(data);

                axios.post(`${BASE_URL}/api/loginByOAuth`, data).then((apiRes) => {
                    console.log('res :: = > :: ', apiRes);
                });
                setIsUserLoggedIn(true); //TODO do this instead of line 31.
                setUserExist(false);
            }

        })
    }

    const login = (username, password) => {
        if (username == '' || password == '') {
            // Toast.show("Password or Username is empty"); //ToDo use some other toaster
            return;
        }
        setIsLoading(true);
        //change link

        // axios.post(`${BASE_URL}/api/v1/login`, {
        //     username, password
        // }).then(res => {
        let loginRes = 'a';

        AsyncStorage.setItem('userInfo', JSON.stringify(loginRes))
        setIsLoading(false);
        console.log('success')
        // }).catch(e => {
        //     // console.log(e.response)
        //     Toast.show(e?.response?.data?.msg ? e?.response?.data?.msg : "Some error occured. Contact support team");
        //     setIsLoading(false);
        // })
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

        // AsyncStorage.removeItem('googleAccessToken');
        // AsyncStorage.removeItem('userInfo');

        NetInfo.fetch().then(async (state) => {
            if (!state.isConnected) {
                console.log("connection")
                Alert.alert("Internet Required", "Please connect to the internet, and restart the app")
                setIsLoading(false)
            } else {
                try {
                    await AsyncStorage.getItem('userInfo').then(async (res) => {
                        if (res) {
                            console.log("RES :: => ::", res);
                            setUserInfo(res);
                            // axios.post(`${BASE_URL}/api/loginByOAuth`, res).then((apiRes) => {
                            //     if (apiRes.message === 'User Exists. Please log in.') {
                            //         setUserExist(true);  //ToDo uncomment this when backend api is fixed.
                            //     }
                            // });
                            setUserExist(true);  //ToDo uncomment this when backend api is fixed.
                            setIsUserLoggedIn(true);
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
            login,
            setIsLoading,
            isLoading,
            splashLoading,
            logout,
            promptAsync,
            isUserLoggedIn,
            userExist,
            userInfo,
            isAvatar,
            avatar
        }}>{children}
        </AuthContext.Provider>

    )
}

