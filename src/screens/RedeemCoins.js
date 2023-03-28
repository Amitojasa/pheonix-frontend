import {LinearGradient} from 'expo-linear-gradient'
import React, {useContext, useState} from 'react'
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import InternetAlert from '../components/InternetAlert'
import {AuthContext} from '../context/AuthContext'
import {commonStyles} from '../css/commonStyles'
import {getString} from '../language/Strings'
import LandscapeLogo from '../components/LandscapeLogo'
import {homeScreenStyles} from '../css/homeScreenStyles'
import axios from 'axios'
import {BASE_URL, coupons} from '../Config'


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
    const [coins, setCoins] = useState(0);
    const [description, setDescription] = useState("");
    const [processing, setProcessing] = useState(false);
    const [msg, setMsg] = useState("")
    const [couponRedeemed, setCouponRedeemed] = useState(false);

    const ref = React.useRef(null);

    const onPressTouch = () => {
        ref.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }

    const purchase = (coupon) => {
        console.log(userDetails);
        setCoupon(coupon.couponCode);
        setDescription(coupon.description);
        setShowPopUp(true);
        setCoins(coupon.coins);

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
                // setShowPopUp(false)
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

                {couponRedeemed ?
                    <View style={styles.centerContainer}>
                        <Text style={styles.couponText}>Code: {coupon}</Text>
                        <TouchableOpacity style={{
                            backgroundColor: "#0073C5",
                            padding: 10,
                            paddingHorizontal: 20,
                            margin: 10,
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
                            <Text style={{fontSize: 20, fontWeight: "bold", marginVertical: 20}}>
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
                            <TouchableOpacity style={{
                                backgroundColor: "#0073C5",
                                padding: 10,
                                paddingHorizontal: 20,
                                margin: 10,
                                color: "#FFF",
                                borderRadius: 10
                            }} onPress={() => redeemNow()} disabled={processing}>
                                <Text style={{color: "#fff"}}>{getString('redeem', language)}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </View>
        </>
    )

    return (

        <SafeAreaView style={{flex: 1}}>
            <ScrollView ref={ref}>
                <InternetAlert checkConnection={checkConnection} language={language} isConnected={isConnected}/>
                {showPopUp && redeemNowPopUp()}
                <LinearGradient colors={['#0073C5', '#9069FF']}
                                start={{x: 1, y: 0}}
                                end={{x: 0, y: 1}} style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                    <LandscapeLogo/>
                    <View>
                        <Text style={styles.text}>{getString('redeemCoupon', language)}</Text>
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
                                    {/*<Text style={homeScreenStyles.coinsText}>{item.couponTitle}</Text>*/}
                                    <Image source={item.image} style={styles.couponImg}/>

                                </View>
                                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                    <Image source={require('../../assets/coin.png')} style={homeScreenStyles.coinImg}/>
                                    <Text style={[homeScreenStyles.coinsText, {
                                        marginTop: 2,
                                        textAlign: "center"
                                    }]}>{item.coins}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    purchase(item);
                                    onPressTouch();
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
        height: 210,
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
    },
    couponText:{
        fontSize: 25,
        letterSpacing: 2,
        fontWeight: "bold",
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1,
        marginBottom:20
    },
    couponImg: {
        width: 80,
        height: 80,
    },
    centerContainer:{
        alignItems:"center",
        justifyContent:"center"
    }
})