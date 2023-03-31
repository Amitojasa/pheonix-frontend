import { StyleSheet } from "react-native";

export const avatarScreenStyles = StyleSheet.create({
    avatarDiv: {
        top: "20%", backgroundColor: "#fff", width: "100%", alignSelf: "center", borderRadius: 25

    },
    avatarThumbnailDiv: {
        height: "60%", top: "10%",
    },
    avatarBtn: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 25,
        width: "100%",
        alignSelf: "center",
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
        marginBottom: 20,
        padding: 5
    },
    imageDiv: {
        width: 70,
        height: 70,
        borderRadius: 10,

    },
    imageBorder0: {
        borderColor: "#FFF",
        borderWidth: 5,
        borderRadius: 15
    },
    imageBorder: {
        borderColor: "#DB4A39",
        borderWidth: 5,
        borderRadius: 15
    },
    marginBtm: {
        marginBottom: 20
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