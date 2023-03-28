import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icons from '@expo/vector-icons/FontAwesome';
import {Ionicons} from '@expo/vector-icons';
import {AuthContext} from "../context/AuthContext";
import {getString} from "../language/Strings";
import AsyncStorage from '@react-native-async-storage/async-storage'


export const SettingsComponent = (params) => {
    const {setShowSettings} = params;
    const {language, setLanguage, setSoundOn, soundOn, region, setRegion} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{getString('appSettings', language)}</Text>
            <View style={{flexDirection: "row", width: "100%", marginBottom: 20}}>
                <View style={styles.commonDiv}>
                    <Text style={styles.title2}>{getString('chooseLanguage', language)}</Text>
                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                        <TouchableOpacity style={[styles.commonDiv]}
                                          onPress={async () => {
                                              setLanguage("en")
                                              await AsyncStorage.setItem("language", "en")
                                          }}>
                            <Text style={language === 'en' && styles.selectedBackground}>English</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.commonDiv} onPress={async () => {
                            setLanguage("fr")
                            await AsyncStorage.setItem("language", "fr")
                        }}>
                            <Text style={language === 'fr' && styles.selectedBackground}>French</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width: "50%", alignItems: "center", justifyContent: "center"}}>
                    <Text style={styles.title2}>{getString('chooseSound', language)}</Text>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity style={[styles.commonDiv]}
                                          onPress={() => {
                                              setSoundOn(true)
                                          }}>
                            <Text style={soundOn && styles.selectedBackground}>{getString('on', language)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.commonDiv} onPress={() => {
                            setSoundOn(false)
                        }}>
                            <Text style={!soundOn && styles.selectedBackground}>{getString('off', language)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{width: "80%", alignItems: "center", justifyContent: "center"}}>
                <Text style={styles.title2}>{getString('chooseRegion', language)}</Text>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={[styles.commonDiv]}
                                      onPress={() => {
                                          setRegion("America")
                                      }}>
                        <Text style={region==='America' && styles.selectedBackground}>{getString('america', language)}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.commonDiv} onPress={() =>
                        setRegion("Europe")
                    }>
                        <Text style={region ==='Europe'&& styles.selectedBackground}>{getString('europe', language)}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={{
                backgroundColor: "#DB4A39",
                borderRadius: 10,
                flex: 1,
                width: "50%",
                flexDirection: "row",
                padding: 10,
                justifyContent: "center",
                marginTop: 10
            }} onPress={() => setShowSettings(false)}><Text
                style={{color: "#FFFFFF", fontSize: 16}}>{getString('save', language)}</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '40%',
        left: '5%',
        right: '5%',
        zIndex: 100,
        backgroundColor: "#FFF",
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        justifyContent: "center"

    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    title2: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 20,
    },
    commonDiv: {
        width: "50%", alignItems: "center", justifyContent: "center"
    },
    selectedBackground: {
        color: "red"
    }
})