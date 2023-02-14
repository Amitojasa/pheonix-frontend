import { Platform, StyleSheet } from "react-native";


export const loginScreenStyles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    fullWidth: {
        width: "100%"
    },
    loginBtn: {
        backgroundColor: '#fff',
        padding: "10%",
        borderRadius: 35
    },
    loginDiv: {
        top: "20%", backgroundColor: "#ffffff", width: "35%", left: "25%", borderRadius: 35
    },
    loginText: {
        fontSize: 25,
        letterSpacing: 2,
        color: "#DB4A39",
        fontWeight: "700",
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1
    },
    logoSection: {
        height: "60%", top: "15%"
    },
    authSection: {
        borderRadius: 30,
        height: "40%", width: "100%"
    },

})