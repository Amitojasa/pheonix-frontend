import { StyleSheet } from "react-native";

export const homeScreenStyles = StyleSheet.create({
    coinsDiv: {
        backgroundColor: "#ffffff", width: "35%", borderRadius: 25,
        paddingBottom: 10,
        paddingRight: 15,
        paddingTop: 10,
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        elevation: 10
    },
    userSection: {
        height: "60%",
        alignItems: "center",
        justifyContent: "center",
        width: "95%"
    },
    coinsText: {
        fontSize: 25,
        letterSpacing: 2,
        color: "#000",
        fontWeight: "bold",
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
    },
    userImage: {
        width: "80%",
        height: "80%",
        maxWidth: "80%",
        maxHeight: "80%",


    },
    editLogo: {
        width: 30,
        height: 30,

    },
    homeBtn: {
        width: "80%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        padding: 10,
        shadowColor: "rgba(0, 0, 0, 25)",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: 40
    },
    homeBtnText: {
        color: "#0048D5",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "bold"
    },
    coinImg: {
        width: 50,
        height: 50
    },

    usernameText: {
        fontWeight: "bold",
        fontSize: 18
    },

    avatarDiv: {
        marginBottom: 30,
        width: 200,
        height: 210,
        backgroundColor: '#FFF',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
    },
    userName: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18

    },
    centerDiv: {
        alignItems: "center",
        justifyContent: "center"
    },
    settingsDiv: {
        marginBottom: "90%"
    },
    logoutDiv: {
        marginBottom: 100
    },
    iconText: {
        fontSize: 12, fontWeight: "bold", color: "#FFF", elevation: 10, textAlign: "center"
    },
    settingRedeemDiv: {
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        zIndex: 50,
        height: 210,
        width: "20%",
        paddingVertical: 20,
        left: 0
    },
    logoutCoinsDiv: {
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        zIndex: 50,
        height: 210,
        right: 0,
        width: "20%",
        paddingVertical: 20
    }
})