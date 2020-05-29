import React from 'react'
import {StyleSheet, Text, TextInput, View, Image} from 'react-native'
import { Button } from 'react-native-elements'

import firebase  from "../common/firebase";


class SignUp extends React.Component {
    state = { email: '', password: '', confirmPassword: '', errorMessage: null }

    validateForm() {
        const {email, password, confirmPassword} = this.state
        return (email !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword)
    }

    handleSignUp = () => {
        if(!this.validateForm()){
            console.log('No es valido')
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => this.props.navigation.replace('Campo Base'))
                .catch(error => this.handleError(error))
        }
    }

    handleError(error) {
        console.log(error.code)
        let errorMessage;
        switch (error.code) {
            case 'auth/invalid-email' : errorMessage = 'El email introducido no tiene un formato correcto'; break;
            case 'auth/invalid-password' || 'auth/weak-password' : errorMessage = 'La contraseña debe de tener al menos 6 caracteres'; break;
            case 'auth/email-already-exists' : errorMessage = 'Ya existe un usuario con el email introducido'; break;
            default : errorMessage = 'Se ha producido un error desconocido' ; break;

        }
        this.setState({errorMessage})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 32, fontWeight: 'bold'}}> Bienvenido a Gaztaroa!</Text>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}> Introduce los datos para el registro </Text>
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
                <TextInput
                    secureTextEntry
                    placeholder="Repita la contraseña"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={confirmPassword => this.setState({ confirmPassword })}
                    value={this.state.confirmPassword}
                />
                <View style={{margin : 20}}>
                    <Button
                        title="Registrarse"
                        onPress={this.handleSignUp}
                    />
                </View>
                <View>
                    <Button
                        title="Ya tienes cuenta? Inicia sesión"
                        onPress={() => this.props.navigation.replace('Login')}
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

export default SignUp;
