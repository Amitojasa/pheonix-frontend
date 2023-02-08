// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../Config';
import Navigation from '../Navigation';
import NetInfo from "@react-native-community/netinfo";
import { Alert } from 'react-native';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [splashLoading, setSplashLoading] = useState(true)
    const login = (username, password) => {
        if (username == '' || password == '') {
            Toast.show("Password or Username is empty");
            return;
        }
        setIsLoading(true);
        //change link

        // axios.post(`${BASE_URL}/api/v1/login`, {
        //     username, password
        // }).then(res => {
        let loginRes = 'a';

        AsyncStorage.setItem('userInfo', JSON.stringify(loginRes))
        setUserInfo(loginRes)
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
        AsyncStorage.removeItem('userInfo');
        setUserInfo(null);
        setIsLoading(false);
        // })

        //logout
    }


    const isLoggedIn = async () => {



        setIsLoading(true);
        // setSplashLoading(true);
        // setTimeout(() => {
        setSplashLoading(false);
        // }, 4000);

        NetInfo.fetch().then(async (state) => {
            if (!state.isConnected) {
                console.log("connection")
                Alert.alert("Internet Required", "Please connect to the internet, and restart the app")
                setIsLoading(false)
            } else {
                // try {
                let userInfo = await AsyncStorage.getItem('userInfo');
                setUserInfo(userInfo)

                //     let userInfo = await AsyncStorage.getItem('userInfo');
                //     let userInfo1 = JSON.parse(userInfo);
                //     //check for token expired or not

                //     await axios.get(`${BASE_URL}/api/mobile/v1/user-info`, {
                //         headers: {
                //             Authorization: `Bearer ${userInfo1.access_token}`
                //         }
                //     }).then(res => {
                //         if (userInfo1) {
                //             setUserInfo(userInfo1)
                //         }
                //         setIsLoading(false);
                //     }).catch(e => {

                //         setIsLoading(false);
                //     })




                // } catch (e) {
                //     // console.log("Yes" + e);
                //     setIsLoading(false);
                // }
            }
        });



    }

    useEffect(() => {

        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, setIsLoading, isLoading, userInfo, splashLoading, logout }} >{children}
        </AuthContext.Provider >
    )
}

