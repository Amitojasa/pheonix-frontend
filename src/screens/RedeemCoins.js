import {LinearGradient} from 'expo-linear-gradient'
import React, {useContext, useState} from 'react'
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import InternetAlert from '../components/InternetAlert'
import {AuthContext} from '../context/AuthContext'
import {commonStyles} from '../css/commonStyles'
import {loginScreenStyles} from '../css/loginScreenStyles'
import {getString} from '../language/Strings'
import LandscapeLogo from '../components/LandscapeLogo'
import {homeScreenStyles} from '../css/homeScreenStyles'
import axios from 'axios'
import {BASE_URL, coupons} from '../Config'
import {useScrollToTop} from "@react-navigation/native";


const RedeemCoins = ({navigation, route}) => {
    const {userDetails} = route.params;
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

    const [showPopUp, setShowPopUp] = useState(false)
    const [coupon, setCoupon] = useState(0)
    const [coins, setCoins] = useState(0)
    const [processing, setProcessing] = useState(false);
    const [msg, setMsg] = useState("")

    const ref = React.useRef(null);

    const onPressTouch = () => {
        ref.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }

    const purchase = (coupon, coins) => {
        console.log(userDetails);
        setCoupon(coupon);
        setCoins(coins);
        setShowPopUp(true);

    }


    const redeemNow = async () => {
        setProcessing(true);
        const coinsData = {
            "userId": userDetails.id,
            "userCoins": coins,
            "operation": "sub"
        }
        console.log("con data:", coinsData);
        await axios.post(`${BASE_URL}/api/changeUserCoins`, coinsData).then(() => {
                setMsg(getString("transactionSuccessfull", language))
                setProcessing(false)
                setShowPopUp(false)
                setTimeout(() => {
                    setMsg("");
                }, 5000)
            }
        ).catch(err => {
            setMsg(getString("someErrorOccured", language))
            setProcessing(false)
            setShowPopUp(false)
            setTimeout(() => {
                setMsg("");
            }, 5000)

            console.log(err);
        })

    }

    const redeemNowPopUp = () => (
        <>
            <View style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#000',
                opacity: 0.5,
                zIndex: 8,
            }}></View>
            <View style={{
                backgroundColor: "#FFF",
                position: "absolute",
                top: "20%",
                zIndex: 10,
                alignItems: "center",
                alignSelf: "center",
                width: "80%",
                padding: 20,
                borderRadius: 15
            }}>
                {processing && <ActivityIndicator/>}
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <Image source={require('../../assets/coin.png')} style={homeScreenStyles.coinImg}/>
                    <Text style={{fontSize: 20, fontWeight: "bold", marginVertical: 20}}>
                        {coins}</Text>
                </View>


                <View style={{flexDirection: "row"}}><TouchableOpacity disabled={processing}
                                                                       onPress={() => setShowPopUp(false)}>
                    <Text style={{
                        backgroundColor: "#000",
                        padding: 10,
                        paddingHorizontal: 20,
                        margin: 10,
                        color: "#FFF",
                        borderRadius: 10
                    }}>{getString('cancel', language)}</Text>
                </TouchableOpacity>
                    <TouchableOpacity onPress={() => redeemNow()} disabled={processing}>
                        <Text style={{
                            backgroundColor: "#1FAA59",
                            padding: 10,
                            paddingHorizontal: 20,
                            margin: 10,
                            color: "#FFF",
                            borderRadius: 10
                        }}>{getString('redeem', language)}</Text>
                    </TouchableOpacity></View>

            </View>
        </>
    )

    return (

        <SafeAreaView style={{flex: 1}}>
            <ScrollView ref={ref}>
                <InternetAlert checkConnection={checkConnection} language={language} isConnected={isConnected}/>
                {showPopUp && redeemNowPopUp()}
                <LinearGradient colors={['#DB4A39', '#FFFFFF']}
                                start={{x: 1, y: 0.3}}
                                end={{x: 0, y: 1}} style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                    <LandscapeLogo/>
                    <View style={[{marginTop: 10, padding: "5%", borderRadius: 15, backgroundColor: "#FFF"}]}>
                        <Text style={loginScreenStyles.loginText}>{getString('redeemCoupon', language)}</Text>
                    </View>
                    {msg &&
                        <Text style={{
                            padding: 10,
                            backgroundColor: "#FFF",
                            borderRadius: 10,
                            marginTop: 10
                        }}>{msg}</Text>}
                    <View style={styles.groupOfGroups}>
                        {coupons.map((item, index) =>
                            <View key={index} style={styles.singleItem}>
                                <View style={{
                                    flexDirection: "row", justifyContent: "center", alignItems: "center",
                                }}>
                                    <Text style={homeScreenStyles.coinsText}>{item.couponTitle}</Text>
                                </View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                    <Image source={require('../../assets/coin.png')} style={homeScreenStyles.coinImg}/>
                                    <Text style={[homeScreenStyles.coinsText, {
                                        marginTop: 2,
                                        textAlign: "center"
                                    }]}>{item.coins}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    purchase(item.id, item.coins);
                                    onPressTouch();
                                }} style={styles.buyNowBtn}>
                                    <Text style={styles.buyNowText}>{
                                        getString('redeemNow', language)}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </LinearGradient>
            </ScrollView>
        </SafeAreaView>

    )
}

export default RedeemCoins


const styles = StyleSheet.create({
    groupOfTwo: {
        flexDirection: "row",

    },
    singleItem: {
        flex: 1,
        backgroundColor: "#FFF",
        margin: 10,
        borderRadius: 10,
        height: 200,
        paddingVertical: 20, paddingHorizontal: 10,
        justifyContent: "space-between"
    },
    groupOfGroups: {
        paddingVertical: "10%",
        paddingHorizontal: "5%",
        flex: 1,
        width: "100%"
    },
    buyNowBtn: {
        borderRadius: 10,
        backgroundColor: "#1FAA59",
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    buyNowText: {
        color: "#FFF",
        fontWeight: "bold"
    }
})