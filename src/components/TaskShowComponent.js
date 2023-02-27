import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

function TaskShowComponent({ task, setShowTask }) {

    // console.log(task)
    return (
        task && <View style={styles.container}>
            <Text style={styles.title}>{task.taskName}</Text>
            <Text >{task.taskDesc}</Text>
            <Text style={styles.time}>{task.taskTiming} sec</Text>
            <Button onPress={() => setShowTask(false)} title="Done"></Button>
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

    },

    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    }

    ,
    description: {
        fontWeight: 16,
        textAlign: 'justify'
    },
    time: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
    }
})

export default TaskShowComponent