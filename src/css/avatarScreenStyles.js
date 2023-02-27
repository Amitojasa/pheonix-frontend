import { StyleSheet } from "react-native";

export const avatarScreenStyles = StyleSheet.create({
    avatarDiv: {
        top: "20%", backgroundColor: "#ffffff", width: "100%", left: "8%", borderRadius: 35,
    },
    avatarThumbnailDiv: {
        height: "60%", top: "15%",
    },
    avatarBtn: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 25,
        width: "100%",
    },
    avatarText: {
        fontSize: 25,
        letterSpacing: 2,
        color: "#DB4A39",
        fontWeight: "bold",
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
    },
    avatarOptionsDiv: {
        // display: "inline",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: 50
    },
    imageDiv: {
        width: 120,
        height: 120,
        borderRadius: 30
    },
    imageBorder: {
        borderColor: "#DB4A39",
        borderWidth: 20
    },
    continueBtn: {
        width: "50%",
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
    },
    continueText: {
        color: "#0048D5",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "bold"
    }
})