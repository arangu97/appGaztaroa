import React, {Component} from "react";
import {Text} from "react-native";
import {Card} from "react-native-elements";
import * as Animatable from 'react-native-animatable';

import {CONTACTO} from "../common/contacto";


class Contacto extends Component{
    constructor(props) {
        super(props);
        this.state = {
            contacto: CONTACTO
        }
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
                </Card>
            </Animatable.View>

        )
    }
}

export default Contacto;
