import {Image, Text, TouchableOpacity, View} from "react-native";
import {commonStyles} from "../css/commonStyles";
import {LinearGradient} from "expo-linear-gradient";
import {loginScreenStyles} from "../css/loginScreenStyles";
import {avatarScreenStyles} from "../css/avatarScreenStyles";
import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const Avatar = ({navigation}) => {
    const [selectedAvatar, setSelectedAvatar] = useState('');

    const handleAvatarChange = async () => {
        await AsyncStorage.setItem("isAvatar", "true");
        if (selectedAvatar === 'male') {
            await AsyncStorage.setItem("avatar", "../../assets/maleAvatar.png");
        } else {
            await AsyncStorage.setItem("avatar", "../../assets/femaleAvatar.png");
        }
        navigation.goBack(null)
    }

    return (
        <View style={commonStyles.centerContainer}>
            <LinearGradient colors={['#DB4A39', '#FFFFFF']}
                            start={{x: 1, y: 0.3}}
                            end={{x: 0, y: 1}} style={[commonStyles.centerContainer, commonStyles.fullWidth]}>
                <View style={avatarScreenStyles.avatarThumbnailDiv}>
                    <Image source={require('../../assets/logoHorizontal.png')}/>
                    <View style={avatarScreenStyles.avatarDiv}>
                        <View style={avatarScreenStyles.avatarBtn}>
                            <Text style={avatarScreenStyles.avatarText}>Choose Avatar</Text>
                        </View>
                    </View>
                </View>

                <View style={loginScreenStyles.authSection}>
                    <LinearGradient colors={['#0073C5', '#9069FF']}
                                    start={{x: 1, y: 0}}
                                    end={{x: 0, y: 1}}
                                    style={[commonStyles.centerContainer, commonStyles.fullWidth, commonStyles.borderTopRd]}>
                        <View style={[avatarScreenStyles.avatarOptionsDiv]}>
                            <TouchableOpacity onPress={() => {
                                setSelectedAvatar('male');
                            }}>
                                <Image style={[avatarScreenStyles.imageDiv]}
                                       source={require('../../assets/maleAvatar.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft: 60}} onPress={() => {
                                setSelectedAvatar('female');
                            }}>
                                <Image
                                    style={[avatarScreenStyles.imageDiv]}
                                    source={require('../../assets/femaleAvatar.png')}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={avatarScreenStyles.continueBtn}>
                            <Text style={avatarScreenStyles.continueText}>Continue</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </View>
    )
}