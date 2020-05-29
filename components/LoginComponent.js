import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from "react-native-elements";

import firebase  from "../common/firebase";

class Login extends React.Component {
    state = { email: '', password: '', errorMessage: null }
    handleLogin = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.replace('Campo Base'))
            .catch(error => this.handleError(error))
    }

    handleError(error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/invalid-email' : errorMessage = 'El email introducido no tiene un formato correcto'; break;
            case 'auth/user-not-found' : errorMessage = 'El email o la contraseña son incorrectos'; break;
            default : errorMessage = 'Se ha producido un error desconocido' ; break;

        }
        this.setState({errorMessage})
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 32, fontWeight: 'bold'}}> Bienvenido a Gaztaroa!</Text>
                {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    placeholderStyle={{ marginLeft : 10}}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Contraseña"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <View style={{margin : 20}}>
                    <Button
                        title="Iniciar sesión"
                        onPress={this.handleLogin}
                    />
                </View>
                <View>
                    <Button
                        title="No tienes cuenta? Registrate"
                        onPress={() => this.props.navigation.replace('SignUp')}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 4,
        marginBottom: 8,
        paddingLeft: 10
    }
})

export default Login;
