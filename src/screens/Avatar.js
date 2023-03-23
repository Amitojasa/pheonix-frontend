import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { commonStyles } from "../css/commonStyles";
import { LinearGradient } from "expo-linear-gradient";
import { loginScreenStyles } from "../css/loginScreenStyles";
import { avatarScreenStyles } from "../css/avatarScreenStyles";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { avatars, BASE_URL } from "../Config";
import axios from "axios";
import { getString } from "../language/Strings";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import InternetAlert from "../components/InternetAlert";



export const Avatar = ({ navigation }) => {
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [isSelected, setIsSelected] = useState();
    const { language, isConnected, checkConnection } = useContext(AuthContext);
    const handleAvatarChange = async () => {
        await AsyncStorage.setItem("isAvatar", "true");
        const userInfo = await AsyncStorage.getItem('userInfo');
        const parsedUserInfo = JSON.parse(userInfo);
        const updatedUserData = {
            profileImage: selectedAvatar
        }
        await axios.put(`${BASE_URL}/api/OAuthUsers/${parsedUserInfo.id}`, updatedUserData).then((res) => {
            AsyncStorage.getItem('userInfo').then(res => {
                const userDetails = JSON.parse(res);
                userDetails.profileImage = selectedAvatar;
                AsyncStorage.removeItem('userInfo');
                AsyncStorage.setItem('userInfo', JSON.stringify(userDetails));
            });

        }) //todo uncomment when backend is fixed
        navigation.goBack(null)
    }




    const renderAvatarImage = (item) => {
        switch (item.id) {
            case 1:
                return <Image source={require('../../assets/cat.png')} style={[avatarScreenStyles.imageDiv]} />;
            case 2:
                return <Image source={require('../../assets/panda.png')} style={[avatarScreenStyles.imageDiv]} />;
            case 3:
                return <Image source={require('../../assets/pig.png')} style={[avatarScreenStyles.imageDiv]} />;
            case 4:
                return <Image source={require('../../assets/monkey.png')} style={[avatarScreenStyles.imageDiv]} />;
            case 5:
                return <Image source={require('../../assets/hen.png')} style={[avatarScreenStyles.imageDiv]} />;
            case 6:
                return <Image source={require('../../assets/fox.png')} style={[avatarScreenStyles.imageDiv]} />;
            case 7:
                return <Image source={require('../../assets/dog.png')} style={[avatarScreenStyles.imageDiv]} />;
            case 8:
                return <Image source={require('../../assets/cow.png')} style={[avatarScreenStyles.imageDiv]} />;
        }
    }

    return (
        <SafeAreaView style={commonStyles.centerContainer}>
            <InternetAlert checkConnection={checkConnection} language={language} isConnected={isConnected} />

            <LinearGradient colors={['#DB4A39', '#FFFFFF']}
                start={{ x: 1, y: 0.3 }}
                end={{ x: 0, y: 1 }} style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                <View style={avatarScreenStyles.avatarThumbnailDiv}>
                    <Image source={require('../../assets/logoHorizontal.png')} />
                    <View style={avatarScreenStyles.avatarDiv}>
                        <View style={avatarScreenStyles.avatarBtn}>
                            <Text style={avatarScreenStyles.avatarText}>{getString('chooseAvatar', language)}</Text>
                        </View>
                    </View>
                </View>

                <View style={loginScreenStyles.authSection}>
                    <LinearGradient colors={['#0073C5', '#9069FF']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={[commonStyles.centerContainer, commonStyles.fullWidth, commonStyles.borderTopRd]}>

                        <View style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {avatars.map((items, index1) =>
                                <View style={[avatarScreenStyles.avatarOptionsDiv]} key={index1}>
                                    {items.map((subItems, index2) =>
                                        <TouchableOpacity
                                            style={[isSelected === subItems.id && avatarScreenStyles.imageBorder,
                                            avatarScreenStyles.marginBtm]}
                                            key={index2} onPress={() => {
                                                setSelectedAvatar(subItems.avatar);
                                                setIsSelected(subItems.id)
                                            }}>
                                            {renderAvatarImage(subItems)}
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        </View>
                        <TouchableOpacity style={avatarScreenStyles.continueBtn} onPress={() => {
                            handleAvatarChange().then()
                        }}>
                            <Text style={avatarScreenStyles.continueText}>{getString('continue', language)}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}