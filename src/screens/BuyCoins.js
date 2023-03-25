import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import InternetAlert from '../components/InternetAlert'
import { AuthContext } from '../context/AuthContext'
import { commonStyles } from '../css/commonStyles'
import { loginScreenStyles } from '../css/loginScreenStyles'
import { getString } from '../language/Strings'
import LandscapeLogo from '../components/LandscapeLogo'
import { homeScreenStyles } from '../css/homeScreenStyles'
import axios from 'axios'
import { BASE_URL } from '../Config'


const BuyCoins = ({ navigation, route }) => {
    const { userDetails } = route.params;
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
    const [numberOfCoins, setNumberOfCoins] = useState(0)
    const [cost, setCost] = useState(0)
    const [processing, setProcessing] = useState(false);
    const [msg, setMsg] = useState("")

    const purchase = (numberOfCoins1, cost1) => {
        console.log(userDetails);
        setNumberOfCoins(numberOfCoins1);
        setCost(cost1);
        setShowPopUp(true);

    }


    const payNow = async () => {
        setProcessing(true);
        const coinsData1 = {
            "userId": userDetails.id,
            "userCoins": numberOfCoins,
            "operation": "add"
        }
        console.log("con data:", coinsData1);
        await axios.post(`${BASE_URL}/api/changeUserCoins`, coinsData1).then(() => {
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

    const payNowPopUp = () => (
        <>
            <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#000', opacity: 0.5, zIndex: 8, }}></View>
            <View style={{ backgroundColor: "#FFF", position: "absolute", bottom: "45%", zIndex: 10, alignItems: "center", alignSelf: "center", width: "80%", padding: 20, borderRadius: 15 }}>
                {processing && <ActivityIndicator />}
                <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>${cost}</Text>

                <View style={{ flexDirection: "row" }}><TouchableOpacity disabled={processing} onPress={() => setShowPopUp(false)}>
                    <Text style={{ backgroundColor: "#000", padding: 10, paddingHorizontal: 20, margin: 10, color: "#FFF", borderRadius: 10 }}>{getString('cancel', language)}</Text>
                </TouchableOpacity>
                    <TouchableOpacity onPress={() => payNow()} disabled={processing}>
                        <Text style={{ backgroundColor: "#1FAA59", padding: 10, paddingHorizontal: 20, margin: 10, color: "#FFF", borderRadius: 10 }}>{getString('payNow', language)}</Text>
                    </TouchableOpacity></View>

            </View>
        </>
    )

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <InternetAlert checkConnection={checkConnection} language={language} isConnected={isConnected} />
            {showPopUp && payNowPopUp()}
            <LinearGradient colors={['#DB4A39', '#FFFFFF']}
                start={{ x: 1, y: 0.3 }}
                end={{ x: 0, y: 1 }} style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                <LandscapeLogo />
                <View style={[{ marginTop: 10, padding: "5%", borderRadius: 15, backgroundColor: "#FFF" }]}>
                    <Text style={loginScreenStyles.loginText}>{getString('buyCoins', language)}</Text>
                </View>
                {msg && <Text style={{ padding: 10, backgroundColor: "#FFF", borderRadius: 10, marginTop: 10 }}>{msg}</Text>}
                <View style={styles.groupOfGroups}>
                    <View style={styles.groupOfTwo}>
                        <View style={styles.singleItem}>
                            <View style={{
                                flexDirection: "row", justifyContent: "flex-start", alignItems: "center",
                            }}>
                                <Image source={require('../../assets/coin.png')} style={homeScreenStyles.coinImg} />
                                <Text style={homeScreenStyles.coinsText}>1000</Text>
                            </View>

                            <Text style={[homeScreenStyles.coinsText, { marginTop: 2, textAlign: "center" }]}>$10</Text>
                            <TouchableOpacity onPress={() => purchase(1000, 10)} style={styles.buyNowBtn}><Text style={styles.buyNowText}>{getString('buyNow', language)}</Text></TouchableOpacity>

                        </View>
                        <View style={styles.singleItem}>
                            <View style={{
                                flexDirection: "row", justifyContent: "flex-start", alignItems: "center",
                            }}>
                                <Image source={require('../../assets/coin.png')} style={homeScreenStyles.coinImg} />
                                <Text style={homeScreenStyles.coinsText}>2000</Text>
                            </View>

                            <Text style={[homeScreenStyles.coinsText, { marginTop: 2, textAlign: "center" }]}>$20</Text>
                            <TouchableOpacity onPress={() => purchase(2000, 20)} style={styles.buyNowBtn}><Text style={styles.buyNowText}>{getString('buyNow', language)}</Text></TouchableOpacity>

                        </View>


                    </View>
                    <View style={styles.groupOfTwo}>
                        <View style={styles.singleItem}>
                            <View style={{
                                flexDirection: "row", justifyContent: "flex-start", alignItems: "center",
                            }}>
                                <Image source={require('../../assets/coin.png')} style={homeScreenStyles.coinImg} />
                                <Text style={homeScreenStyles.coinsText}>3000</Text>
                            </View>

                            <Text style={[homeScreenStyles.coinsText, { marginTop: 2, textAlign: "center" }]}>$30</Text>
                            <TouchableOpacity onPress={() => purchase(3000, 30)} style={styles.buyNowBtn}><Text style={styles.buyNowText}>{getString('buyNow', language)}</Text></TouchableOpacity>

                        </View>
                        <View style={styles.singleItem}>
                            <View style={{
                                flexDirection: "row", justifyContent: "flex-start", alignItems: "center",
                            }}>
                                <Image source={require('../../assets/coin.png')} style={homeScreenStyles.coinImg} />
                                <Text style={homeScreenStyles.coinsText}>5000</Text>
                            </View>

                            <Text style={[homeScreenStyles.coinsText, { marginTop: 2, textAlign: "center" }]}>$45</Text>
                            <TouchableOpacity onPress={() => purchase(5000, 45)} style={styles.buyNowBtn}><Text style={styles.buyNowText}>{getString('buyNow', language)}</Text></TouchableOpacity>

                        </View>


                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>

    )
}

export default BuyCoins


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