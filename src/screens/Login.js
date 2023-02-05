import React, { useContext } from 'react'
import { Button, Text } from 'react-native'
import { AuthContext } from '../context/AuthContext';
const Login = ({ navigation, route }) => {
    const { login, } = useContext(AuthContext);
    return (
        <Button onPress={() => { login('user', 'password') }} title="Login" />
    )
}

export default Login