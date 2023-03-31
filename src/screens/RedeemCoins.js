import {LinearGradient} from 'expo-linear-gradient'
import React, {useContext, useEffect, useState} from 'react'
import {ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import InternetAlert from '../components/InternetAlert'
import {AuthContext} from '../context/AuthContext'
import {commonStyles} from '../css/commonStyles'
import {getString} from '../language/Strings'
import LandscapeLogo from '../components/LandscapeLogo'
import {homeScreenStyles} from '../css/homeScreenStyles'
import axios from 'axios'
import {BASE_URL, coupons} from '../Config'
import AsyncStorage from "@react-native-async-storage/async-storage";


const RedeemCoins = ({navigation, route}) => {
    const {
        language, isConnected, checkConnection, isGuestUser
    } = useContext(AuthContext);

    const [availableCoupons, setAvailableCoupons] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false)
    const [coupon, setCoupon] = useState(0)
    const [coins, setCoins] = useState(0);
    const [description, setDescription] = useState("");
    const [processing, setProcessing] = useState(false);
    const [msg, setMsg] = useState("")
    const [couponRedeemed, setCouponRedeemed] = useState(false);
    const [couponId, setCouponId] = useState("");
    const [isCouponAvailable, setCouponAvailable] = useState(true);

    useEffect(() => {
        getCoupons().then();
    }, []);


    const getCoupons = async () => {
        await axios.get(`${BASE_URL}/api/coupons`).then((res) => {
            let englishCoupons = [];
            let frenchCoupons = [];
            res.data.message.forEach((item) => {
                if (item.lang === 'en') {
                    englishCoupons.push(item);
                } else {
                    frenchCoupons.push(item);
                }
            })

            if (language === "en") {
                setAvailableCoupons(englishCoupons)
            } else {
                setAvailableCoupons(frenchCoupons)
            }
        })
    }

    const purchase = (coupon) => {
        setCoupon(coupon.code);
        setDescription(coupon.description);
        setShowPopUp(true);
        setCouponId(coupon["_id"]);
        setCoins(coupon.price);
    }


    const redeemNow = async () => {
        setProcessing(true);
        const userInfo = await AsyncStorage.getItem('userInfo');
        const userId = JSON.parse(userInfo);
        let userDetails = null
        await axios.get(`${BASE_URL}/api/OAuthUsers/${userId.id}`).then((res) => {
            userDetails = res.data.message[0];
        })
        if (userDetails.coins < coins) {
            setProcessing(false)
            Alert.alert(getString("lessCoinsForCouponTitle", language), getString("lessCoinsForCouponDesc", language),)
            setShowPopUp(false)

        } else {
            await axios.get(`${BASE_URL}/api/updateCouponUsers/${couponId}`).then((res) => {
                if (res.data.message === "Coupon updated successfully.") {
                    setCouponAvailable(true);
                    const coinsData = {
                        "userId": userDetails.id,
                        "userCoins": coins,
                        "operation": "sub"
                    }
                    axios.post(`${BASE_URL}/api/changeUserCoins`, coinsData).then(() => {
                            setMsg(getString("transactionSuccessfull", language))
                            setProcessing(false)
                            setCouponRedeemed(true)
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
                } else {
                    setCouponAvailable(false);
                }


            });

        }
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
                top: "30%",
                zIndex: 10,
                alignItems: "center",
                alignSelf: "center",
                width: "80%",
                padding: 20,
                borderRadius: 15
            }}>
                {processing && <ActivityIndicator/>}

                {!isCouponAvailable && <Text>Selected Coupon is not available</Text>}
                {couponRedeemed ?
                    <View style={styles.centerContainer}>
                        <Text style={styles.couponText}>Code: {coupon}</Text>
                        <Text style={{textAlign: "center"}}>{getString('noteDown', language)}</Text>
                        <TouchableOpacity style={{
                            backgroundColor: "#0073C5",
                            padding: 10,
                            paddingHorizontal: 20,
                            margin: 10,
                            marginTop: 20,
                            color: "#FFF",
                            borderRadius: 10
                        }} onPress={() => {
                            setCouponRedeemed(false);
                            setShowPopUp(false);
                        }} disabled={processing}>
                            <Text style={{color: "#fff"}}>{getString('done', language)}</Text>
                        </TouchableOpacity>
                    </View> :
                    <>
                        <View
                            style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontSize: 20, fontWeight: "bold", marginVertical: 20, textAlign: "center"}}>
                                {description}</Text>
                        </View>


                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity style={{
                                backgroundColor: "#000",
                                padding: 10,
                                paddingHorizontal: 20,
                                margin: 10,
                                color: "#FFF",
                                borderRadius: 10
                            }} disabled={processing} onPress={() => setShowPopUp(false)}>
                                <Text style={{
                                    color: "#FFF",
                                }}>{getString('cancel', language)}</Text>
                            </TouchableOpacity>
                            {!isGuestUser && <TouchableOpacity style={{
                                backgroundColor: "#0073C5",
                                padding: 10,
                                paddingHorizontal: 20,
                                margin: 10,
                                color: "#FFF",
                                borderRadius: 10
                            }} onPress={() => redeemNow()} disabled={processing}>
                                <Text style={{color: "#fff"}}>{getString('redeem', language)}</Text>
                            </TouchableOpacity>}
                        </View>
                    </>
                }
            </View>
        </>
    )

    return (

        <SafeAreaView style={{flex: 1}}>
            {showPopUp && redeemNowPopUp()}
            <ScrollView>
                <InternetAlert checkConnection={checkConnection} language={language} isConnected={isConnected}/>
                <LinearGradient colors={['#0073C5', '#9069FF']}
                                start={{x: 1, y: 0}}
                                end={{x: 0, y: 1}} style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                    <LandscapeLogo/>
                    <View>
                        <Text style={styles.text}>{getString('redeemCoupon', language)}</Text>
                    </View>
                    {isGuestUser &&
                        <Text style={{
                            padding: 10,
                            backgroundColor: "#FFF",
                            borderRadius: 10,
                            marginTop: 20,
                            width: "90%",
                            textAlign: "center"
                        }}>{getString('guestCouponMsg', language)}
                        </Text>}
                    {msg &&
                        <Text style={{
                            padding: 10,
                            backgroundColor: "#FFF",
                            borderRadius: 10,
                            marginTop: 10
                        }}>{msg}</Text>}
                    <View style={styles.groupOfGroups}>
                        {availableCoupons.map((item, index) =>
                            <View key={index} style={styles.singleItem}>
                                <View style={{
                                    flexDirection: "row", justifyContent: "center", alignItems: "center",
                                }}>
                                    <Image source={{uri: item.logoImg}} style={styles.couponImg}/>

                                </View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                    <Image source={require('../../assets/coin.png')} style={homeScreenStyles.coinImg}/>
                                    <Text style={[homeScreenStyles.coinsText, {
                                        marginTop: 2,
                                        textAlign: "center"
                                    }]}>{item.price}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    purchase(item);
                                }} style={styles.detailsBtn}>
                                    <Text style={styles.buyNowText}>{
                                        getString('details', language)}
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
        height: 240,
        paddingVertical: 20, paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "space-between"
    },
    groupOfGroups: {
        paddingVertical: "10%",
        paddingHorizontal: "5%",
        flex: 1,
        width: "100%",

    },
    detailsBtn: {
        borderRadius: 10,
        backgroundColor: "#0073C5",
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    buyNowText: {
        color: "#FFF",
        fontWeight: "bold"
    },
    text: {
        fontSize: 25,
        letterSpacing: 2,
        color: "#fff",
        fontWeight: "bold",
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1,
        textAlign: "center"
    },
    couponText: {
        fontSize: 25,
        letterSpacing: 2,
        fontWeight: "bold",
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1,
        marginBottom: 20
    },
    couponImg: {
        width: 140,
        height: 120,
    },
    centerContainer: {
        alignItems: "center",
        justifyContent: "center"
    }
})