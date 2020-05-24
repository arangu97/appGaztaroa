import React, {Component} from "react";
import {Text, View} from "react-native";
import {Card, Icon} from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer'

import {CONTACTO} from "../common/contacto";
import {colorGaztaroaOscuro} from "../common/common";


class Contacto extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contacto: CONTACTO
        }
    }

    enviarCorreo() {
       MailComposer.composeAsync({
           recipients: ['gaztaroa@gaztaroa.com'],
           subject: 'Contacto GAZTAROA'
       })
    }

    render() {
        const {contacto} = this.state
        return(
            <Animatable.View animation="pulse" duration={1000} delay={500}>
                <Card
                    title={contacto.titulo}
                >
                    <Text
                        style={{margin: 10}}
                    >
                        {contacto.descripcion}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon
                            raised
                            reverse
                            name='envelope'
                            type='font-awesome'
                            color={colorGaztaroaOscuro}
                            onPress={() => this.enviarCorreo()}
                        />
                    </View>
                </Card>
            </Animatable.View>

        )
    }
}

export default Contacto;
