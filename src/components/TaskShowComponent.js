import React from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function TaskShowComponent({ task, setShowTask }) {

    // console.log(task)
    return (
        task && <View style={styles.container}>
            <Text style={styles.title}>{task.taskName}</Text>
            <Text >{task.taskDesc}</Text>
            <Text style={styles.time}>{task.taskTiming} sec</Text>
            <TouchableOpacity style={{ backgroundColor: "#DB4A39", borderRadius: 10, flex: 1, width: "80%", flexDirection: "row", padding: 10, justifyContent: "center", marginTop: 10 }} onPress={() => setShowTask(false)}><Text style={{ color: "#FFFFFF", fontSize: 16 }}>Done</Text></TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '20%',

        left: '5%',
        right: '5%',
        zIndex: 100,
        backgroundColor: "#FFF",
        alignItems: 'center',

        padding: 20,
        borderRadius: 10,

    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    }

    ,
    description: {
        fontWeight: 18,
        textAlign: 'justify'
    },
    time: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
    }
})

export default TaskShowComponent