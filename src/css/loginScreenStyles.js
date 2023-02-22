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
        fontWeight: "bold",
        // textShadowColor: "rgba(0, 0, 0, 0.25)",
        // textShadowOffset: { width: -1, height: 1 },
        // textShadowRadius: 1
    },
    logoSection: {
        height: "60%", top: "15%"
    },
    authSection: {
        borderRadius: 30,
        height: "40%", width: "100%"
    },
    googleLogin: {
        // display: "inline",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DB4A39",
        paddingLeft: "3%",
        borderRadius: 15,
        // shadowColor: "rgba(0, 0, 0, 0.25)",
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 3,
        elevation: 5,
        marginBottom: 40,
        width: "65%"
    },
    facebookLogin: {

        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3B5998",
        paddingLeft: "4%",
        paddingRight: "2%",
        paddingBottom: "1%",
        borderRadius: 15,
        // shadowColor: "rgba(0, 0, 0, 0.25)",
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 3,
        elevation: 5,
        marginBottom: 40
    },
    googleText: {
        fontSize: 20,
        lineHeight: 27,
        color: "#fff",
        fontWeight: "bold",
    },
    facebookText: {
        fontSize: 20,
        lineHeight: 27,
        color: "#fff",
        fontWeight: "bold",
    }

})