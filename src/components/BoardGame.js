import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icons from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
function BoardGame({ player1, setPlayer1 }) {

    const [matrix, setMatrix] = useState([])
    const windowWidth = Dimensions.get('window').width;


    const create2DMatrix = () => {

        var a = [];


        for (let i = 0; i < 5; i++) {
            a[i] = [0, 0, 0, 0, 0];
        }

        a[0][1] = 1;
        a[1][3] = 1;
        a[2][0] = 1;
        a[3][4] = 1;
        a[4][2] = 1;


        a[0][3] = -1;
        a[1][2] = -1;
        a[2][4] = -1;
        a[3][2] = -1;
        a[4][3] = -1;

        a[0][4] = 3;
        a[4][0] = 2;

        setMatrix(a)





    }


    useEffect(() => {
        create2DMatrix();
    }, [])


    return (
        <View style={{
            marginTop: '5%', marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: 'green', width: windowWidth * 0.95, height: windowWidth * 0.95
        }}>
            {
                matrix.map((i, index1) => (
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {i.map((j, index2) => (
                            <View style={[((index1 + index2) % 2 == 0) ? styles.box1 : styles.box2, styles.box]}>

                                {j == 1 ? <Ionicons name="flag" size={32} color="green" /> : (j == -1 ? <MaterialCommunityIcons name="mine" size={32} color="green" /> : j == 3 ? <Icons name="trophy" size={32} color="green" /> : j == 2 ? <Ionicons name="star" size={32} color="green" /> : <Text></Text>)}

                                {(index1 == player1[0] && index2 == player1[1]) &&
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                        {(index1 == player1[0] && index2 == player1[1]) && <MaterialCommunityIcons name="chess-pawn" size={32} color="green" />}
                                        {(index1 == player1[0] && index2 == player1[1]) && <MaterialCommunityIcons name="chess-pawn" size={32} color="green" />}
                                    </View>

                                }


                            </View>

                        ))}
                    </View >


                ))
            }
        </View>
    )
}


const styles = StyleSheet.create({
    box1: {
        backgroundColor: "yellow",
    },
    box2: {
        backgroundColor: "red",
    },
    box: {
        // height: 20,
        // width: 20
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }

})

export default BoardGame