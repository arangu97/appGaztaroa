import React from 'react'
import {View, StyleSheet, Image, Animated, Easing} from 'react-native'


import firebase  from "../common/firebase";

import {colorGaztaroaClaro, colorGaztaroaOscuro} from "../common/common";
class SplashScreen extends React.Component {

    constructor (props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.animatedValue = new Animated.Value(0)
    }

    componentDidMount() {
        this.spin()
        this.handleAnimation()
        setTimeout(() => this.checkFirebase(), 3000)
    }

    checkFirebase() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.replace(user ? 'Campo Base' : 'Login')
        })
    }

    handleAnimation = () => {
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.ease
        }).start()
    }

    spin () {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear
            }
        ).start()
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style={styles.container}>
                <Animated.Image
                    style={{ resizeMode: 'cover', width: '40%', height: '14%',
                        transform: [{rotate: spin} , {scale: this.animatedValue}]}}
                    source={{uri: 'https://firebasestorage.googleapis.com/v0/b/dsm-aranguren-appgaztaroa.appspot.com/o/logo.png?alt=media&token=cc36d47d-ea74-4d7b-9374-8a25245d987f'}}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorGaztaroaOscuro
    }
})

export default SplashScreen
