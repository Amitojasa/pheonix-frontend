import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import React, {createContext, useEffect, useRef, useState} from 'react'
import {BASE_URL} from '../Config';
import Navigation from '../Navigation';
import NetInfo from "@react-native-community/netinfo";
import {Alert} from 'react-native';
import Constants from 'expo-constants';
import * as Google from 'expo-auth-session/providers/google';
import {ApiClient} from "../utils/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false)
    const [splashLoading, setSplashLoading] = useState(true)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userExist, setUserExist] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: Constants.manifest.extra.IOS_KEY,
        iosClientId: Constants.manifest.extra.ANDROID_KEY,
        expoClientId: Constants.manifest.extra.EXPO_CLIENT_ID
    })

    useEffect(() => {
        if (response?.type === 'success') {
            AsyncStorage.setItem('googleAccessToken', JSON.stringify(response.authentication.accessToken)).then();
            // setIsUserLoggedIn(true); // TODO check line 54.
            setGoogleUserLoginData(response).then();
        }
    }, [response]);

    const setGoogleUserLoginData = async (response) => {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {Authorization: `Bearer ${response.authentication.accessToken}`}
        })

        userInfoResponse.json().then(async data => {
            await AsyncStorage.setItem('userInfo', JSON.stringify(data));
            axios.post(`${BASE_URL}/api/loginByOAuth`, data).then((apiRes) => {
                console.log('res :: = > :: ', apiRes);
            });
            setIsUserLoggedIn(true); //TODO do this instead of line 31.
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
        }, 4000);

        await AsyncStorage.removeItem('googleAccessToken');
        await AsyncStorage.removeItem('userInfo')
        NetInfo.fetch().then(async (state) => {
            if (!state.isConnected) {
                console.log("connection")
                Alert.alert("Internet Required", "Please connect to the internet, and restart the app")
                setIsLoading(false)
            } else {
                try {
                    await AsyncStorage.getItem('userInfo').then(async (res) => {
                        if (res) {
                            axios.post(`${BASE_URL}/api/loginByOAuth`, res).then((apiRes) => {
                                if (apiRes.message === 'User Exists. Please log in.') {
                                    setUserExist(true);  //ToDo uncomment this when backend api is fixed.
                                }
                            });
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
        <AuthContext.Provider
            value={{
                login,
                setIsLoading,
                isLoading,
                splashLoading,
                logout,
                promptAsync,
                isUserLoggedIn
            }}>{children}
        </AuthContext.Provider>
    )
}

