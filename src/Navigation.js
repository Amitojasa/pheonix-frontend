import React, { useContext } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


/// bring all screens

import Home from './screens/Home';
import Splash from './screens/Splash';
import Login from './screens/Login';
import { AuthContext, AuthProvider } from './context/AuthContext';



const Stack = createNativeStackNavigator();

const Navigation = () => {
    const { userInfo, splashLoading } = useContext(AuthContext);
    return (
        <NavigationContainer>

            <Stack.Navigator screenOptions={{
                // headerShown: false,
                // unmountOnBlur: true
            }}>

                {splashLoading ?
                    <Stack.Screen
                        name="Splash"
                        component={Splash}
                    ></Stack.Screen> : userInfo ?
                        (<Stack.Group>
                            <Stack.Screen
                                name="Home"
                                component={Home}

                            />

                        </Stack.Group>
                        ) : (
                            <Stack.Screen
                                name="Login"
                                component={Login}

                            ></Stack.Screen>
                        )
                }




            </Stack.Navigator>
        </NavigationContainer >
    )
}

export default Navigation